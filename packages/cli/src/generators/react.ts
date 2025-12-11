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

  // 3. Generate Icon.tsx (動態使用 viewBox)
  // 注意：這裡保留 viewBox="0 0 24 24" 作為預設值，
  // 因為 <use> 元素會繼承 symbol 的 viewBox
  const iconComponentContent = `import React from 'react';
import { IconName } from './types';

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name: IconName;
  size?: number | string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, style, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      style={{ display: 'inline-block', flexShrink: 0, ...style }}
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
