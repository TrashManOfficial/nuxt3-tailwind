<script setup>
import InfoBar from './InfoBar.vue';
const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})
// const showImg = props.data.metaInfo.listStyle === 2 ? false : true
</script>
<template>
  <!-- <div :class="`w-full flex justify-between ${props.data.metaInfo.listStyle !== 2? 'h-32' : 'h-20'}`"> -->
  <div :class="`w-full flex justify-between min-h-32 pb-4 border-b-[1px] border-gray-300`">
    <div class="flex flex-col justify-between">
      <div class="text-xl font-medium cursor-pointer hover:text-primary">{{ props.data.listTitle }}</div>
      <InfoBar :data="{ source: props.data.source, comment: props.data.commentCount, time: props.data.docPubTime }">
      </InfoBar>
    </div>
    <img v-if="props.data.listStyle !== 2" :src="props.data.thumbnails[0]"
      class="h-full w-44 rounded-lg object-cover" />
  </div>
</template>