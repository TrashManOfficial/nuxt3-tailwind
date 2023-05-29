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
</script>
<template>
  <div ref="buttonRef" class="w-full">
    <slot name="main"></slot>
    <!-- <svg class="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
                      fill="currentColor"></path>
                  </svg> -->
    <div v-if="isButtonHover" class="absolute top-1/3 right-12 p-2 z-40 flex bg-white justify-between rounded-lg">
      <slot name="show"></slot>
    </div>
  </div>
</template>
