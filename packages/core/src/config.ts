import { z } from "zod";

export const IconForgeConfigSchema = z.object({
  srcDirs: z.array(z.string()).default(["src/assets/icons"]),
  output: z
    .object({
      dir: z.string().default("src/generated/icons"),
      formats: z
        .object({
          svg: z.boolean().default(true),
          typescript: z.boolean().default(true),
          react: z.boolean().default(true),
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

export type IconForgeConfig = z.infer<typeof IconForgeConfigSchema>;

export const defaultConfig: IconForgeConfig = {
  srcDirs: ["src/assets/icons"],
  output: {
    dir: "src/generated/icons",
    formats: {
      svg: true,
      typescript: true,
      react: true,
    },
  },
  colorProcessing: {
    strategy: "currentColor",
    preserveColors: [],
  },
};

export function defineConfig(config: IconForgeConfig): IconForgeConfig {
  return config;
}
