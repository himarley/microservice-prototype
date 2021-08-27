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
  devtool: 'inline-source-map',
  output: {
      libraryTarget: 'commonjs',
      path: path.resolve(__dirname, '.webpack'),
      filename: '[name].js',
      devtoolModuleFilenameTemplate: 'file:///[absolute-resource-path]'  // map to source with absolute file path not webpack:// protocol
  },
};
