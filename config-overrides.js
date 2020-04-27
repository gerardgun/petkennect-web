const { override, addWebpackAlias } = require('customize-cra')
const { custominzeCra } = require('./package.json')

const aliases = Object
  .entries(custominzeCra.aliases)
  .reduce((a, [ key/* , path */ ]) => ({
    ...a, [key]: custominzeCra.aliases[key].replace('.', __dirname)
  }), {})

module.exports = override(
  addWebpackAlias(aliases)
)
