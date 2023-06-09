// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins:[
    // {
    //   src: '@/plugins/record.js',
    //   mode: 'client'
    // }
  ],
  app: {
    baseURL:process.env.BASE_PATH,
  },
  routeRules: {
    '/':  {
      redirect:`${process.env.BASE_PATH}${process.env.HOME_PATH}`
    }
  },
  modules: ["nuxt3-vuex-module", "@vueuse/nuxt"],
  runtimeConfig: {
    public: {
      baseURL: '/xkbapp/fundapi/article/api',
    },
  },
  nitro: {
    routeRules: {
      // '/xkbapp': { proxy: 'https://app.xkb.com.cn' },
      "/fundapis/article/api": { proxy: 'https://app.xkb.com.cn',cors: true, },
    },
    devProxy: {
      "/xkbapp": {
        // 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/api/后的所有路由
        target: "https://app.xkb.com.cn", // 目标地址 --> 服务器地址
        changeOrigin: true, // 允许跨域
      },
      "/fundapis/article/api": {
        // 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/api/后的所有路由
        target: "https://app.xkb.com.cn/fundapis/article/api", // 目标地址 --> 服务器地址
        changeOrigin: true, // 允许跨域
      },
      "/trs_assets": {
        // 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/api/后的所有路由
        target: "https://cdn.xkb.com.cn", // 目标地址 --> 服务器地址
        changeOrigin: true, // 允许跨域
      },
    },
  },
});
