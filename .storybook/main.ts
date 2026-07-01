import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/react-vite",
  async viteFinal(config) {
    if (config.server) {
      // Storybook needs file watching to serve the preview frame correctly.
      // We override the 'null' watch setting from the main vite.config.ts here.
      config.server.watch = {};
      config.server.hmr = false; // Disable HMR to avoid preview flickering
    }
    return config;
  }
};
export default config;