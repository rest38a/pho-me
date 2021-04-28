// module.exports = {
//   presets: [
//     '@quasar/babel-preset-app',
//   ],
// };

const presets = ['@quasar/babel-preset-app'];
const plugins = [];

if (process.env.NODE_ENV === 'production') {
  plugins.push([
    'transform-remove-console', {
      exclude: ['error', 'warn'],
    }]);
}

module.exports = { presets, plugins };
