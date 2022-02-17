const express = require('express')
const webpack = require('webpack')
const webpackMiddleware =
  require('webpack-dev-middleware')
const webpackHotMiddleware =
  require('webpack-hot-middleware')
const path = require('path')
const { RUNNING_ON_DESKTOP } = require('./constants')

// not necessary yet!  huzzah!  🥳
//const api = require('./api')

const dataPath = path.resolve(__dirname, 'data')

// Setup
const app = express();
const port = process.env['REACT_APP_PORT'] || 3001
const config = require('./webpack.config.js')
const compiler = webpack(config);
const devMiddleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  serverSideRender: false,
  watchOptions: {
    // Due to iOS devices memory constraints
    // disabling file watching is recommended 
    ignored: [
      'dist/**',
      'data/**',
      /node_modules/,
    ],
    //ignored: /.*/,
  },
  writeToDisk: true,
})
app.use(devMiddleware)

if (RUNNING_ON_DESKTOP) {
  const hotMiddleware = webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  })
  
  app.use(hotMiddleware)
}

app.use('/data', express.static(dataPath))
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname })
})

// Launch app
app.listen(port, () => {
  console.log(
    'Launching app... http://localhost:' + port + '\n'
  )
})

// Register app and middleware. Required for better
// performance when running from play.js
try {
  typeof pjs === 'object' && 
    pjs.register(app, devMiddleware)
} catch (error) {
  console.error(error)
}
