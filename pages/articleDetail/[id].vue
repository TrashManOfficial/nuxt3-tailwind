<template>
  <Head>
    <Title>{{ ArticleDetail.title + '__新快网' }}</Title>
    <!-- <Meta name="referrer" content="no-referrer"></Meta> -->
    <!-- <Meta name="description" :content=" ArticleDetail.title + ArticleDetail?.metaInfo?.shareDesc" /> -->
    <Meta name="keywords" :content="ArticleDetail?.metaInfo?.keyWords + `新闻,要闻,广东,广州,新快报,股评,房产,大事件,报纸,评论,深读,专题,星座 新闻,要闻,广东,广州,新快报,股评,房产,大事件,报纸,评论,深读,专题,星座`" />
  </Head>
  <div
    :class="`w-full flex bg-white h-20 items-center shadow-md z-50 justify-center ${tabIsVisible ? '' : 'fixed top-0'}`">
    <div class="w-[1500px] flex items-center justify-between">
      <img class="m-2 h-12" src="~/assets/images/logo.png" alt="新快网logo" @click="toHome">
      <CustomTabs class="justify-around" :isPc="isPc" :defautId="ArticleDetail.chnlId"></CustomTabs>
    </div>
    <div class="w-1/4 mx-2">
      <SearchBar @onSearch="onSearch">
      </SearchBar>
    </div>
  </div>
  <div class="flex justify-center">
    <div class="w-[1100px] flex ph:w-full justify-center mt-3 ">
      <ClientOnly>
        <ShareBar></ShareBar>
      </ClientOnly>
      <div class="max-w-[750px] pr-6 flex flex-col ph:w-full">
        <div>
          <div class="text-3xl font-black my-6" ref="tabRef">{{ ArticleDetail.title }}</div>
          <InfoBar class="mb-3" :data="{ source: ArticleDetail?.metaInfo?.source, time: ArticleDetail.docPubTime,isSSR:true }">
          </InfoBar>
        </div>
        <!-- 一般文章稿件 -->
        <div ref="contentRef" v-if="type === 1" v-html="str" class="text-justify contentSpe docContentBox">
        </div>
        <!-- 图集稿件 -->
        <CarouselDetail v-if="type === 2" :list="imgList" class="w-full">
        </CarouselDetail>
        <!-- 视频稿件 -->
        <div v-if="type === 7">
          <video :poster="videoDetail.coverPic" controls class="m-auto">
            <source :src="videoDetail.url" type="video/mp4">
          </video>
          <div v-html="str">
          </div>
        </div>
        <div>
          <div class="text-gray-400">
            <div v-if="ArticleDetail?.metaInfo?.responsileEditor || ArticleDetail?.metaInfo?.editor">
              责编：{{ ArticleDetail?.metaInfo?.responsileEditor || ArticleDetail?.metaInfo?.editor }}</div>
            <div v-if="ArticleDetail?.metaInfo?.proofread">校对：{{ ArticleDetail?.metaInfo?.proofread }}</div>
          </div>
          <hr />
          <div class="my-4 text-gray-400">
            特别声明：以上内容版权均属广东新快报社所有（注明其他来源的内容除外），任何媒体、网站或个人未经本报协议授权不得转载、链接、转贴或以其他方式复制发布/发表。协议授权转载联系：（020）87133906。
          </div>
          <hr />
        </div>
        <div v-if="ArticleDetail?.metaInfo?.relatedDoc?.length">
          <StrongTitle :name="'推荐阅读'" :isCurrent="true" class="mb-4"></StrongTitle>
          <div v-for="item in ArticleDetail?.metaInfo?.relatedDoc" @click="toDetail(item)">
            <ListItem :plainData="item"></ListItem>
          </div>
        </div>
        <div v-if="commentList.length">
          <StrongTitle :name="`评论回复（${commentList.length}）`" :isCurrent="true" class="my-4"></StrongTitle>
          <div v-for="item in commentList">
            <div class="flex items-start w-full">
              <div><img class="h-12 w-12 rounded-full" :src="item.headUrl" alt=""></div>
              <div class="w-full ml-5">
                <div class="flex justify-between text-lg items-center">
                  <div class="text-xl font-bold">{{ item.publisherFullname }}</div>
                  <div>{{ `点赞数：` + item.favoriteCount }}</div>
                </div>
                <div class="mt-3 mb-4">{{ item.content }}</div>
                <div>
                  <div>{{ utils.timeFormat(item.crDate) }}</div>
                  <div></div>
                </div>
              </div>
            </div>
            <!-- <ListItem :plainData="item"></ListItem> -->
          </div>
        </div>
      </div>
      <div class=" w-3/12 ph:hidden pl-3">
        <SideBar></SideBar>
      </div>
    </div>
  </div>
  <ScrollToTop v-if="!tabIsVisible"></ScrollToTop>
  <div class="w-full">
    <Footer></Footer>
  </div>
