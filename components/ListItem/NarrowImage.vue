<script setup>
import InfoBar from './InfoBar.vue';
import utils from '../../utils';
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <div class="w-full">
    <img v-lazy="utils.replaceImgPath(props.data.metaInfo.thumbnails[0])" class="w-full rounded-xl"/>
  </div>
</template>