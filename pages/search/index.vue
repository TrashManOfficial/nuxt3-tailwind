<template>
  <Head>
    <Title>{{ '新快网_新中产的移动资讯友伴' }}</Title>
  </Head>
  <div class="w-full flex fixed top-0 bg-white h-20 items-center shadow-md z-50 justify-center" v-if="isPc">
    <div class="w-[1500px] flex">
      <div class="w-full flex items-center justify-between">
        <img class="m-2 h-12" src="~/assets/images/logo.png" alt="新快网logo" @click="toHome">
        <CustomTabs ref="tabRef" class="justify-around" :isPc="isPc"></CustomTabs>
      </div>
      <!-- <div class="w-1/4 mx-2">
        <SearchBar @onSearch="onSearch">
        </SearchBar>
      </div> -->
    </div>

  </div>
  <div class="flex flex-col items-center">
    <div
      class="w-full h-[320px] flex items-center flex-col bg-no-repeat bg-cover bg-searchBarBackground ph:bg-none ph:h-fit">
      <div class="text-lg text-white flex justify-end py-2 pr-6 w-full cursor-pointer ph:hidden">
        <DropDownModal>
          <div class="text-lg text-white flex justify-end py-2 pr-6 w-full cursor-pointer">
            全媒体矩阵
          </div>
        </DropDownModal>
      </div>
      <div class="w-full h-full flex-1 flex items-center">
        <div class="h-16 w-full ph:h-14 ph:px-2 flex justify-center ph:justify-between ph:items-center ph:bg-primary">
          <img class="hidden ph:flex ph:h-8" src="~/assets/images/logo_m.png" alt="" @click="toHome">
          <SearchBar @onSearch="onSearch" :data="query.keyword" class="w-1/2 ph:w-[250px]" ref="tabRef">
          </SearchBar>
        </div>
      </div>
    </div>
    <div class="w-[1100px] flex ph:w-full justify-center mt-5 ph:mt-3">
      <div class="w-9/12 ph:w-full ph:px-2 mr-6 ph:mr-0">
        <!-- <CustomTabs ref="tabRef" class="mb-8 ph:mb-4 ph:pb-2 ph:border-b-[1px] ph:border-gray-300" :isPc="isPc"></CustomTabs> -->
        <div class="w-full" v-if="Articlelist.length">
          <!-- <Carousel v-if="carouselList.length" :list="carouselList" class="mb-3"></Carousel> -->
          <ListItem v-for="item in Articlelist" :data="item" :key="item" @click="toDetail(item)">
          </ListItem>
        </div>
        <div v-else class="w-full h-[400px] flex justify-center items-center">
          暂时没有找到'{{ keyword }}'的文章
        </div>
      </div>
      <div class=" w-3/12 ph:hidden pl-2">
        <SideBar></SideBar>
      </div>
    </div>
    <ScrollToTop v-if="!tabIsVisible"></ScrollToTop>
    <div class="w-full" ref="bottomRef">
      <Footer></Footer>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue';
// import VirtualList from 'vue-virtual-scroll-list'
import ListItem from '../../components/ListItem/ListItem.vue';
import Footer from '../../components/Footer.vue';
import CustomTabs from '../../components/CustomTabs.vue';
import SearchBar from '../../components/SearchBar.vue';
import SideBar from '../../components/SideBar.vue';
import ScrollToTop from '../../components/ScrollToTop.vue';
import DropDownModal from '../../components/DropDownModal.vue';
import { useRoute, useRouter } from 'vue-router'
import utils from '../../utils'
import { breakpointsTailwind, useBreakpoints, useElementVisibility } from '@vueuse/core'
import channelStore from '../../store/channel';
const startRenderList = ref(false)
const breakpoints = useBreakpoints(breakpointsTailwind)
const isPc = ref(breakpoints.greater('md'))
const bottomRef = ref()
const tabRef = ref()
const targetIsVisible = useElementVisibility(bottomRef)
const tabIsVisible = useElementVisibility(tabRef)

const Articlelist = ref([])

const { query } = useRoute()
const { keyword } = query

onMounted(() => {
  channelStore.dispatch('searchArticleList', keyword).then(() => {
    startRenderList.value = true
  })
})

await channelStore.dispatch('getChannelAdd')
const getArticleList = () => {
  channelStore.dispatch('getArticleList')
  Articlelist.value = [...channelStore.state.articleList.data]
  // startRenderList.value = true
}

watch(() => channelStore.state.articleList.data, (value) => {
  Articlelist.value = [...value];
})

watch(targetIsVisible, (value) => {
  if (startRenderList.value && value && !channelStore.state.articleListOver) {
    channelStore.dispatch('addPage').then(() => {
      channelStore.dispatch('searchArticleListAdd').then(() => {
        // channelStore.dispatch('getArticleList')
      })
    })
  }
})

const router = useRouter()
const toDetail = (data) => {
  window.open(utils.renderLink(data, router, isPc))
  // utils.jump(data, router, isPc)
}

const onSearch = (text) => {
  const href = router.resolve({
    path:'/search',
    query:{
      keyword:text
    }
  })
  window.location.href = href.href
  // channelStore.dispatch('searchArticleList', text).then(() => {
  //   // channelStore.dispatch('getArticleList')
  // })
}

const toHome = () => {
  const href = router.resolve({
    path: '/list/350'
  })
  // window.open(href.href, '_blank')
  window.location.href = href.href
}

</script>