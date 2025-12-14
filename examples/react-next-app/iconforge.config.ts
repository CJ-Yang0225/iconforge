import { defineConfig } from "@iconforge/core";

export default defineConfig({
  srcDirs: ["src/assets/icons"],
  output: {
    dir: "src/components/icons",
    formats: {
      svg: true,
      typescript: true,
      react: true,
    },
  },
});
