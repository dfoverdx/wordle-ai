const path = require('path');
const {
  DefinePlugin,
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin,
} = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { RUNNING_ON_DESKTOP } = require('./constants')

/** @type {import('webpack').Configuration} */
module.exports = (env, argv) => {
  const PROD = argv.mode === 'production';

  const hotMiddlewareScript =
    !PROD &&
    RUNNING_ON_DESKTOP &&
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'

  return {
    mode: argv.mode || 'development',
    entry: {
      app: [
        './src/app.jsx',
        hotMiddlewareScript,
      ].filter(x => x),
    },
    devtool: RUNNING_ON_DESKTOP &&
      'eval-cheap-source-map',
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
      ...(!PROD
        ? [
          RUNNING_ON_DESKTOP &&
            new HotModuleReplacementPlugin(),
          new NoEmitOnErrorsPlugin(),
        ]
        : [
          new CleanWebpackPlugin(),
          new CopyPlugin({
            patterns: [
              { from: 'data', to: 'data' },
              { from: 'index.html', to: 'index.html' }
            ]
          })
        ]
      )
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
};
