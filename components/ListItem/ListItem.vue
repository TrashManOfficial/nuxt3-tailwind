<script setup>
import { ref, watch } from 'vue'
import NewsItem from './NewsItem.vue';
import ImageListItem from './ImageListItem.vue';
import NarrowImage from './NarrowImage.vue';
import NewsItemDetail from './NewsItemDetail.vue';
const props = defineProps({
  data: {
    type: Object,
  },
  plainData: {
    type: Object,
  }
})
const componentsList = {
  0: props.data ? NewsItem : NewsItemDetail,
  1: ImageListItem,
  3: NewsItem,
  2: NewsItem,
  4: NarrowImage,
}
const key = props.data ? props.data.metaInfo.listStyle : props.plainData.listStyle
const finalData = props.data ? props.data : props.plainData
</script>
<template>
  <component :is="componentsList[key]" :data="finalData" class="mb-6"></component>
</template>