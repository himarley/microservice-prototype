const slsw = require('serverless-webpack');
const path = require('path')
module.exports = {
  target: 'node',
  entry: slsw.lib.entries,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  node: false,
  optimization: {
    minimize: false,
  },
  // TODO: this is the most expensive source map to build but seems to be the only one that works reliably in the debugger...
  devtool: 'eval-source-map',
  output: {
      libraryTarget: 'commonjs',
      path: path.resolve(__dirname, '.webpack'),
      filename: '[name].js',
      devtoolModuleFilenameTemplate: 'file:///[absolute-resource-path]'  // map to source with absolute file path not webpack:// protocol
  },
};
