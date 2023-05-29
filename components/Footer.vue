<template>
  <div class="full flex flex-col">
    <!-- <div class="full flex justify-between px-36 py-10 items-center ph:px-1 ph:py-3 ph:flex-col">
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
      <div class="flex items-center">
        <img class="h-10" src="~/assets/images/ktjc.gif" alt="">
        <a class="active:text-yellow-400 hover:text-yellow-400"
          href="http://www.gzjd.gov.cn/newgzjd/baojing/110.jsp?catid=318" target="_blank">广州网络警察报警平台</a>
      </div>
      <div class="flex items-center">
        <img class="h-10" src="~/assets/images/home_b.gif" alt="">
        <a class="active:text-yellow-400 hover:text-yellow-400" href="http://net.china.cn/chinese/index.htm"
          target="_blank">不良信息举报中心</a>
      </div>
      <div class="flex items-center">
        <img class="h-10" src="~/assets/images/wmlogo.gif" alt="">
        <a class="active:text-yellow-400 hover:text-yellow-400" href="http://www.wenming.cn/"
          target="_blank">中国文明网传播文明</a>
      </div>
    </div> -->
    <div class="full h-12 bg-primary text-white flex justify-between items-center px-8 ph:px-1 ph:text-sm">
      <div class="flex items-center">
        <img class="h-8 mr-4" src="~/assets/images/miniLogo.png" alt="">
        <div> 版权所有 © 广东新快报社 举报及投诉电话：020 87133906</div>
      </div>
      <div class="cursor-pointer active:text-yellow-400 hover:text-yellow-400 ph:hidden" @click="toAbout">

        关于我们
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const toAbout = () => {
  router.push('/about')
}
</script>