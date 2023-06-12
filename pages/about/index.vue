<template>
  <div
    :class="`w-full flex bg-white h-20 items-center shadow-md z-50 justify-between ${tabIsVisible ? '' : 'fixed top-0'}`"
    v-if="isPc">
    <div class="w-3/4 flex items-center justify-between">
      <img class="m-2 h-12" src="~/assets/images/logo.png">
      <CustomTabs class="justify-around" :isPc="isPc"></CustomTabs>
    </div>
  </div>
  <div ref="tabRef"></div>
  <div class="flex flex-col items-center">
    <div class="w-3/4 ph:w-full">
      <img class="w-full ph:hidden" src="~/assets/images/about.jpg" alt="">
      <div class="flex m-10">
        <div class="text-lg ph:text-base">
          <img src="~/assets/images/miniLogo.png" alt="关于我们" class="my-8">
          <p>《新快报》由羊城晚报报业集团主办，1998年3月30日创刊，日常4开80版。<br>
            《新快报》秉承“内容为王”的市场导向，以关注民生、服务社会为宗旨，以“办最受市民喜爱的报纸”为目标，以新锐的办报理念与鲜明的编辑风格为特色，强调新闻与资讯的实用性。版面设计新颖，视觉冲击力强，引领市场潮流，提供全方位资讯。<br>
            《新快报》的采编队伍素质高、年轻化，拥有现代的技术手段。《新快报》以广州及珠三角地区为主销市场，核心读者是社会中最具活力和消费能力的白领和中产阶层，同时也深受普通城市读者的喜爱，具有日益广泛的影响力和良好的广告效应。
          </p>
          <p>国内第一份――<br>
            国内第一份实现全彩印刷的大型综合性日报。</p>
          <p>广告增长最快――<br>
            《新快报》2002年、2003年连续两年成为全国平面媒体广告增长最快的平面媒体！ </p>
          <p>最有影响的主流报纸――<br>
            在新闻信息质量、广告收入和发行量为核心指标的综合影响力上，已位列广州地区“日报组团前三名”，成为广州最有影响的主流报纸之一。 </p>
          <p>世界日报发行量前100强――<br>
            2004年、2005年，《新快报》蝉联“世界日报发行量前100强”！2006年，2007年连续两年荣获“十大创新都市报”奖项！<br>
          </p>
          <p>中国传媒十大领军品牌――<br>
            2010年，荣获“2001-2010中国报业（都市报）领军品牌”奖！<br>2011年至2013年，荣获中国传媒大会・金长城传媒奖“2010中国最具创新传媒”奖、“2011中国十大传播力都市报”奖、“2012中国十大影响力都市报”奖。<br>
            2013年，荣获“中国传媒十大领军品牌”奖、“中国市民喜爱的媒体品牌”奖，以及“2013传媒中国年度影响力都市报”奖。<br>2014年，荣获“数字出版转型示范单位”荣誉；<br>新快报社副总编辑李洁军荣获中国摄影金像奖；<br>“记忆2013・中国新闻摄影盛典”评选，新快报摄影记者夏世焱荣获“十佳摄影记者奖”，新快报图片编辑郭晴荣获“十佳图片编辑奖”。<br>
          </p>
        </div>
        <div>
          <img class="w-[600px] ph:hidden" src="~/assets/images/aboutRight.png" alt="关于我们" width="100%">
        </div>
      </div>
      <img src="~/assets/images/statement.png" alt="版权说明" width="100%" class="mt25_bot">

      <img src="~/assets/images/contactUs.png" alt="联系我们" width="150" class="my-10">

      <img src="~/assets/images/usMsg.png" alt="联系我们" width="100%">
    </div>
    <ScrollToTop v-if="!tabIsVisible"></ScrollToTop>
    <div class="w-full" ref="bottomRef">
      <Footer></Footer>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, onUnmounted } from 'vue';
import ListItem from '../../components/ListItem/ListItem.vue';
import Footer from '../../components/Footer.vue';
import ScrollToTop from '../../components/ScrollToTop.vue';
import CustomTabs from '../../components/CustomTabs.vue';
import CustomTabsSpecial from '../../components/CustomTabsSpecial.vue';
import util from '../../utils'
import SideBar from '../../components/SideBar.vue';
import { breakpointsTailwind, useBreakpoints, useElementVisibility } from '@vueuse/core'
import channelStore from '../../store/channel';
import { useRoute, useRouter } from 'vue-router'
const { query } = useRoute()
const router = useRouter()
const breakpoints = useBreakpoints(breakpointsTailwind)
const isPc = ref(breakpoints.greater('md'))
const bottomRef = ref()
const tabRef = ref()
const targetIsVisible = useElementVisibility(bottomRef)
const tabIsVisible = useElementVisibility(tabRef)

// await channelStore.dispatch('getChannel')
await channelStore.dispatch('getChannelAdd')



const toDetail = (data) => {
  util.jump(data, router, isPc)
}
</script>
<style scoped>
.opacityLinear {
  background: linear-gradient(to bottom, rgba(22, 157, 170, 1) 10.0%, rgb(255, 255, 255) 60%);
}
</style>