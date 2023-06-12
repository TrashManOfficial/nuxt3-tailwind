<script setup>
import { onMounted, ref, watch } from 'vue'
import channelStore from '../store/channel';
import StrongTitle from './StrongTitle.vue';
import { useRouter } from 'vue-router'
import utils from '../utils'
import axios from '../plugins/axios'
const axiosReqres = axios().provide.axios
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
const breakpoints = useBreakpoints(breakpointsTailwind)
const isPc = ref(breakpoints.greater('md'))
const router = useRouter()
const toDetail = (data) => {
  utils.jump(data, router, isPc)
}
const featuresList = ref([])
// const getFeatures = () => {
//   // const id = channelStore.state.channelList.data.find(i => i.title == '专题').id
//   const id = channelStore.state.channelListRaw.data.find(i => i.title == '专题').id
//   channelStore.dispatch('getArticleList', id).then(() => {
//     featuresList.value = channelStore.state.featuresList
//   })
// }
// watch(() => channelStore.state.channelList.data, (value) => {
//   getFeatures()
// })
const requestData = async () => {
  const {data} = await axiosReqres('/articles?chnlId=430&visibility=1&page=0&size=10',{server:false})
  featuresList.value = data.data
}
requestData()

const linkRender = (data) => {
  return utils.renderLink(data, router, isPc)
}
// onMounted(requestData)

// watch(() => channelStore.state.featuresList, (value) => {
//   featuresList.value = value
// })
</script>
<template>
  <div class="flex flex-col">
    <StrongTitle :name="'轻报纸'" :isCurrent="true" class="mb-3"></StrongTitle>
    <a href="https://epaper.xkb.com.cn/" target="_blank">
      <img src="https://epaper.xkb.com.cn/index.php?s=/index/firstedition/" class="w-full h-full rounded-lg" />
    </a>
  </div>
  <div class="flex flex-col sticky top-[80px] bg-white">
    <StrongTitle :name="'专题'" :isCurrent="true" class="mb-3 mt-4"></StrongTitle>
    <div class="bg-teal-50 rounded-xl p-3">
      <div class="mr-4 flex items-center mb-2 cursor-pointer" v-for="item in featuresList">
        <img src="~/assets/images/listicon.png" class="h-3 w-3" />
        <a :href="linkRender(item)" @click.prevent="toDetail(item)" target="_blank">{{ item.title }}</a>
      </div>
  </div>
  <div class="full flex items-start ph:px-1 ph:py-3 flex-col text-sm mt-2 text-gray-400">
    <div>
      <a class="active:text-yellow-400 hover:text-yellow-400" href="https://beian.miit.gov.cn/#/Integrated/index"
          target="_blank">粤ICP备10220059号 </a>
      </div>
      <div class="flex items-center">
        <img class="w-4" src="~/assets/images/ygaba.png" alt="">
        <a class="active:text-yellow-400 hover:text-yellow-400"
          href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44010602008415" target="_blank">粤公网安备
          44010602008415号 </a>
      </div>
    </div>
  </div>
  <div>
    <!-- <div class="full flex items-start ph:px-1 ph:py-3 flex-col text-sm mt-2">
      <div>
        <a class="active:text-yellow-400 hover:text-yellow-400" href="https://beian.miit.gov.cn/#/Integrated/index"
          target="_blank">粤ICP备10220059号 </a>
      </div>
      <div class="flex items-center">
        <img class="w-4" src="~/assets/images/ygaba.png" alt="">
        <a class="active:text-yellow-400 hover:text-yellow-400"
          href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44010602008415" target="_blank">粤公网安备
          44010602008415号 </a>
      </div>
    </div> -->
  </div>
  <!-- <div class="flex flex-col">
                  <StrongTitle :name="'乡村振兴日记'" :isCurrent="true" class="mb-3"></StrongTitle>
                  <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                    class="w-full h-[425px] object-cover rounded-lg" />
                </div> -->
</template>