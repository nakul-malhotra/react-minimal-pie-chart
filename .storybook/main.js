module.exports = {
  stories: ['../stories/PieChart.jsx'],
  addons: [
    '@storybook/addon-actions/register',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: /\stories\.jsx?$/,
          // include: [path.resolve(__dirname, '../src')],
        },
      },
    },
  ],
};
