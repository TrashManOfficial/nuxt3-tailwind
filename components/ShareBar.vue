<template>
  <div class="sticky top-1/2 h-12 mr-4">
    <div>
      <HoverModal>
        <template v-slot:main>
          <img class="h-11 mb-4 cursor-pointer" src="~/assets/images/wx_share.png" alt="微信分享">
        </template>
        <template v-slot:show>
          <div>
            <div>
              微信扫码分享
            </div>
            <qrcode-vue :value="qrCode" size:300  ></qrcode-vue>
            <!-- <div id="qrcode" ref="qrcode"></div> -->
          </div>
        </template>
      </HoverModal>
    </div>
    <div>
      <HoverModal>
        <template v-slot:main>
          <img class="h-11 mb-4 cursor-pointer" src="~/assets/images/qq_share.png" alt="qq分享">
        </template>
        <template v-slot:show>
          <div>
            <div>
              QQ扫码分享
            </div>
            <qrcode-vue :value="qrCode" size:300  ></qrcode-vue>
            <!-- <div id="qrcode" ref="qrcode"></div> -->
          </div>
        </template>
      </HoverModal></div>
  </div>
</template>
<script setup>
import HoverModal from './HoverModal.vue';
import { ref } from 'vue'
import QrcodeVue from 'qrcode.vue'

const qrCode = ref(window.location.href)
// import QRCode from 'qrcodejs2';
// const qrcode = ref()
// let text = '二维码内容';
// let content = new QRCode(qrcode, {
//   text: text, //二维码内容字符串
//   width: 128, //图像宽度
//   height: 128, //图像高度
//   colorDark: '#000000', //二维码前景色
//   colorLight: '#ffffff', //二维码背景色
//   correctLevel: QRCode.CorrectLevel.H, //容错级别
// })

</script>