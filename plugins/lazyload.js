import { defineNuxtPlugin } from '#app'
import VueLazyLoad from 'vue3-lazyload'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VueLazyLoad)
})