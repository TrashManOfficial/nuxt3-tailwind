<template>
  <div class="mt-2 mb-2 border-2 pl-4 flex justify-between rounded-3xl bg-white ">
    <input class="flex-grow outline-none text-gray-600 focus:text-primary w-2/4" type="text"
      placeholder="输入关键词搜索" v-model="text" @keyup.enter="onSearch"/>
    <img class="h-12 w-12 ph:h-9 ph:w-9 cursor-pointer active:scale-75" src="~/assets/images/search.png" alt="搜索" @click="onSearch">
  </div>
</template>
<script setup>
import { ref } from 'vue';
const props = defineProps({
  data:String
})
const text = ref(props.data)
const emit = defineEmits(['onSearch', 'delete'])
const onSearch = () => {
  emit('onSearch',text.value)
}
</script>