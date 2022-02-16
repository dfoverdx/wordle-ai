const path = require('path');
const {
  DefinePlugin, 
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin,
} = require('webpack')

const hotMiddlewareScript =
  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'development',
  entry: {
    app: [
      './src/app.jsx',
      hotMiddlewareScript,
    ]
  },
  module: {
    rules: [
      {
        test: (m) => { return /\.(js|jsx)$/.test(m) },
        exclude: (m) => { return /node_modules/.test(m) },
        use: {
          loader: 'babel-loader',
          options: {
            /*presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]*/
          }
        }
      },
      {
        test: (m) => { return /\.css$/.test(m) },
        exclude: (m) => { return /node_modules/.test(m) },
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: (m) => { return /\.(png|jp(e*)g|svg)$/.test(m) },
        exclude: (m) => { return /node_modules/.test(m) },
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000,
            name: 'images/[hash]-[name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      ...Object.fromEntries(
        Object.entries(require('./constants'))
          .map(([k, v]) => [k, JSON.stringify(v)])
      ),
      RUNNING_ON_MOBILE: JSON.stringify(
        process.platform === 'ios'
      ),
    }),
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin(),
  ],
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
  //devtool: false,
};
