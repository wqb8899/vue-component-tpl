const glob = require('glob')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const WebpackBar = require('webpackbar')

const components = {}
const resolve = dir => path.join(__dirname, '../', dir)

async function getComponents (dirPath, components) {
  const files = glob.sync(`${dirPath}/**/index.js`) // 获取所有组件文件路径
  for (const file of files) {
    const fileName = file.split(/[/.]/)[1] // 获取组件文件名称
    components[fileName] = `./${file}` // 获取entry组合完整对应关系
  }
}
getComponents('packages', components)
module.exports = {
  mode: "production", // production | development
  stats: 'errors-only',
  entry: components,
  output: {
    filename: '[name].js',
    path: resolve('dist'),
    library: 'sform-ui',
    libraryTarget: 'umd'
  },
  plugins: [
    new WebpackBar(),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue/,
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss|css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  }
}
