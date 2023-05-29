<script setup>
import InfoBar from './InfoBar.vue';
import { ref } from 'vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
const breakpoints = useBreakpoints(breakpointsTailwind)
const isPc = ref(breakpoints.greater('md'))
const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})
const formatTitle = (str) => {
  if (str.length > 45) {
    return str.slice(0, 45) + '...'
  } else {
    return str
  }
}
// const showImg = props.data.metaInfo.listStyle === 2 ? false : true
</script>
<template>
  <!-- <div :class="`w-full flex justify-between ${props.data.metaInfo.listStyle !== 2? 'h-32' : 'h-20'}`"> -->
  <div :class="`w-full flex justify-between min-h-32 pb-4 border-b-[1px] border-gray-300 ph:text-sm`">
    <div class="flex flex-col justify-between">
      <div
        class="text-xl font-medium cursor-pointer mr-3 ph:overflow-ellipsis hover:text-primary ph:max-h-28 ph:max-w-[240px] ph:text-lg">
        {{ isPc ? props.data.listTitle : formatTitle(props.data.listTitle) }}</div>
      <InfoBar
        :data="{ source: props.data?.metaInfo?.source, comment: props?.data?.commentCount, time: props.data.docPubTime }">
      </InfoBar>
    </div>
    <img v-lazy="props.data.metaInfo.thumbnails[0]" v-if="props.data.metaInfo.listStyle !== 2"
      class="h-full ph:w-28 w-44 rounded-lg object-cover" />
  </div>
</template>