</template>
<script setup>
import CustomTabs from '../../components/CustomTabs.vue';
import StrongTitle from '../../components/StrongTitle.vue';
import ListItem from '../../components/ListItem/ListItem.vue';
import SearchBar from '../../components/SearchBar.vue';
import SideBar from '../../components/SideBar.vue';
import InfoBar from '../../components/ListItem/InfoBar.vue';
import Footer from '../../components/Footer.vue';
import ShareBar from '../../components/ShareBar.vue';
import ScrollToTop from '../../components/ScrollToTop.vue';
import CarouselDetail from '../../components/ListItem/CarouselDetail.vue';
import { ref, onUnmounted, onBeforeMount, watch, onUpdated } from 'vue'
import { breakpointsTailwind, useBreakpoints, useElementVisibility } from '@vueuse/core'
// import { Head } from '@vueuse/head';
import channelStore from '../../store/channel';
import { useRoute, useRouter } from 'vue-router'
import utils from '../../utils'
import { parse } from 'node-html-parser';

const tabRef = ref()
const tabIsVisible = useElementVisibility(tabRef)
const { query,params } = useRoute()
const breakpoints = useBreakpoints(breakpointsTailwind)
const isPc = ref(breakpoints.greater('md'))
const ArticleDetail = ref({})
const str = ref('')

// useHead({
//   title: ArticleDetail.value.title,
//   meta: [
//     { name: 'referrer', content: 'no-referrer' },
//     { name: 'description', content: ArticleDetail?.metaInfo?.shareDesc },
//     { name: 'keywords', content: ArticleDetail?.metaInfo?.keyWords },
//   ],
// })

const imgList = ref([])
const videoDetail = ref({})
const type = ref(undefined)
const router = useRouter()

const contentRef = ref()

const commentList = ref([])



const onSearch = (text) => {
  const herf = router.resolve({
    path: '/search',
    query: {
      keyword: text
    }
  })
  window.open(herf.href, '_blank')
}

onBeforeMount(() => {
  redirectToMobile()
})

const redirectToMobile = () => {
  if (!isPc.value) {
    window.location.href = `https://www.xkb.com.cn/fundhtml/#/details?id=${params.id}`;
  }
}

const handleVideoInHtml = (html) => {
  // 假设HTML字符串存储在变量html中
  // const parser = new DOMParser();
  const doc = parse(html);
  const imgTags = doc.querySelectorAll('img[data-videourl]');
  if (!imgTags.length) {
    return html
  }

  imgTags.forEach(img => {
    const video = parse('<video></video>');
    // console.log(video.toString());
    const videoSrc = img.getAttribute('data-videourl');

    // 将video标签属性设置为与img标签相同
    video.firstChild.setAttribute('src', videoSrc);
    video.firstChild.setAttribute('alt', img.getAttribute('alt'));
    video.firstChild.setAttribute('class', img.getAttribute('class'));
    video.firstChild.setAttribute('style', img.getAttribute('style'));
    video.firstChild.setAttribute('class', 'm-auto');
    video.firstChild.setAttribute('controls', true);
    video.firstChild.setAttribute('referrerpolicy', 'no-referrer');
    // console.log(video.toString());

    // 将img标签替换为video标签
    img.replaceWith(video);
  });

  // 将修改后的DOM对象转换回HTML字符串
  const newHtml = doc.toString();
  // console.log(imgTags,newHtml);

  return newHtml;
}

const toDetail = (data) => {
  // console.log(data);
  const temp = {
    docId: data.docId,
    id: data.docId,
    metaInfo: {
      listStyle: data.listStyle,
      shareUrl:data.shareUrl,
      docType:data.docType,
    }
  }
  window.open(utils.renderLink(temp, router, isPc))
}
// await channelStore.dispatch('getChannel')
await channelStore.dispatch('getChannelAdd')


const getCommentList = () => {
  channelStore.dispatch('getCommentList', params.id).then(() => {
    commentList.value = channelStore.state.commentList
  })
}


