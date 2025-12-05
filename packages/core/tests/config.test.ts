import { describe, it, expect } from "vitest";
import { IconForgeConfigSchema, defaultConfig } from "../src/config";

describe("Config", () => {
  it("should validate default config", () => {
    const result = IconForgeConfigSchema.safeParse(defaultConfig);
    expect(result.success).toBe(true);
  });

  it("should validate valid custom config", () => {
    const customConfig = {
      srcDirs: ["icons"],
      output: {
        dir: "dist/icons",
      },
    };
    const result = IconForgeConfigSchema.safeParse(customConfig);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.srcDirs).toEqual(["icons"]);
      expect(result.data.output.dir).toEqual("dist/icons");
      // Check defaults are applied
      expect(result.data.output.formats.svg).toBe(true);
    }
  });

  it("should fail on invalid config", () => {
    const invalidConfig = {
      srcDirs: 123, // Should be array of strings
    };
    const result = IconForgeConfigSchema.safeParse(invalidConfig);
    expect(result.success).toBe(false);
  });
});
