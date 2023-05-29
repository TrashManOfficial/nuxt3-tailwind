<script setup>
import { ref, watch } from 'vue'
import { useIntervalFn, useElementHover } from '@vueuse/core'
import { useRouter } from 'vue-router'
import utils from '../../utils'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
const breakpoints = useBreakpoints(breakpointsTailwind)
const isPc = ref(breakpoints.greater('md'))
const router = useRouter()
const toDetail = (data) => {
  utils.jump(data, router, isPc)
}
const carouselRef = ref()
let isCarouselHover = useElementHover(carouselRef)
const props = defineProps({
  list: {
    type: Array,
    required: true
  }
})
const currentVisibleImg = ref(0)
// const timer = ref(null)
const addImgIndex = () => {
  if (currentVisibleImg.value >= props.list.length - 1) {
    currentVisibleImg.value = 0
  } else {
    currentVisibleImg.value++
  }
}
const reduceIndex = () => {
  if (currentVisibleImg.value <= 0) {
    currentVisibleImg.value = props.list.length - 1
  } else {
    currentVisibleImg.value--
  }
}
const { pause, resume } = useIntervalFn(() => {
  addImgIndex()
}, 4000)
watch(isCarouselHover, (value) => {
  if (!value) {
    resume()
  } else {
    pause()
  }
})
const selectImg = (index) => {
  currentVisibleImg.value = index
}
const switchImg = (flag) => {
  if (flag) {
    addImgIndex()
  } else {
    reduceIndex()
  }
}
const reg = new RegExp('_600')
</script>
<template>
  <div class="mx-auto rounded-lg" ref="carouselRef">
    <div class="relative">
      <!-- Carousel wrapper -->
      <div class="overflow-hidden relative h-[440px] ph:h-64 rounded-lg bg-black">
        <div v-for="(item, index) in props.list"
          :class="`duration-700 ease-in-out ${currentVisibleImg === index ? '' : 'hidden'}`">
          <span
            class="absolute top-1/2 left-1/2 text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 sm:text-3xl dark:text-gray-800"></span>
          <img :src="utils.replaceImgPath(item.metaInfo.focusPic)" @click="toDetail(item)"
            class="min-h-[460px] ph:min-h-[255px] block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover" alt="">
          <div
            class="whitespace-normal text-center ph:text-sm flex p-1 absolute bottom-0 left-1/2 z-30 space-x-3 -translate-x-1/2 bg-black w-full min-h-11 max-h-10 opacityLinear text-2xl text-white justify-center items-center rounded-b-lg">
            {{ item.title }}</div>
        </div>
      </div>
      <!-- Slider indicators -->
      <div class="flex absolute bottom-10 left-1/2 z-30 space-x-3 -translate-x-1/2">
        <button v-for="(item, index) in props.list" type="button"
          :class="`w-3 h-3 rounded-full ${index === currentVisibleImg ? 'bg-white' : 'bg-slate-600'}`"
          @click="selectImg(index)"></button>
      </div>
      <!-- Slider controls -->
      <div
        class="flex absolute top-0 left-0 z-0 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none">
        <span @click="switchImg(0)"
          class="inline-flex justify-center items-center w-8 h-8 rounded-full bg-white/50 dark:bg-gray-800/30 group-hover:bg-white/90 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg class="w-5 h-5 text-gray-800 sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span class="hidden">Previous</span>
        </span>
      </div>
      <div
        class="flex absolute top-0 right-0 z-0 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none">
        <span @click="switchImg(1)"
          class="inline-flex justify-center items-center w-8 h-8 rounded-full bg-white/50 dark:bg-gray-800/30 group-hover:bg-white/90 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg class="w-5 h-5 text-gray-800 sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="hidden">Next</span>
        </span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.opacityLinear {
  /* overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; */
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 10.0%, rgba(0, 0, 0, 0.01) 100%);
}
</style>