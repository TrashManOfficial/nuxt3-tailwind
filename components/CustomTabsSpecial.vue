<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import DropDownList from './DropDownList.vue';
import StrongTitle from './StrongTitle.vue';
import channelStore from '../store/channel';
import { useRouter } from 'vue-router'
const router = useRouter()

const { state } = channelStore

const DEFAULT_KEY = 'showmore'

const props = defineProps({
  data: Array,
  isPc: Boolean,
})
const tabList = ref([])

watch(() => props.data, (value) => {
  if (value.metaInfo) {
    tabList.value = value.metaInfo?.specialDoc?.groups.map(i => {
      return {
        id: i.groupId,
        name: i.name,
      }
    })
    if (value.metaInfo?.specialDoc?.groups) {
      setCurrentId(tabList.value[0].id)
    } else {
      setCurrentId(value.metaInfo.groupId)
    }

  }
})

const DEFAULT_LENGTH = computed(() => {
  return props.isPc ? 6 : tabList.value.length
})

// //监听屏幕变化，改变tab显示形式
// watch(() => props.isPc, (value) => {
//   DEFAULT_LENGTH.value = value ? 6 : tabList.value.length;
//   tabList.value = [...tabList.value]
// })

const currentId = ref('')

// watch(() => state.currentChannelId, (value) => {
//   currentId.value = value
// })

const setCurrentId = (id) => {
  currentId.value = id
  channelStore.dispatch('setCurrentGroupId', id).then(() => {
    channelStore.dispatch('getSpecialList')
  })
  // router.push('/')
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

const hiddenListClick = (data) => {
  //交换下拉列表的数据和显示tab的末尾数据
  channelStore.dispatch('exchangeItem', { index: DEFAULT_LENGTH.value, data })
  setCurrentId(data.id)
  // debugger
}
</script>
<template>
  <div class="w-full flex ph:overflow-x-auto justify-start">
    <div class="flex justify-start" v-for="item in showList">
      <StrongTitle class="mr-4" :name="item.name" :isCurrent="currentId === item.id" v-if="item.id !== DEFAULT_KEY"
        @click="setCurrentId(item.id)">
      </StrongTitle>
      <div v-else-if="hiddenList.length" class="w-fit cursor-pointer">
        <DropDownList :list="hiddenList" @itemClick="hiddenListClick">
          <div class="font-trsFontFace text-2xl px-1 break-keep font-light">
            {{ item.name }}</div>
        </DropDownList>
      </div>
    </div>
    <div v-if="!isPc" class="flex-1">
      <div :class="`font-trsFontFace text-2xl px-1 break-keep`">
        更多
      </div>
    </div>
  </div>
</template>