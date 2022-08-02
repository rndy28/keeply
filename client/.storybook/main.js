const { mergeConfig } = require("vite");
const path = require("path");

const aliasMap = {
  components: path.resolve(__dirname, "../src/components"),
  assets: path.resolve(__dirname, "../src/assets"),
  libs: path.resolve(__dirname, "../src/libs"),
  stories: path.resolve(__dirname, "../src/stories"),
  pages: path.resolve(__dirname, "../src/pages"),
  styles: path.resolve(__dirname, "../src/styles"),
};

const config = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    storyStoreV7: false,
  },
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      resolve: { alias: aliasMap },
    });
  },
};

module.exports = config;
