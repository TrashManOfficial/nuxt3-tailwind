<script setup>
import util from '../../utils'
const props = defineProps({
  data: {
    type: Object
  }
})
</script>
<template>
  <div class="flex justify-start text-gray-500">
    <div class="mr-4">{{ data.source || '新快报' }}</div>
    <!-- <div class="mr-4 flex items-center">
      <img src="../~/assets/images/comment.png" class="h-4 w-5" />
      <div>评论：<span class="text-primary">{{ data.comment }}</span></div>
    </div> -->
    <div class="mr-4">{{ util.timeFormat(data.time,data.isSSR) }}</div>
  </div>
</template>