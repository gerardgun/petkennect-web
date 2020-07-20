const { override, addBabelPlugins, addWebpackAlias } = require('customize-cra')
const { custominzeCra } = require('./package.json')

const aliases = Object
  .entries(custominzeCra.aliases)
  .reduce((a, [ key/* , path */ ]) => ({
    ...a, [key]: custominzeCra.aliases[key].replace('.', __dirname)
  }), {
    'react-dom': '@hot-loader/react-dom'
  })

module.exports = override(
  addWebpackAlias(aliases),
  addBabelPlugins('react-hot-loader/babel')
)
