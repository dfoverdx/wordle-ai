const express = require('express');
const webpack = require('webpack');
const webpackMiddleware =
  require('webpack-dev-middleware');
const fs = require('fs');
const path = require('path')

const l = console.log.bind(console)

const dataPath = path.resolve(__dirname, 'data')

// Setup
const app = express();
const port = process.env['REACT_APP_PORT'];
const config = require('./webpack.config.js');
const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  serverSideRender: false,
  watchOptions: {
    // Due to iOS devices memory constraints
    // disabling file watching is recommended 
    //ignored: /.*/
    ignored: /node_modules/
  },
  //writeToDisk: true,
});
app.use(middleware);
app.use('/data', express.static(dataPath))
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

// Launch app
app.listen(port, () => {
  console.log(
    'Launching app... http://localhost:' + port + '\n'
  );
});

// Register app and middleware. Required for better
// performance when running from play.js
try { pjs.register(app, middleware); } catch (error) { }
