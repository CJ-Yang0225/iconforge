import { defineConfig } from "@iconforge/cli";

export default defineConfig({
  srcDirs: ["app/assets/icons"],
  prefix: "iconforge",
  output: {
    dir: "app/components/icons",
    formats: {
      svg: true,
      typescript: true,
      react: false,
      vue: true,
    },
  },
});
