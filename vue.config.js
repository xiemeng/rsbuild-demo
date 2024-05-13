const path = require('path')
const webpack = require('webpack')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const GitRevision = new GitRevisionPlugin()
const HtmlWebpackPlugin = require('html-webpack-plugin')
const buildDate = JSON.stringify(new Date().toLocaleString())
const createThemeColorReplacerPlugin = require('./config/plugin.config')
const HappyPack = require('happypack')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// check Git
function getGitHash() {
  try {
    return GitRevision.version()
  } catch (e) {}
  return 'unknown'
}

const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
  // webpack build externals
  externals: {
    // vue: 'Vue',
    // 'vue-router': 'VueRouter',
    // vuex: 'Vuex',
    // axios: 'axios'
  },
  css: [],
  // https://unpkg.com/browse/vue@2.6.10/
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js',
  ],
}

// vue.config.js
const vueConfig = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.ts',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
    },
  },
  configureWebpack: {
    // webpack plugins
    resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader?cacheDirectory=true',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
        },
      ],
    },
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
        APP_VERSION: `"${require('./package.json').version}"`,
        GIT_HASH: JSON.stringify(getGitHash()),
        BUILD_DATE: buildDate,
      }),
      new HappyPack({
        id: 'happybabel',
        loaders: ['babel-loader?cacheDirectory'],
        // 开启 4 个线程
        threads: 4,
      }),
    ],
    // if prod, add externals
    externals: isProd ? assetsCDN.externals : {},
  },

  chainWebpack: (config) => {
    config.resolve.alias.set('@$', resolve('src'))
    config.plugin('cache').use(HardSourceWebpackPlugin)
    config.plugin('xcTime').use(SpeedMeasurePlugin)
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]',
      })

    // if prod is on
    // assets require on cdn
    // if (isProd) {
    //   config
    //     .plugin("html")
    //     .tap((args) => {
    //       args.cdn = assetsCDN.assets;
    //       return args;
    //     });
    // }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme

          // 'primary-color': '#F5222D',
          // 'link-color': '#F5222D',
          'border-radius-base': '2px',
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true,
      },
    },
    // requireModuleExtension: false
  },

  devServer: {
    // development server port 8000
    port: 8000,
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    proxy: {
      '/api': {
        // target: 'http://testscrm.kolify.cn/', //测试
        // target: 'http://10.13.9.213:10240/', // 徐培峰
        // target: 'http://10.13.9.94:10250/', // 崔荣鹏
        // target: 'http://10.13.9.91:10032/', // 王文强
        // target: 'https://scrm.kolify.com.cn/', // dev环境 https://scrm.acadsoc.com.cn/
        target: 'https://scrm.kolify.cn/',
        ws: true,
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: [],
}

// preview.pro.loacg.com only do not use in your production;
if (process.env.VUE_APP_PREVIEW === 'true') {
  console.log('VUE_APP_PREVIEW', true)
  // add `ThemeColorReplacer` plugin to webpack plugins
  vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

module.exports = vueConfig
