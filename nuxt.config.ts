import { NuxtConfig } from '@nuxt/types';

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'inbank-test',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Sebenta'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/main.scss', '~/assets/fonts/sebenta.css'],

  styleResources: {
    scss: ['./assets/scss/settings/_bootstrap-settings.scss', './assets/scss/settings/_settings.scss'],
    hoistUseStatements: true
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/components' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/router',
    '@nuxtjs/style-resources'
  ],

  image: {
    dir: 'assets/images'
  },

  store: true,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/i18n'],

  routerModule: {
    path: 'core/router',
    fileName: 'router.ts'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: process.env.NODE_ENV === 'production',
    loaders: {
      scss: { sourceMap: false }
    },
    babel: {
      presets({ isServer }: { isServer: boolean }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 }
            }
          ]
        ];
      }
    },

    extend: (config: NuxtConfig) => {
      const svgRule = config.module.rules.find((rule: any) => rule.test.test('.svg'));

      svgRule.test = /\.(png|jpe?g|gif|webp)$/;

      config.module.rules.push({
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            loader: 'file-loader',
            query: {
              name: 'assets/[name].[hash:8].[ext]'
            }
          },
          {
            loader: 'vue-svg-loader',
            options: {
              // Optional svgo options
              svgo: {
                plugins: [{ removeViewBox: false }]
              }
            }
          }
        ]
      });
    }
  }
};
