<script setup>
const props = defineProps({
  id: String,
  name: String,
  isCurrent: Boolean
})
</script>
<template>
  <div class="w-fit cursor-pointer ph:mr-1">
    <div :class="`font-trsFontFace text-2xl ph:text-xl px-1 break-keep ${props.isCurrent ? 'font-extrabold' : 'font-light'}`">
      {{ props.name }}</div>
    <div :class="`w-fit ${props.isCurrent ? 'isActiveTab font-extrabold' : ''}`"></div>
  </div>
</template>
<style scoped>
.isActiveTab {
  height: 11px;
  width: 100%;
  border-radius: 10px;
  opacity: 0.6;
  background-color: rgba(17, 164, 175, 1);
  transform: rotateX(180deg);
  margin-top: -11px;
}

.isActiveTab::after {
  content: '';
  width: 50%;
  height: 2px;
  display: block;
  margin: 0 auto;
  background-color: rgba(217, 79, 20, 1);
  border-radius: 10px;
}
</style>