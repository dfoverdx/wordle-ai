const path = require('path');
const {
  DefinePlugin,
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin,
} = require('webpack')
const { RUNNING_ON_DESKTOP } = require('./constants')

const hotMiddlewareScript = RUNNING_ON_DESKTOP &&
  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'development',
  entry: {
    app: [
      './src/app.jsx',
      hotMiddlewareScript,
    ].filter(x => x),
  },
  devtool: RUNNING_ON_DESKTOP && 'eval-cheap-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      ...Object.fromEntries(
        Object.entries(require('./constants'))
          .map(([k, v]) => [k, JSON.stringify(v)])
      ),
    }),
    RUNNING_ON_DESKTOP && 
      new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin(),
  ].filter(x => x),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
};
