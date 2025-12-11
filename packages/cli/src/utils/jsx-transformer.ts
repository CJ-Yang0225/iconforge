/**
 * SVG to JSX 屬性轉換器
 *
 * 將 SVG 的 kebab-case 與 XML 命名空間屬性轉換為 JSX 相容的 camelCase 格式。
 * 參考：React 官方 possibleStandardNames.js
 *
 * @example
 * convertSvgToJsx('<path stroke-width="2" class="icon" xlink:href="#a"/>')
 * // => '<path strokeWidth="2" className="icon" xlinkHref="#a"/>'
 */

/**
 * 將 SVG 內容轉換為 JSX 相容格式
 * @param svgContent - 原始 SVG 字串
 * @returns 轉換後的 JSX 相容字串
 */
export function convertSvgToJsx(svgContent: string): string {
  let result = svgContent;

  // 1. 處理 XML 命名空間屬性 (xlink:href, xmlns:xlink, xml:lang 等)
  //    xlink:href -> xlinkHref, xmlns:xlink -> xmlnsXlink
  result = result.replace(
    /(\s)(xml|xlink|xmlns)(:)([a-z]+)(=)/gi,
    (_, space, prefix, _colon, name, equals) => {
      const camelName = name.charAt(0).toUpperCase() + name.slice(1);
      return `${space}${prefix}${camelName}${equals}`;
    }
  );

  // 2. 處理 class -> className (JavaScript 保留字)
  result = result.replace(/(\s)class=/g, "$1className=");

  // 3. 處理 kebab-case 屬性 (stroke-width -> strokeWidth)
  //    排除 data-* 和 aria-* 屬性
  result = result.replace(
    /(\s)(?!data-|aria-)([a-z]+(?:-[a-z]+)+)(=)/gi,
    (_match, space, attrName, equals) => {
      // 將 kebab-case 轉為 camelCase
      const camelCase = attrName.replace(/-([a-z])/g, (_: string, c: string) =>
        c.toUpperCase()
      );
      return `${space}${camelCase}${equals}`;
    }
  );

  return result;
}
