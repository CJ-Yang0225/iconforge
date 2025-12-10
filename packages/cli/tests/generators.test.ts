import { describe, it, expect, vi, beforeEach, MockedFunction } from "vitest";
import { generateReact } from "../src/generators/react";
import fs from "fs-extra";
import path from "path";
import { ProcessedIcon } from "@iconforge/core";

// Mock fs-extra
vi.mock("fs-extra");

describe("generateReact", () => {
  const mockOutputDir = "/tmp/dist";
  const mockIcons: ProcessedIcon[] = [
    {
      name: "icon-a",
      content: '<svg viewBox="0 0 24 24"><path d="M10 10"/></svg>',
      optimizedContent: '<path d="M10 10"/>',
      viewBox: "0 0 24 24",
      path: "/src/icon-a.svg",
    },
    {
      name: "icon-b",
      content: '<svg viewBox="0 0 48 48"><circle r="10"/></svg>',
      optimizedContent: '<circle r="10"/>',
      viewBox: "0 0 48 48",
      path: "/src/icon-b.svg",
    },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
    (
      fs.ensureDir as unknown as MockedFunction<typeof fs.ensureDir>
    ).mockResolvedValue(undefined);
    (
      fs.writeFile as unknown as MockedFunction<typeof fs.writeFile>
    ).mockResolvedValue(undefined);
  });

  it("should generate types.ts with correct icon names", async () => {
    await generateReact(mockIcons, mockOutputDir);

    expect(fs.writeFile).toHaveBeenCalledWith(
      path.join(mockOutputDir, "react", "types.ts"),
      expect.stringContaining(
        "export type IconName = \n  | 'icon-a'\n  | 'icon-b';"
      )
    );
  });

  it("should generate SvgSymbols.tsx with correct viewBox and symbols", async () => {
    await generateReact(mockIcons, mockOutputDir);

    const mockedWriteFile = fs.writeFile as unknown as MockedFunction<
      typeof fs.writeFile
    >;
    const call = mockedWriteFile.mock.calls.find((c) =>
      (c[0] as string).endsWith("SvgSymbols.tsx")
    );

    expect(call).toBeDefined();
    if (!call) return; // Guard for TypeScript

    const content = call[1] as string;

    expect(content).toContain('<symbol id="icon-a" viewBox="0 0 24 24">');
    expect(content).toContain('<symbol id="icon-b" viewBox="0 0 48 48">');
    expect(content).toContain('<path d="M10 10"/>');
    expect(content).toContain('<circle r="10"/>');
  });

  it("should generate Icon.tsx", async () => {
    await generateReact(mockIcons, mockOutputDir);

    expect(fs.writeFile).toHaveBeenCalledWith(
      path.join(mockOutputDir, "react", "Icon.tsx"),
      expect.stringContaining("export const Icon: React.FC<IconProps>")
    );
  });
});