const handleArticle = async (data) => {
  ArticleDetail.value = data
  type.value = data.docType + 0
  // const url = data.contentUrl
  // const htmlData = await $fetch(`${url}`)
  // ArticleDetail.value.content = htmlData.htmlContent
  //新闻
  if (type.value === 1) {
    ArticleDetail.value = channelStore.state.articleDetail
    const url = data.contentUrl
    const htmlData = await $fetch(`${url}`)
    // str.value = htmlData.htmlContent
    str.value = handleVideoInHtml(htmlData.htmlContent)


    // let temp = handleVideoInHtml(htmlData.htmlContent)
    // if (temp.indexOf("<p><video") != -1) {
    //   temp = temp.replace(
    //     /<p><video/g,
    //     "<p style='text-indent: 0em;'><video "
    //   );
    // }
    // ArticleDetail.value.content = temp
    // if (url) {
    //   const { data: html } = await useApiFetch('https://app.xkb.com.cn/fundapis/static/res/4/f/4/doc222055.json')
    //   let temp = handleVideoInHtml(html._rawValue.htmlContent)
    //   if (temp.indexOf("<p><video") != -1) {
    //     temp = temp.replace(
    //       /<p><video/g,
    //       "<p style='text-indent: 0em;'><video "
    //     );
    //   }
    //   ArticleDetail.value.content = temp
    // }
    return
  }
  //图集
  if (type.value === 2) {
    imgList.value = data.metaInfo.picDoc
    // return
  }

  if (type.value === 7) {
    str.value = data.metaInfo.videoDoc.htmlContent
    videoDetail.value = data.metaInfo.videoDoc
    // return
  }



}



const readCount = () => {
  const id = params.id
  channelStore.dispatch('postReadCount',id)
}

const getArticleDetail = async () => {
  await channelStore.dispatch('getArticleDetails', params.id)
  await handleArticle(channelStore.state.articleDetail)
  !process.dev && readCount()
  // channelStore.dispatch('getCommentList', query.id).then(() => {
  //   commentList.value = channelStore.state.commentList
  // })
}
await getArticleDetail()
// await channelStore.dispatch('setCurrentDocId',ArticleDetail.value.chnlId)

const toHome = () => {
  const href = router.resolve({
    path: '/list/350'
  })
  // window.open(href.href, '_blank')
  window.location.href = href.href
}

</script>
<style lang="less">
.contentSpe iframe {
  min-height: 410px;
}

@moduleMarginTop: 20PX;
// 段落距离
@moduleMarginBottom: 20PX;
// 文章内容字数大小
@docFontSize: 19PX;

// 文章内图说字体大小
@docNoteFontSize: 14PX;

// 文章内容行高
@docLineHeight: 2em;

.docContentBox {
  line-height: @docLineHeight !important;
  font-size: @docFontSize;
  // color: @text_color;
  //font-size: 18PX;
  //text-align: left;
  min-height: 20vh;
  box-sizing: border-box;
  margin: 0;
  text-align: justify;
  word-break: break-word;
  font-family: inherit;

  img {
    max-width: 100% !important;
    box-sizing: border-box;
    border: none;
    margin: 0px auto !important;
    padding: 0px;
    clear: both;
    height: auto !important;
    pointer-events: none;
    border-radius: 4PX;
  }

  // .app_image {
  //   display: none;
  // }

  /* 不处理 video.js 视频标签 */
  /deep/ video:not(.vjs-tech),
  iframe {
    max-width: 100% !important;
    height: auto !important;
    border-radius: 4PX;
  }

  .imagenote {
    // 采编拖动缩放图片，会给图说带上 max-width
    max-width: 100%;
    text-align: center !important;
    // color: var(--adm-color-visited);
  }

  p {
    font-size: inherit;
    line-height: inherit;

    border: none;
    margin-top: 0;
    letter-spacing: initial;
    font-weight: 400;
    text-align: inherit;
    word-break: break-word;
    background-color: transparent !important;
    text-indent: 0 !important;

    img {
      display: block;
    }
  }

  [style*="font-family: trsFontFace"] {
    font-family: inherit !important;
  }

  >p {
    // color: @text_color;
    overflow-y: hidden !important;

    >strong {
      font-weight: 700;
    }
  }

  >p+p {
    margin-top: @moduleMarginTop;
  }

  table {
    margin: 10px 0;
    border-collapse: collapse;
    border-spacing: 0;
    display: table;
    text-align: center;
    vertical-align: text-top;
    line-height: 1.5;

    td,
    th {
      padding: 5px 10px;
      border: 1px solid black;
    }

    th {
      border-top: 1px solid black;
      background-color: black;
    }

    .ue-table-interlace-color-single {
      background-color: black;
    }

    .ue-table-interlace-color-double {
      background-color: black;
    }

    caption {
      border: 1px dashed black;
      border-bottom: 0;
      padding: 3px;
      text-align: center;
    }

    tr.firstRow {
      th {
        border-top-width: 2px;
      }
    }
  }
}
</style>