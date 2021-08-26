const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  modifyVars: { "@primary-color": "#9fd356" },
  lessVarsFilePathAppendToEndOfContent: false,
  cssLoaderOptions: {},
  webpack5: true,
  webpack: (config) => {
    return config;
  },
});
