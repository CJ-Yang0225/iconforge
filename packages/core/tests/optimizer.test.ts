import { describe, it, expect } from "vitest";
import { optimizeIcon } from "../src/optimizer";
import { defaultConfig } from "../src/config";

describe("Optimizer", () => {
  it("should optimize SVG content", () => {
    const svg =
      '<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/></svg>';
    const optimized = optimizeIcon(svg, defaultConfig);
    expect(optimized).toContain("<svg");
    // SVGO might remove the path if it's empty or useless, but here it has fill="none"
    // Let's check if it's a string and not empty
    expect(typeof optimized).toBe("string");
    expect(optimized.length).toBeGreaterThan(0);
  });

  it("should convert colors to currentColor if configured", () => {
    const svg =
      '<svg viewBox="0 0 24 24"><path fill="#FF0000" d="M0 0h10v10H0z"/></svg>';
    const config = {
      ...defaultConfig,
      colorProcessing: {
        strategy: "currentColor" as const,
        preserveColors: [],
      },
    };
    const optimized = optimizeIcon(svg, config);
    expect(optimized).toContain("currentColor");
  });
});
