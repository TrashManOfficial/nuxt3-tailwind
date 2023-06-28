<script setup>
import InfoBar from './InfoBar.vue';
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <div class="w-full">
    <div class="text-xl font-medium cursor-pointer ph:text-lg hover:text-primary">{{ props.data.listTitle }}</div>
    <div class="w-full flex">
      <div v-for="item in props.data.metaInfo.thumbnails" class="w-full px-2 py-1">
        <img v-lazy="item" class="w-full h-44 ph:h-20 object-cover rounded-lg" referrerpolicy="no-referrer"/>
      </div>
    </div>
    <InfoBar :data="{ source: props.data.metaInfo.source, comment: props.data.commentCount, time: props.data.docPubTime }">
    </InfoBar>
  </div>
</template>