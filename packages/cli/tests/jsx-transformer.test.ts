import { describe, it, expect } from "vitest";
import { convertSvgToJsx } from "../src/utils/jsx-transformer";

describe("convertSvgToJsx", () => {
  describe("基本 kebab-case 轉換", () => {
    it("should convert stroke-width to strokeWidth", () => {
      const input = '<path stroke-width="2"/>';
      const expected = '<path strokeWidth="2"/>';
      expect(convertSvgToJsx(input)).toBe(expected);
    });

    it("should convert fill-opacity to fillOpacity", () => {
      const input = '<rect fill-opacity="0.5"/>';
      const expected = '<rect fillOpacity="0.5"/>';
      expect(convertSvgToJsx(input)).toBe(expected);
    });

    it("should convert stroke-linecap to strokeLinecap", () => {
      const input = '<line stroke-linecap="round"/>';
      const expected = '<line strokeLinecap="round"/>';
      expect(convertSvgToJsx(input)).toBe(expected);
    });

    it("should convert clip-path to clipPath", () => {
      const input = '<g clip-path="url(#clip)"/>';
      const expected = '<g clipPath="url(#clip)"/>';
      expect(convertSvgToJsx(input)).toBe(expected);
    });
  });

  describe("多連字號屬性 (3 段以上)", () => {
    it("should convert color-interpolation-filters", () => {
      const input = '<feColorMatrix color-interpolation-filters="sRGB"/>';
      const expected = '<feColorMatrix colorInterpolationFilters="sRGB"/>';
      expect(convertSvgToJsx(input)).toBe(expected);
    });

    it("should convert glyph-orientation-horizontal", () => {
      const input = '<text glyph-orientation-horizontal="0"/>';
      const expected = '<text glyphOrientationHorizontal="0"/>';
      expect(convertSvgToJsx(input)).toBe(expected);
    });
  });

  describe("XML 命名空間屬性", () => {
    it("should convert xlink:href to xlinkHref", () => {
      const input = '<use xlink:href="#icon"/>';
      const expected = '<use xlinkHref="#icon"/>';
      expect(convertSvgToJsx(input)).toBe(expected);
    });

    it("should convert xmlns:xlink to xmlnsXlink", () => {
      const input = '<svg xmlns:xlink="http://www.w3.org/1999/xlink"/>';
      const expected = '<svg xmlnsXlink="http://www.w3.org/1999/xlink"/>';
      expect(convertSvgToJsx(input)).toBe(expected);
    });

    it("should convert xml:lang to xmlLang", () => {
      const input = '<text xml:lang="en"/>';
      const expected = '<text xmlLang="en"/>';
      expect(convertSvgToJsx(input)).toBe(expected);
    });
  });

  describe("class 保留字", () => {
    it("should convert class to className", () => {
      const input = '<path class="icon-path"/>';
      const expected = '<path className="icon-path"/>';
      expect(convertSvgToJsx(input)).toBe(expected);
    });

    it("should handle multiple classes", () => {
      const input = '<g class="group primary"/>';
      const expected = '<g className="group primary"/>';
      expect(convertSvgToJsx(input)).toBe(expected);
    });
  });

  describe("不應轉換的情況", () => {
    it("should preserve data-* attributes", () => {
      const input = '<path data-icon-id="123" data-testid="icon"/>';
      expect(convertSvgToJsx(input)).toBe(input);
    });

    it("should preserve aria-* attributes", () => {
      const input = '<svg aria-label="Close" aria-hidden="true"/>';
      expect(convertSvgToJsx(input)).toBe(input);
    });

    it("should not affect tag names with hyphens", () => {
      const input = "<linear-gradient><stop/></linear-gradient>";
      expect(convertSvgToJsx(input)).toBe(input);
    });

    it("should not affect attribute values with hyphens", () => {
      const input = '<path fill="url(#my-gradient)"/>';
      expect(convertSvgToJsx(input)).toBe(input);
    });

    it("should not affect URL values with hyphens", () => {
      const input = '<image href="https://my-site.com/icon.svg"/>';
      expect(convertSvgToJsx(input)).toBe(input);
    });

    it("should not modify attributes without hyphens", () => {
      const input = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid"/>';
      expect(convertSvgToJsx(input)).toBe(input);
    });
  });

  describe("混合場景", () => {
    it("should handle multiple attributes in one element", () => {
      const input =
        '<path class="icon" stroke-width="2" fill-opacity="0.8" data-id="1"/>';
      const expected =
        '<path className="icon" strokeWidth="2" fillOpacity="0.8" data-id="1"/>';
      expect(convertSvgToJsx(input)).toBe(expected);
    });

    it("should handle complete SVG icon", () => {
      const input = `<svg viewBox="0 0 24 24" xmlns:xlink="http://www.w3.org/1999/xlink">
  <path class="primary" stroke-width="2" stroke-linecap="round" fill-opacity="1" d="M12 2L2 22h20L12 2z"/>
  <use xlink:href="#icon" aria-hidden="true"/>
</svg>`;
      const expected = `<svg viewBox="0 0 24 24" xmlnsXlink="http://www.w3.org/1999/xlink">
  <path className="primary" strokeWidth="2" strokeLinecap="round" fillOpacity="1" d="M12 2L2 22h20L12 2z"/>
  <use xlinkHref="#icon" aria-hidden="true"/>
</svg>`;
      expect(convertSvgToJsx(input)).toBe(expected);
    });
  });

  describe("邊界情況", () => {
    it("should handle empty string", () => {
      expect(convertSvgToJsx("")).toBe("");
    });

    it("should handle SVG without attributes to convert", () => {
      const input = '<circle cx="12" cy="12" r="10"/>';
      expect(convertSvgToJsx(input)).toBe(input);
    });

    it("should handle self-closing tags", () => {
      const input = '<path stroke-width="2" />';
      const expected = '<path strokeWidth="2" />';
      expect(convertSvgToJsx(input)).toBe(expected);
    });
  });
});
