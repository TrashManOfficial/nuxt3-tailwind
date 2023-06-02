<template>
  <Head>
    <title>{{ '新快网_新中产的移动资讯友伴' }}</title>
    <!-- <meta name="description" :content="ArticleDetail?.metaInfo?.shareDesc" />
      <meta name="keywords" :content="ArticleDetail?.metaInfo?.keyWords" /> -->
  </Head>
  <div v-for="item in [testData[0]]">
    <div>{{ item }}</div>
  </div>
  <div class="w-full flex fixed top-0 bg-white h-20 items-center shadow-md z-50 justify-center"
    v-if="!tabIsVisible && isPc">
    <div class="w-[1500px] flex">
      <div class="w-3/4 flex items-center justify-between">
        <img class="m-2 h-12" src="~/assets/images/logo.png" alt="新快网logo" @click="toHome">
        <CustomTabs ref="tabRef" class="justify-around" :isPc="isPc"></CustomTabs>
      </div>
      <div class="w-1/4 mx-2">
        <SearchBar @onSearch="onSearch">
        </SearchBar>
      </div>
    </div>

  </div>
  <div class="flex flex-col items-center">
    <div
      class="w-full h-[320px] flex items-center flex-col bg-no-repeat bg-cover bg-searchBarBackground ph:bg-none ph:h-fit relative">
      <div class="mask">
      </div>
      <div class="text-lg text-white flex justify-end py-2 pr-6 w-full cursor-pointer ph:hidden absolute ph:relative">
        <ClientOnly>
          <DropDownModal>
            <div class="text-lg text-white flex justify-end py-2 pr-6 w-full cursor-pointer">
              全媒体矩阵
            </div>
          </DropDownModal>
        </ClientOnly>
      </div>
      <div class="w-full h-full flex-1 flex items-center absolute ph:relative">
        <div
          class="h-16 w-full ph:h-14 ph:px-2 flex justify-center ph:justify-between ph:items-center ph:bg-primary flex-col items-center ph:flex-row">
          <img class="hidden ph:flex ph:h-8" src="~/assets/images/logo_m.png" alt="" @click="toHome">
          <SearchBar @onSearch="onSearch" class="w-1/2 ph:w-[250px]">
          </SearchBar>
          <div v-if="isPc" class="w-1/2">
            <div class="mr-4 flex items-center cursor-pointer" v-for="item in channelStore.state.recommendList"
              >
              <img src="~/assets/images/listicon.png" class="h-3 w-3" />
              <a class="text-white" :href="linkRender(item)" target="_blank" @click="toDetail(item)">{{ item.title }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-[1100px] flex ph:w-full justify-center mt-5 ph:mt-3">
      <div class="w-9/12 ph:w-full ph:px-2 mr-6 ph:mr-0">
        <CustomTabs ref="tabRef" class="mb-8 ph:mb-4 ph:pb-2 ph:border-b-[1px] ph:border-gray-300" :isPc="isPc">
        </CustomTabs>
        <div v-if="channelStore.state.currentChannelId === '350' && !isPc">
          <div class="mr-4 flex items-center cursor-pointer" v-for="item in channelStore.state.recommendList"
            >
            <img src="~/assets/images/listicon.png" class="h-3 w-3" />
            <a class="container" :href="linkRender(item)" target="_blank" @click="toDetail(item)"><span :class="`${item.title.length > 20 ? 'scroll-text' : ''}`">{{ item.title }}</span>
            </a>
          </div>
        </div>
        <div class="w-full" v-if="Articlelist.length">
          <Carousel v-if="carouselList?.length" :list="carouselList" class="mb-3"></Carousel>
          <a  v-for="item in Articlelist" :href="linkRender(item)" target="_blank" @click="toDetail(item)">
            <ListItem :data="item" :key="item">
            </ListItem>
          </a>
          <!-- <a v-for="item in Articlelist" :href="toDetail(item)" :key="item" target="_blank">
            <ListItem  :data="item" :key="item">
          </ListItem>
          </a> -->
          <!-- <ListItem v-for="item in Articlelist" :data="item" :key="item" @click="toDetail(item)">
          </ListItem> -->
        </div>
        <!-- <div v-else class="w-full h-[400px] flex justify-center items-center">
          暂无数据
        </div> -->
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
import { ref, watch, onMounted, getCurrentInstance, nextTick } from 'vue';
// import VirtualList from 'vue-virtual-scroll-list'
import ListItem from '../../components/ListItem/ListItem.vue';
import Footer from '../../components/Footer.vue';
import CustomTabs from '../../components/CustomTabs.vue';
import SearchBar from '../../components/SearchBar.vue';
import SideBar from '../../components/SideBar.vue';
import Carousel from '../../components/ListItem/Carousel.vue';
import ScrollToTop from '../../components/ScrollToTop.vue';
import DropDownModal from '../../components/DropDownModal.vue';
import { useRoute, useRouter } from 'vue-router'
import utils from '../../utils'
import { breakpointsTailwind, useBreakpoints, useElementVisibility } from '@vueuse/core'
// import { Head } from '@vueuse/head';
import channelStore from '../../store/channel';
const startRenderList = ref(false)
const breakpoints = useBreakpoints(breakpointsTailwind)
const isPc = ref(breakpoints.greater('md'))
const bottomRef = ref()
const tabRef = ref()
const targetIsVisible = useElementVisibility(bottomRef)
const tabIsVisible = useElementVisibility(tabRef)

const Articlelist = ref([])

const testData = ref([])

const { query } = useRoute()

const toHome = () => {
  const href = router.resolve({
    path: '/home'
  })
  window.open(href.href, '_blank')
}

const linkRender = (data) => {
  return utils.renderLink(data, router, isPc)
}


await channelStore.dispatch('clearArticleList')
const getArticleList = async () => {
  await channelStore.dispatch('getArticleList')
  Articlelist.value = [...channelStore.state.articleList.data]
  startRenderList.value = true
}

//请求栏目列表

// warning !!!!! 不要在同一个函数里面使用多个await !!!!! 会丢失nuxt instance的作用域
// 参考 https://github.com/nuxt/nuxt/issues/14718
// const getChannels = async () => {
//   await channelStore.dispatch('getChannel', query.id)
//   await channelStore.dispatch('getChannelAdd', query.id)
//   // await getArticleList()
//   //请求推荐新闻
//   await channelStore.dispatch('getRecommendList')
// }
// await getChannels()

// 正确操作√
await channelStore.dispatch('getChannel', query.id)
await channelStore.dispatch('getChannelAdd', query.id)
await channelStore.dispatch('getRecommendList')
await getArticleList()

watch(() => channelStore.state.articleList.data, (value) => {
  Articlelist.value = [...value];
})

//监听当前栏目是否为首页，请求轮播图
const carouselList = ref([])
watch(() => channelStore.state.currentChannelId, async (value) => {
  if (value && channelStore.state.channelList.data.length) {
    await getCarousel(value)
  }
})

await channelStore.dispatch('getCarousel', 350)
carouselList.value = [...channelStore.state.carouselList]

const getCarousel = async (value) => {
  const { title } = channelStore.state.channelList.data.find(i => i.id == value)
  if (title === '首页') {
    await channelStore.dispatch('getCarousel', value)
    nextTick(() => {
      carouselList.value = [...channelStore.state.carouselList]
    })
  }
  carouselList.value = []
}

//页面滚动底部请求更多数据
watch(targetIsVisible, (value) => {
  if (startRenderList.value && value && !channelStore.state.articleListOver) {
    channelStore.dispatch('addPage').then(() => {
      getArticleList()
    })
  }
})

const router = useRouter()
const toDetail = (data) => {
  return utils.jump(data, router, isPc)
}

const onSearch = (text) => {
  const herf = router.resolve({
    path: 'search',
    query: {
      keyword: text
    }
  })
  window.open(herf.href, '_blank')
}
</script>
<style scoped>
.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 1;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(3, 47, 50, 0.9));

}

.container {
  width: 340px;
  overflow: hidden;
  white-space: nowrap;
}

.scroll-text {
  display: inline-block;
  animation: scroll 12s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(20px);
  }

  100% {
    transform: translateX(-100%);
  }
}
</style>