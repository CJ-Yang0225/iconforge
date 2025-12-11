import React from "react";

/**
 * IconForge React 共用型別定義
 * 這些型別會被 CLI 生成的元件使用
 */

/**
 * Icon 元件的 Props 介面
 */
export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  /** Icon 名稱，需與生成的 IconName 型別匹配 */
  name: string;
  /** Icon 尺寸，可以是數字 (px) 或字串 */
  size?: number | string;
}

/**
 * SvgSymbols 元件的 Props 介面
 */
export interface SvgSymbolsProps {
  /** 可選：只載入指定的圖示 */
  icons?: string[];
  /** 載入完成時的回調 */
  onLoad?: () => void;
}

/**
 * Icon 元數據介面
 */
export interface IconMetadata {
  id: string;
  viewBox: string;
  content: string;
}

/**
 * useIcon Hook - 用於動態取得 icon 資訊
 * 注意：這個 hook 需要搭配生成的 iconRegistry 使用
 *
 * @example
 * ```tsx
 * import { useIcon } from '@iconforge/react';
 * import { iconRegistry } from '@/components/icons/react';
 *
 * function MyComponent() {
 *   const icon = useIcon('account', iconRegistry);
 *   if (!icon) return null;
 *   return <div>ViewBox: {icon.viewBox}</div>;
 * }
 * ```
 */
export function useIcon<T extends string>(
  name: T,
  registry: Record<T, IconMetadata>
): IconMetadata | null {
  return registry[name] ?? null;
}

/**
 * 建立 Icon 元件的工廠函數
 * 用於在生成的程式碼中建立型別安全的 Icon 元件
 */
export function createIconComponent<T extends string>() {
  const Icon: React.FC<Omit<IconProps, "name"> & { name: T }> = ({
    name,
    size = 24,
    style,
    ...props
  }) => {
    return React.createElement(
      "svg",
      {
        width: size,
        height: size,
        style: { display: "inline-block", flexShrink: 0, ...style },
        ...props,
      },
      React.createElement("use", { href: `#${name}` })
    );
  };

  return Icon;
}
