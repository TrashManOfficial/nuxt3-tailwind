<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import DropDownList from './DropDownList.vue';
import StrongTitle from './StrongTitle.vue';
import channelStore from '../store/channel';
import { useRouter, useRoute } from 'vue-router'
import { XMarkIcon, Bars3BottomRightIcon } from '@heroicons/vue/24/solid'
const router = useRouter()
const { query } = useRoute()

const { state } = channelStore

const DEFAULT_KEY = 'showmore'
const DEFAULT_LIST_LENGTH = 7

const props = defineProps({
  isPc: Boolean,
  defautId: String,
})
const tabList = ref([])

const showModal = ref(false)

const el = ref(null)

const divs = ref({})

const currentId = ref('')

// await channelStore.dispatch('getChannel', query.id)
// await channelStore.dispatch('getChannelAdd', query.id)

tabList.value = [...state.channelList.data.map(i => {
  return {
    id: i.id,
    name: i.title
  }
})]
currentId.value = props.defautId || state.currentChannelId
props.defautId && channelStore.dispatch('setCurrentId', currentId.value)
// 移动端浏览器自动滚动到对应栏目位置
if (!props.isPc) {
  nextTick(() => {
    try {
      divs.value[currentId.value].scrollIntoView({ inline: "start" })
    } catch (error) {
    }
  })
}


// onMounted(() => {
//   tabList.value = [...state.channelList.data.map(i => {
//     return {
//       id: i.id,
//       name: i.title
//     }
//   })]
//   currentId.value = state.currentChannelId
//   // 移动端浏览器自动滚动到对应栏目位置
//   if (!props.isPc) {
//     nextTick(() => {
//       divs.value[currentId.value].scrollIntoView({ inline: "start" })
//     })
//   }
// })

watch(() => state.channelList.data, () => {
  tabList.value = [...state.channelList.data.map(i => {
    return {
      id: i.id,
      name: i.title
    }
  })]
})

const DEFAULT_LENGTH = computed(() => {
  // return DEFAULT_LIST_LENGTH
  return props.isPc ? DEFAULT_LIST_LENGTH : tabList.value.length
})

//监听屏幕变化，改变tab显示形式
watch(() => props.isPc, (value) => {
  DEFAULT_LENGTH.value = value ? DEFAULT_LIST_LENGTH : tabList.value.length;
  tabList.value = [...tabList.value]
})

watch(() => state.currentChannelId, (value) => {
  currentId.value = value
  if (!props.isPc) {
    divs.value[currentId.value].scrollIntoView({ inline: "start" })
  }
})

const setCurrentId = (id) => {
  switchShowModal('close')
  channelStore.dispatch('setCurrentId', id).then(() => {
    window.scrollTo(0, 0)
    if (!props.isPc) {
      divs.value?.[currentId.value]?.scrollIntoView({ inline: "start" })
    }
    channelStore.dispatch('getArticleList')
  })
  router.push({ path: '/home', query: { id: id } })
}

const showList = computed(() => {
  return [...tabList.value.slice(0, DEFAULT_LENGTH.value), { id: DEFAULT_KEY, name: '更多' }]
})

const hiddenList = computed(() => {
  if (tabList.value.length < DEFAULT_LENGTH.value) {
    return []
  }
  return tabList.value.slice(DEFAULT_LENGTH.value)
})

const defineData = hiddenList.value.find(item => item.id === props.defautId)
if (defineData) {
  channelStore.dispatch('exchangeItem', { index: DEFAULT_LENGTH.value, data: defineData })
}

const hiddenListClick = (data) => {
  //交换下拉列表的数据和显示tab的末尾数据
  channelStore.dispatch('exchangeItem', { index: DEFAULT_LENGTH.value, data })
  setCurrentId(data.id)
}

const mobileItemClick = (data) => {
  setCurrentId(data.id)
}
// const itemRef = ref([])
const setCurretRef = (el) => {
  if (el) {
    itemRef.value.push(el)
  }
}

const switchShowModal = (close) => {
  if (close === 'close') {
    showModal.value = false
    return
  } else {
    showModal.value = !showModal.value
  }
}
const renderLink = (id) => {
  const path = 'home'
  const params = { id }
  const herf = router.resolve({
    name: path,
    query: params,
  });
  return herf.href
}
</script>
<template>
  <div class="w-full flex ph:overflow-x-auto justify-between scrollBar ph:pr-8" ref="el">
    <div :id="item.id" class="flex justify-start" v-for="item in showList" :ref="el => { divs[item.id] = el }">
      <StrongTitle :href="renderLink(item.id)" :name="item.name" :isCurrent="currentId === item.id"
        v-if="item.id !== DEFAULT_KEY" @click="setCurrentId(item.id)">
      </StrongTitle>
      <div v-else-if="hiddenList.length && isPc" class="w-fit cursor-pointer">
        <DropDownList :list="hiddenList" @itemClick="hiddenListClick">
          <a :href="renderLink(item.id)" class="font-trsFontFace text-2xl px-1 break-keep font-light"
            onclick="return false;">
            {{ item.name }}</a>
        </DropDownList>
      </div>
    </div>
    <div v-if="!isPc" class="flex-1 right-0 top-[68px] bg-white ph:right-0 ph:absolute ph:top-[68px]"
      @click="switchShowModal">
      <Bars3BottomRightIcon class="h-7 ml-2"></Bars3BottomRightIcon>
      <!-- <div :class="`font-trsFontFace text-xl px-1 break-keep`">

            </div> -->
    </div>
    <div v-if="showModal" class="fixed left-0 h-[600px] w-full bg-white bottom-0 rounded-t-lg z-[120] p-3 shadow-xl"
      style="box-shadow: 0 -6px 6px #c1c1c1;">
      <div class="flex w-full justify-between mb-3">
        <StrongTitle :name="`更多栏目`" :isCurrent="true">更多栏目</StrongTitle>
        <XMarkIcon class="w-5 h-5" @click="switchShowModal('close')"></XMarkIcon>
      </div>
      <div class="w-full h-[550px] flex justify-start flex-wrap overflow-y-scroll items-start">
        <div :title="item.name" v-for="item in showList.filter(i => i.name !== '更多')" @click="mobileItemClick(item)"
          href="#"
          class="min-w-[100px] p-2 text-center h-11 mr-3 mb-2 bg-slate-200 overflow-hidden justify-center text-ellipsis whitespace-nowrap items-center text-xl  transition-colors duration-200 transform hover:bg-gray-100">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.scrollBar::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}
</style>