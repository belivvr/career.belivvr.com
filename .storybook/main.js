const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-react-router-v6"
  ],
  "framework": "@storybook/react",
  webpackFinal: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "src": path.resolve(__dirname, "../src"),
    };
  
    return config;
  },
}
