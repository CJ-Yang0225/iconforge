import { describe, it, expect, vi, beforeEach, MockedFunction } from "vitest";
import { generateVue } from "../src/generators/vue";
import fs from "fs-extra";
import path from "path";
import { ProcessedIcon } from "@iconforge/core";

// Mock fs-extra
vi.mock("fs-extra");

describe("generateVue", () => {
  const mockOutputDir = "/tmp/dist";
  const mockIcons: ProcessedIcon[] = [
    {
      name: "icon-home",
      content:
        '<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
      optimizedContent: '<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>',
      viewBox: "0 0 24 24",
      path: "/src/icon-home.svg",
    },
    {
      name: "icon-menu",
      content:
        '<svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>',
      optimizedContent:
        '<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>',
      viewBox: "0 0 24 24",
      path: "/src/icon-menu.svg",
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
    await generateVue(mockIcons, mockOutputDir);

    expect(fs.writeFile).toHaveBeenCalledWith(
      path.join(mockOutputDir, "vue", "types.ts"),
      expect.stringContaining(
        "export type IconName = \n  | 'icon-home'\n  | 'icon-menu';"
      )
    );
  });

  it("should generate SvgSymbols.vue with correct viewBox and symbols", async () => {
    await generateVue(mockIcons, mockOutputDir);

    const mockedWriteFile = fs.writeFile as unknown as MockedFunction<
      typeof fs.writeFile
    >;
    const call = mockedWriteFile.mock.calls.find((c) =>
      (c[0] as string).endsWith("SvgSymbols.vue")
    );

    expect(call).toBeDefined();
    if (!call) return;

    const content = call[1] as string;
    expect(content).toContain('<symbol id="icon-home" viewBox="0 0 24 24">');
    expect(content).toContain('<symbol id="icon-menu" viewBox="0 0 24 24">');
    expect(content).toContain('aria-hidden="true"');
  });

  it("should generate Icon.vue with a11y attributes", async () => {
    await generateVue(mockIcons, mockOutputDir);

    const mockedWriteFile = fs.writeFile as unknown as MockedFunction<
      typeof fs.writeFile
    >;
    const call = mockedWriteFile.mock.calls.find((c) =>
      (c[0] as string).endsWith("Icon.vue")
    );

    expect(call).toBeDefined();
    if (!call) return;

    const content = call[1] as string;
    expect(content).toContain("aria-hidden");
    expect(content).toContain("focusable");
    expect(content).toContain("ariaLabel");
    expect(content).toContain("name: IconName");
  });

  it("should generate useIcon.ts with registry", async () => {
    await generateVue(mockIcons, mockOutputDir);

    const mockedWriteFile = fs.writeFile as unknown as MockedFunction<
      typeof fs.writeFile
    >;
    const call = mockedWriteFile.mock.calls.find((c) =>
      (c[0] as string).endsWith("useIcon.ts")
    );

    expect(call).toBeDefined();
    if (!call) return;

    const content = call[1] as string;
    expect(content).toContain("export const iconRegistry");
    expect(content).toContain("icon-home");
    expect(content).toContain("icon-menu");
    expect(content).toContain("export function useIcon");
  });

  it("should generate index.ts with all exports", async () => {
    await generateVue(mockIcons, mockOutputDir);

    expect(fs.writeFile).toHaveBeenCalledWith(
      path.join(mockOutputDir, "vue", "index.ts"),
      expect.stringContaining("export { default as Icon }")
    );
    expect(fs.writeFile).toHaveBeenCalledWith(
      path.join(mockOutputDir, "vue", "index.ts"),
      expect.stringContaining("export { default as SvgSymbols }")
    );
  });
});
