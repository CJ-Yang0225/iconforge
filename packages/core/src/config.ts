import { z } from "zod";

export const IconForgeConfigSchema = z.object({
  srcDirs: z.array(z.string()).default(["src/assets/icons"]),
  prefix: z.string().default("iconforge"), // For future VSCode extension icon pattern
  output: z
    .object({
      dir: z.string().default("src/components/icons"),
      formats: z
        .object({
          svg: z.boolean().default(true),
          typescript: z.boolean().default(true),
          react: z.boolean().default(true),
          vue: z.boolean().default(false),
        })
        .default({}),
    })
    .default({}),
  svgo: z
    .object({
      plugins: z.array(z.any()).default([]),
    })
    .optional(),
  colorProcessing: z
    .object({
      strategy: z
        .enum(["currentColor", "strip", "preserve"])
        .default("currentColor"),
      preserveColors: z.array(z.string()).default([]),
    })
    .default({}),
});

// Export the input type (allows optional fields with defaults)
export type IconForgeConfigInput = z.input<typeof IconForgeConfigSchema>;
// Export the output type (fully resolved)
export type IconForgeConfig = z.output<typeof IconForgeConfigSchema>;

export const defaultConfig: IconForgeConfig = {
  srcDirs: ["src/assets/icons"],
  prefix: "iconforge",
  output: {
    dir: "src/components/icons",
    formats: {
      svg: true,
      typescript: true,
      react: true,
      vue: false,
    },
  },
  colorProcessing: {
    strategy: "currentColor",
    preserveColors: [],
  },
};

export function defineConfig(
  config: IconForgeConfigInput
): IconForgeConfigInput {
  return config;
}
