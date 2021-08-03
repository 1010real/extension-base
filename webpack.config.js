// import ChromeExtensionReloader from 'webpack-chrome-extension-reloader'

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const outputPath = path.resolve(__dirname, 'dist')

const { NODE_ENV = 'development' } = process.env

const base = {
  entry: {
    popup: './src/popup/index.ts',
    background: './src/background/index.ts',
    contentScript: './src/contentScript/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: outputPath,
    filename: '[name].js',
    publicPath: '',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './src/manifest.json', to: './manifest.json' },
        { from: './src/images', to: 'images' },
        { from: './src/styles', to: 'styles' },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './src/popup/template.html',
      chunks: ['popup'],
      filename: 'popup.html',
    }),
  ],
}

const development = {
  ...base,
  mode: 'development',
  devtool: 'source-map', // todo:後で適切な設定に
  module: {
    ...base.module,
  },
  plugins: [
    ...base.plugins,
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: ['vendor.js'],
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}

const production = {
  ...base,
  mode: 'production',
  devtool: '',
  plugins: [
    ...base.plugins,
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
  ],
}

if (NODE_ENV === 'development') {
  module.exports = development
} else {
  module.exports = production
}
