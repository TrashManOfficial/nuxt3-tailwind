<script setup>
import { ref } from 'vue'
import { useElementHover } from '@vueuse/core'
import utils from '../utils'
const buttonRef = ref()
// let isButtonHover = true
let isButtonHover = useElementHover(buttonRef)
// const emit = defineEmits(['itemClick'])
// const props = defineProps({
//   list: Array
// })
const buttonClick = (item) => {
  isButtonHover.value = false
  emit('itemClick', item)
}
const imglist = [
  {
    src: '~/assets/images/douyin_qrcode.png',
    name: 'douyin_qrcode',
    alt: '抖音'
  },
  {
    src: '~/assets/images/sina_qrcode.png',
    name: 'sina_qrcode',
    alt: '微博'
  },
  {
    src: '~/assets/images/wx_qrcode.png',
    name: 'wx_qrcode',
    alt: '公众号'
  }
]
const generateImgPath = (fileName) => {
  return new URL(`../assets/images/${fileName}.png`, import.meta.url).href
}
</script>
<template>
  <div class="flex justify-center">
    <div class="relative inline-block">
      <!-- Dropdown toggle button -->
      <div ref="buttonRef"
        class="relative z-10 flex items-center border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 focus:ring focus:outline-none">
        <slot></slot>
        <!-- <svg class="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
                    fill="currentColor"></path>
                </svg> -->
        <div v-if="isButtonHover" class="absolute top-9 right-0 p-2 z-40 flex bg-white w-[420px] justify-between rounded-lg">
          <div v-for="item in imglist" class="flex flex-col items-center">
            <img class="w-20 h-20" :src="generateImgPath(item.name)" :alt="item.alt">
            <div class="text-black text-sm">{{ item.alt }}</div>
          </div>
          <div class="flex flex-col items-center">
            <img class="w-20 h-20" src="https://app.xkb.com.cn/fundapis/uc/api/files/rc-upload-1672040423081-6" alt="">
            <div class="text-black text-sm">安卓下载</div>
          </div>
          <div class="flex flex-col items-center">
            <img class="w-20 h-20" src="~/assets/images/ios.png" alt="">
            <div class="text-black text-sm">ios下载</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
