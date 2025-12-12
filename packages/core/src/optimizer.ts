import { optimize, Config as SvgoConfig, PluginConfig } from "svgo";
import { IconForgeConfig } from "./config";

/**
 * 優化 SVG 內容
 * @param content - 原始 SVG 字串
 * @param config - IconForge 設定
 * @returns 優化後的 SVG 字串
 */
export function optimizeIcon(content: string, config: IconForgeConfig): string {
  const plugins = buildPluginChain(config);

  const svgoConfig: SvgoConfig = {
    plugins,
  };

  const result = optimize(content, svgoConfig);
  return result.data;
}

/**
 * 建構 SVGO plugin 鏈
 * 優先順序：
 *   1. preset-default → 進階優化
 *   2. 自訂 plugins (顏色處理前置作業)
 *   3. 顏色處理（convertColors）
 *   4. 使用者自訂 plugins
 */
function buildPluginChain(config: IconForgeConfig): PluginConfig[] {
  const plugins: PluginConfig[] = [];

  // 1. 基礎優化 (preset-default)
  plugins.push({
    name: "preset-default",
    params: {
      overrides: {
        removeViewBox: false, // 保留 viewBox 以確保縮放正常
        // 禁用移除「預設值」屬性的優化
        // SVG 中 fill 的預設值是 black，所以 fill="black" 會被 removeUnknownsAndDefaults 移除
        // 我們要保留它，讓 convertColors 可以轉換成 currentColor
        removeUnknownsAndDefaults: {
          defaultAttrs: false, // 不要移除預設值屬性（如 fill="black"）
        },
      },
    },
  });

  // 1.1 進階優化 (Recommended)
  plugins.push({ name: "removeDimensions" });
  plugins.push({ name: "sortAttrs" });
  plugins.push({
    name: "prefixIds",
    params: {
      delim: "_",
      prefixIds: true,
      prefixClassNames: false,
    },
  });

  // 2. 顏色處理
  if (config.colorProcessing.strategy === "currentColor") {
    const preserveColors = config.colorProcessing.preserveColors || [];

    // 2.1 自訂 Plugin：繼承 svg 層的 fill/stroke 到子元素
    //     這解決了 <svg fill="black"><path.../></svg> 的問題
    //     透過 defaultAttrs: false，preset-default 不會移除 svg 的 fill="black"
    //     我們在這裡把 svg 的 fill/stroke 傳遞給子元素
    plugins.push({
      name: "propagateSvgPresentationAttrs",
      fn: () => {
        return {
          element: {
            enter: (node) => {
              // 只處理 <svg> 元素
              if (node.name === "svg" && node.attributes) {
                const svgFill = node.attributes.fill;
                const svgStroke = node.attributes.stroke;

                if (!svgFill && !svgStroke) return;

                // 遍歷所有子元素
                if (node.children) {
                  for (const child of node.children) {
                    if (
                      child.type === "element" &&
                      child.name !== "defs" &&
                      child.attributes
                    ) {
                      // 如果子元素沒有 fill，繼承父層的 fill
                      if (svgFill && !child.attributes.fill) {
                        child.attributes.fill = svgFill;
                      }
                      // 如果子元素沒有 stroke，繼承父層的 stroke
                      if (svgStroke && !child.attributes.stroke) {
                        child.attributes.stroke = svgStroke;
                      }
                    }
                  }
                }

                // 移除 svg 層的 fill/stroke（已經繼承到子元素了）
                if (svgFill) delete node.attributes.fill;
                if (svgStroke) delete node.attributes.stroke;
              }
            },
          },
        };
      },
    });

    // 2.2 使用 convertColors plugin 並設定 currentColor
    plugins.push({
      name: "convertColors",
      params: {
        currentColor: true,
      },
    });

    // TODO: preserveColors 功能 - 如有強烈需求再實作
    // 使用情境：品牌色 Icon、多色 Icon 等邊緣需求
    // 實作方式：可透過自訂 SVGO plugin 或 post-processing 處理
    // 參考：https://svgo.dev/docs/plugins/custom-plugins/
    if (preserveColors.length > 0) {
      // 目前僅記錄，不影響執行
      console.debug(
        `[IconForge] preserveColors specified: ${preserveColors.join(", ")} - feature not yet implemented`
      );
    }
  } else if (config.colorProcessing.strategy === "strip") {
    // 移除所有顏色屬性
    plugins.push({
      name: "removeAttrs",
      params: {
        attrs: "(fill|stroke)",
      },
    });
  }
  // 'preserve' 策略不需要額外處理

  // 3. 使用者自訂 plugins (最高優先，放在最後以覆蓋預設行為)
  if (config.svgo?.plugins && config.svgo.plugins.length > 0) {
    plugins.push(...config.svgo.plugins);
  }

  return plugins;
}

/**
 * 從 SVG 字串中提取 viewBox
 * @param svgContent - SVG 字串
 * @returns viewBox 字串，如果不存在則返回預設值 "0 0 24 24"
 */
export function extractViewBox(svgContent: string): string {
  const match = svgContent.match(/viewBox=["']([^"']+)["']/);
  return match ? match[1] : "0 0 24 24";
}
