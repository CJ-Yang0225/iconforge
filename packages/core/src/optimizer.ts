import { optimize, Config as SvgoConfig } from "svgo";
import { IconForgeConfig } from "./config";

export function optimizeIcon(content: string, config: IconForgeConfig): string {
  const svgoConfig: SvgoConfig = {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false, // Important for scaling
          },
        },
      },
      // Add custom plugins based on config if needed
      ...(config.svgo?.plugins || []),
    ],
    // Handle color processing
    ...getColorProcessingConfig(config),
  };

  const result = optimize(content, svgoConfig);
  return result.data;
}

function getColorProcessingConfig(config: IconForgeConfig): SvgoConfig {
  if (config.colorProcessing.strategy === "currentColor") {
    return {
      plugins: [
        {
          name: "preset-default",
          params: {
            overrides: {
              removeViewBox: false,
            },
          },
        },
        {
          name: "convertColors",
          params: {
            currentColor: true,
          },
        },
        // We might need a custom plugin or more complex logic to handle 'preserveColors'
        // For now, let's stick to basic currentColor conversion
      ],
    };
  }
  return {};
}
