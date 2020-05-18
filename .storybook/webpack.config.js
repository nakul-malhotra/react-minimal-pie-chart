const path = require('path');
const ROOT = path.join(process.cwd());

module.exports = ({ config, mode }) => {
  config.resolve.extensions.push('.ts', '.tsx');

  config.module.rules.forEach((rule) => {
    // Basic js/ts file loader
    if (rule.test.test && rule.test.test('.jsx')) {
      // Add "svg-partial-circle" to the paths to be transpiled
      if (!Array.isArray(rule.include)) {
        rule.include = [];
      }
      rule.include.push(path.join(ROOT, 'node_modules', 'svg-partial-circle'));

      // Transpile TS extensions
      rule.test = /\.(mjs|[tj]sx?)$/;
    }

    // // TS loader specifically targeting stories folder
    // if (
    //   rule.test.test &&
    //   rule.test.test('stories/foo.tsx') &&
    //   !rule.test.test('.tsx')
    // ) {
    //   rule.loaders = [
    //     {
    //       loader: require.resolve('@storybook/source-loader'),
    //       options: { parser: 'typescript' },
    //     },
    //   ];
    // }
  });
  console.log(config.module.rules);

  return config;
};
