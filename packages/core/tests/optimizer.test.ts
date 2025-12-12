import { describe, it, expect } from "vitest";
import { optimizeIcon } from "../src/optimizer";
import { defaultConfig } from "../src/config";

describe("Optimizer", () => {
  it("should optimize SVG content", () => {
    const svg =
      '<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/></svg>';
    const optimized = optimizeIcon(svg, defaultConfig);
    expect(optimized).toContain("<svg");
    expect(typeof optimized).toBe("string");
    expect(optimized.length).toBeGreaterThan(0);
  });

  describe("currentColor conversion", () => {
    const currentColorConfig = {
      ...defaultConfig,
      colorProcessing: {
        strategy: "currentColor" as const,
        preserveColors: [],
      },
    };

    it("should convert path fill to currentColor", () => {
      const svg =
        '<svg viewBox="0 0 24 24"><path fill="#FF0000" d="M0 0h10v10H0z"/></svg>';
      const optimized = optimizeIcon(svg, currentColorConfig);
      expect(optimized).toContain('fill="currentColor"');
    });

    it("should preserve svg-level fill=currentColor", () => {
      const svg =
        '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 5h14v14H5z"/></svg>';
      const optimized = optimizeIcon(svg, currentColorConfig);
      expect(optimized).toContain('fill="currentColor"');
    });

    it("should convert svg-level fill color to currentColor", () => {
      const svg =
        '<svg fill="black" viewBox="0 0 24 24"><path d="M5 5h14v14H5z"/></svg>';
      const optimized = optimizeIcon(svg, currentColorConfig);
      // SVGO 應該將 svg 的 fill 轉為 currentColor
      expect(optimized).toContain('fill="currentColor"');
    });

    it("should convert stroke to currentColor", () => {
      const svg =
        '<svg viewBox="0 0 24 24"><path fill="none" stroke="#000" d="M5 5h14v14H5z"/></svg>';
      const optimized = optimizeIcon(svg, currentColorConfig);
      expect(optimized).toContain('stroke="currentColor"');
      expect(optimized).toContain('fill="none"');
    });

    it("should convert both fill and stroke to currentColor", () => {
      const svg =
        '<svg viewBox="0 0 24 24"><path fill="#333" stroke="#666" d="M5 5h14v14H5z"/></svg>';
      const optimized = optimizeIcon(svg, currentColorConfig);
      expect(optimized).toContain('fill="currentColor"');
      expect(optimized).toContain('stroke="currentColor"');
    });

    it("should preserve fill=none for stroke-only icons", () => {
      const svg =
        '<svg viewBox="0 0 24 24"><circle fill="none" stroke="red" cx="12" cy="12" r="10"/></svg>';
      const optimized = optimizeIcon(svg, currentColorConfig);
      expect(optimized).toContain('fill="none"');
      expect(optimized).toContain('stroke="currentColor"');
    });

    it("should handle complex real-world SVG (mic icon)", () => {
      const svg = `<svg fill="black" viewBox="-3 0 19 19" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.665 7.915v1.31a5.257 5.257 0 0 1-1.514 3.694 5.174 5.174 0 0 1-1.641 1.126 5.04 5.04 0 0 1-1.456.384v1.899h2.312a.554.554 0 0 1 0 1.108H3.634a.554.554 0 0 1 0-1.108h2.312v-1.899a5.045 5.045 0 0 1-1.456-.384 5.174 5.174 0 0 1-1.641-1.126 5.257 5.257 0 0 1-1.514-3.695v-1.31a.554.554 0 1 1 1.109 0v1.31a4.131 4.131 0 0 0 1.195 2.917 3.989 3.989 0 0 0 5.722 0 4.133 4.133 0 0 0 1.195-2.917v-1.31a.554.554 0 1 1 1.109 0z" />
      </svg>`;
      const optimized = optimizeIcon(svg, currentColorConfig);
      // 應該保留或轉換 svg 的 fill 為 currentColor
      expect(optimized).toContain('fill="currentColor"');
    });
  });

  describe("strip color strategy", () => {
    const stripConfig = {
      ...defaultConfig,
      colorProcessing: {
        strategy: "strip" as const,
        preserveColors: [],
      },
    };

    it("should remove all fill and stroke attributes", () => {
      const svg =
        '<svg viewBox="0 0 24 24"><path fill="red" stroke="blue" d="M0 0h10v10H0z"/></svg>';
      const optimized = optimizeIcon(svg, stripConfig);
      expect(optimized).not.toContain('fill="');
      expect(optimized).not.toContain('stroke="');
    });
  });

  describe("preserve color strategy", () => {
    const preserveConfig = {
      ...defaultConfig,
      colorProcessing: {
        strategy: "preserve" as const,
        preserveColors: [],
      },
    };

    it("should keep original colors", () => {
      const svg =
        '<svg viewBox="0 0 24 24"><path fill="#FF5722" d="M0 0h10v10H0z"/></svg>';
      const optimized = optimizeIcon(svg, preserveConfig);
      // SVGO 可能會優化顏色格式，但應該保留顏色值
      expect(optimized).toMatch(/fill="(#[fF]{2}5722|#[fF]57|red)"/);
    });
  });
});
