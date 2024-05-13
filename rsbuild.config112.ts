import { pluginVue2 } from '@rsbuild/plugin-vue2'
import { defineConfig, loadEnv } from '@rsbuild/core'

const { publicVars } = loadEnv({ prefixes: ['VUE_APP_'] })
const path = require('path')
const isProd = process.env.NODE_ENV === 'production'
const assetsCDN = {
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
function resolve(dir) {
  return path.join(__dirname, dir)
}
export default defineConfig({
  plugins: [pluginVue2()],
  source: {
    // 指定入口文件
    entry: {
      index: './src/main.ts',
    },
    define: publicVars,
  },
  html: {
    template: './public/index.html',
  },
  tools: {
    cssLoader: {},
    less: {
      // additionalData: `@import "${resolve(__dirname, 'src')}/style/var.less";`,
      lessOptions: {
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
    rspack: {
      resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
      mode: !isProd ? 'development' : 'production',
      plugins: [
        // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      ],
      // if prod, add externals
      externals: isProd ? assetsCDN.externals : {},
    },
    bundlerChain: (config) => {
      config.resolve.alias.set('@$', resolve('src'))
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
    },
  },
  server: {
    port: 8000,
    proxy: {
      '/api': {
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
})
