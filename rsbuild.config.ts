import { defineConfig, loadEnv } from '@rsbuild/core'
import { pluginVue2 } from '@rsbuild/plugin-vue2'
import { pluginBabel } from '@rsbuild/plugin-babel'
import { pluginVue2Jsx } from '@rsbuild/plugin-vue2-jsx'

const argv = process.argv.reduce((acc, cur) => {
  const arr = cur.split('=')
  if (arr.length > 1) {
    acc[arr[0].replace(/^--/g, '')] = arr[1]
  }
  return { ...acc }
}, {} as Record<string, string>)

const IS_PROD = ['production'].includes(process.env.NODE_ENV!)
const { publicVars: vueEnvs } = loadEnv({ prefixes: ['VUE_APP_'] })

const assetsCDN = {
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
  },
  css: [],
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2.7.16/dist/vue.min.js',
    'https://cdn.jsdelivr.net/npm/vue-router@3.6.5/dist/vue-router.min.js',
    'https://cdn.jsdelivr.net/npm/vuex@4.1.0/dist/vuex.global.min.js',
  ],
}

const sourceMapFlag = !IS_PROD || argv.sso_env ? 'source-map' : false

export default defineConfig(({ envMode, env }) => {
  const proxy: Record<string, string> | undefined = {
    production: {
      '/apisso': 'https://www.example.com',
    },
    development: {
      '/api': 'https://scrm.kolify.cn',
    },
  }[argv.api_mode || envMode || process.env.NODE_ENV || 'development']
  return {
    plugins: [
      pluginVue2(),
      pluginBabel({
        include: /\.(?:jsx|tsx)$/,
        exclude: /[\\/]node_modules[\\/]/,
      }),
      pluginVue2Jsx(),
    ],
    dev: {
      assetPrefix: '/' + (argv.sso_env ? `${argv.sso_env}/` : ''),
      progressBar: true,
    },
    output: {
      assetPrefix: '/' + (argv.sso_env ? `${argv.sso_env}/` : ''),
      sourceMap: {
        js: sourceMapFlag,
        css: !!sourceMapFlag,
      },
    },
    server: {
      port: 8000,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      proxy: (() => {
        if (!proxy) return
        const entries = Object.keys(proxy).map((key) => {
          const value = {
            changeOrigin: true,
            pathRewrite: { [`^${key}`]: '' },
            target: proxy[key],
          }
          return [key, value]
        })
        return Object.fromEntries(entries)
      })(),
    },
    source: {
      define: {
        ...vueEnvs,
        'process.env': {
          ...process.env,
          SSO_ENV: JSON.stringify(argv.sso_env),
        },
      },
      entry: {
        index: './src/main.ts',
      },
      transformImport: [
        {
          libraryName: 'lodash',
          customName: 'lodash/{{ member }}',
        },
        {
          libraryName: 'ant-design-vue',
          libraryDirectory: 'es',
          style: true,
        },
      ],
    },
    html: {
      template: './public/index.html',
      templateParameters: {
        cdn: assetsCDN,
      },
    },
    tools: {
      rspack: {
        mode: env === 'development' || envMode === 'alpha2' ? 'development' : 'production',
        devtool: 'eval-cheap-module-source-map',
        externals: assetsCDN.externals,
        resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
      },
      less: {
        // additionalData: `@import "${resolve(__dirname, 'src')}/style/var.less";`,
        //  rubuild  默认内置less4 项目用的是less3
        implementation: require('less'),
        lessOptions: {
          modifyVars: {
            // less vars，customize ant design theme

            // 'primary-color': '#F5222D',
            // 'link-color': '#F5222D',
            'border-radius-base': '2px',
          },
          // DO NOT REMOVE THIS LINE
          javascriptEnabled: true,
          preferRelative: true,
        },
      },
    },
    performance: {
      removeMomentLocale: true,
      removeConsole: IS_PROD ? ['log'] : undefined,
      chunkSplit: {
        strategy: 'split-by-experience',
      },
    },
  }
})
