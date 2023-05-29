<template>
  <div @click="scrollToTop"
    class="fixed right-24 bottom-32 ph:right-4 ph:bottom-6 rounded-2xl flex flex-col justify-center items-center shadow-xl p-3 cursor-pointer bg-white z-[100] active:bg-primary">
    <img class="w-8 h-8 ph:w-4 ph:h-4" src="~/assets/images/toTop.png" alt="">
    <div class="text-xs ph:hidden">回到顶部</div>
  </div>
</template>
<script setup>
const scrollToTop = () => {
  window.scrollTo(0, 0)
}
</script>