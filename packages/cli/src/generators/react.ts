import fs from "fs-extra";
import path from "path";
import { ProcessedIcon } from "@iconforge/core";
import { convertSvgToJsx } from "../utils/jsx-transformer";

export async function generateReact(icons: ProcessedIcon[], outputDir: string) {
  const reactDir = path.join(outputDir, "react");
  await fs.ensureDir(reactDir);

  // 1. Generate types.ts
  const iconNames = icons.map((i) => i.name).sort();
  const typesContent = `export type IconName = 
${iconNames.map((name) => `  | '${name}'`).join("\n")};

export const iconNames: IconName[] = [
${iconNames.map((name) => `  '${name}',`).join("\n")}
];
`;
  await fs.writeFile(path.join(reactDir, "types.ts"), typesContent);

  // 2. Generate SvgSymbols.tsx (使用提取的 viewBox)
  const symbolsContent = `import React from 'react';

export const SvgSymbols = () => (
  <svg style={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg">
${icons
  .map((icon) => {
    // 提取 SVG 內部內容並轉換為 JSX 格式
    const innerContent = icon.optimizedContent
      .replace(/<svg[^>]*>|<\/svg>/g, "")
      .trim();
    const jsxContent = convertSvgToJsx(innerContent);
    return `    <symbol id="${icon.name}" viewBox="${icon.viewBox}">
      ${jsxContent}
    </symbol>`;
  })
  .join("\n")}
  </svg>
);
`;
  await fs.writeFile(path.join(reactDir, "SvgSymbols.tsx"), symbolsContent);

  // 3. Generate Icon.tsx with a11y support
  const iconComponentContent = `import React from 'react';
import { IconName } from './types';

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  /** Icon name (type-safe) */
  name: IconName;
  /** Size in px (applies to both width and height) */
  size?: number | string;
  /** Accessible label (for screen readers). When provided, aria-hidden will be false */
  ariaLabel?: string;
}

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  style, 
  ariaLabel,
  ...props 
}) => {
  return (
    <svg
      width={size}
      height={size}
      style={{ display: 'inline-block', flexShrink: 0, ...style }}
      aria-hidden={!ariaLabel}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
      focusable="false"
      {...props}
    >
      <use href={\`#\${name}\`} />
    </svg>
  );
};
`;
  await fs.writeFile(path.join(reactDir, "Icon.tsx"), iconComponentContent);

  // 4. Generate index.ts
  const indexContent = `export * from './types';
export * from './SvgSymbols';
export * from './Icon';
`;
  await fs.writeFile(path.join(reactDir, "index.ts"), indexContent);
}
