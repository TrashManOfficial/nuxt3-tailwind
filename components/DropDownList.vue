<script setup>
import { ref } from 'vue'
import { useElementHover } from '@vueuse/core'
const buttonRef = ref()
// let isButtonHover = true
let isButtonHover = useElementHover(buttonRef)
const emit = defineEmits(['itemClick'])
const props = defineProps({
  list: Array
})
const buttonClick = (item) => {
  isButtonHover.value = false
  emit('itemClick', item)
}
</script>
<template>
  <div class="flex justify-center">
    <div class="relative inline-block">
      <!-- Dropdown toggle button -->
      <div ref="buttonRef"
        class="relative z-10 flex items-center text-sm text-gray-600 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring focus:outline-none">
        <slot></slot>
        <svg class="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
            fill="currentColor"></path>
        </svg>
        <div v-if="isButtonHover" class="absolute top-6 right-0 pt-2 z-40">
          <div class="z-20 p-2 overflow-hidden bg-white rounded-md shadow-xl w-[450px] flex flex-wrap">
            <!-- 点击自动跳转首页 -->
            <div :title="item.name" v-for="item in props.list" @click="buttonClick(item)" href="#"
              class="w-24 p-2 text-center overflow-hidden justify-center text-ellipsis whitespace-nowrap items-center text-xl text-gray-600  transition-colors duration-200 transform hover:bg-gray-100">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
