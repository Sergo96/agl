const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  webpack(config, options) {
    const { dev, isServer } = options;
    if (dev && isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }
    config.module.rules
      .filter((rule) => !!rule.oneOf)
      .forEach((rule) => {
        rule.oneOf
          .filter((oneOfRule) => {
            return oneOfRule.test
              ? oneOfRule.test.toString().includes('sass') &&
                  Array.isArray(oneOfRule.use) &&
                  oneOfRule.use.some((use) => use.loader.includes('sass-loader'))
              : false;
          })
          .forEach((rule) => {
            rule.use = rule.use.map((useRule) => {
              if (useRule.loader.includes('sass-loader')) {
                return {
                  ...useRule,
                  options: {
                    ...useRule.options,
                    additionalData: `@import './src/styles/variables';@import './src/styles/mixin';`,
                  },
                };
              }
              return useRule;
            });
          });
      });
    return config;
  },
};
