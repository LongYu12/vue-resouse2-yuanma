const { resolve } = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { DefinePlugin} = require('webpack')
module.exports = {
  entry: './index.js',
  output: {
    filename: 'js/main.js',
    path: resolve(__dirname, 'dist'),
    // publicPath: './' // index.html内部资源的引用路劲
    // 指定经过asset处理过的都放在这个设置的目录中
    // 注意[hash:6]中冒号不能加空格，[hash:6]后面不用加点.
    // 但是在这里的配置就会出现像字体文件等也会打包进去，
    // assetModuleFilename: "img/[name].[hash:6][ext]" 
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              //  如果需要对css进行处理，往前找一个，这里是找postcss-loader
              // 这样postcss-loader处理完而没法回头的情况就能解决了
              importLoaders: 1 ,
              esModule: false  // 让生成的背景图片资源不是es66的module的形式
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {   // 配置处理图片 asset
        test: /\.(png|gif|svg|jpe?g)$/,
        // type: 'asset/resource',
        type: 'asset',
        generator: {// 配置图片打包位置
          filename: "img/[name].[hash:6][ext]" 
        },
        parser: {
          dataUrlCondition: {
            maxSize: 35 * 1024 // 超过这个值35kb就拷贝，否则变成base64
          }
        }
      },
      {
        // 处理字体图标
        test: /\.(ttf|woff2?)$/,
        type: 'asset/resource',
        generator: {// 配置图片打包位置
          filename: "font/[name].[hash:6][ext]" 
        },
      },
      // {
      //   // 配置处理图片
      //   test: /\.(png|gif|svg|jpe?g)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         esModule: false, // 不转为 esModule]
      //         /**
      //          * [ext]: , // 扩展名
      //          * [name]: 文件名
      //          * [hash]: , // 占位符，使用哈希防止同名
      //          * [hash:<length>] , // 名称长度
      //          * [path]: // 生成图片的放置路径
      //          * */ 
      //         name: '[name].[hash:10].[ext]', // 命名
      //         outputPath: 'img' // 打包后的输出路劲
      //       }
      //     }
      //   ]
      // },
      // {
      //   // 配置处理图片
      //   test: /\.(png|gif|svg|jpe?g)$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         name: '[name].[hash:10].[ext]', // 命名
      //         limit: 25 * 1024 // 即25kb，超过这个值就拷贝，否则变成base64
      //       }
      //     }
      //   ]
      // }
      {
        // 处理JS，转为ES5等浏览器能识别的语法
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  // {//配置适配的浏览器
                  //   targets: 'chrome 91'
                  // }
                ]
              ]
            }
          }
        ]
      }
    ]
  },
  // 插件配置
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack学习',
      template: './public/index.html'
    }),
    new DefinePlugin({
      BASE_URL:'"./'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions:{
            ignore: ['**/index.html'] // 忽略不打包的
          }
        }
      ]
    })
  ],
  // 热更新配置（无需每次有修改后都输命令来启动、打包项目）
  // watch: true,
  mode: 'development',
  stats: 'errors-only' // 只输出主要信息和报错
}