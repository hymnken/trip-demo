<template>
  <div class="detail hide-tabbar" ref="detailRef">
    <TabControl :titles="titles" v-if="showTabControl" 
    class="tabs" 
    @tabItemClick="tabClick" 
    ref="tabControlRef"
    />
    <!-- 导航栏 -->
    <van-nav-bar title="房屋详情" left-text="返回首页" left-arrow @click-left="onClickLeft" />

    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <DetailSwipe :swipe-data="mainPart.topModule?.housePicture.housePics" />
      <DetailInfos name="描述" :ref="getSectionRef" />
      <DetailFacility name="设施" :ref="getSectionRef" />
      <DetailLandLord name="房东" :ref="getSectionRef" />
      <DetailComment name="评论" :ref="getSectionRef" />
      <DetailNotice name="须知" :ref="getSectionRef" />
      <DetailMap name="地图" :ref="getSectionRef" />
      <DetailIntroduce />
    </div>

    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
import TabControl from "@/components/tab-control/tab-control.vue";
import { useRoute, useRouter } from 'vue-router';
import useDetailStore from "@/stores/modules/detail";
import { storeToRefs } from 'pinia';
import DetailSwipe from "./cpns/detail-swipe.vue";
import DetailInfos from "./cpns/detail-infos.vue";
import DetailFacility from './cpns/detail-facility.vue';
import DetailLandLord from "./cpns/detail.landlord.vue";
import DetailComment from "./cpns/detail-comment.vue";
import DetailNotice from "./cpns/detail-notice.vue";
import DetailMap from "./cpns/detail-map.vue";
import DetailIntroduce from "./cpns/detail-introduce.vue";
import { computed, ref, watch } from "vue";
import useScroll from "@/hooks/useScroll";

const router = useRouter()
const route = useRoute()
// 返回上一页
const onClickLeft = () => {
  router.back()
}
// 发送网络请求 
const detailStore = useDetailStore()
detailStore.houseId = route.params.id
detailStore.fetchDetailData()
const { mainPart } = storeToRefs(detailStore)

// tab-control
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
  return scrollTop.value > 300
})


// const landlordRef = ref()
// const sectionEls = []
// const getSectionRef = (value) => {
//   sectionEls.push(value.$el)
// }

// 二
const sectionEls = ref({})
const titles = computed(() => {
  return Object.keys(sectionEls.value)
})

const getSectionRef = (value) => {
  // sectionEls.push(value.$el)
  if (!value) return
  const name = value.$el.getAttribute("name")
  sectionEls.value[name] = value.$el
}
// const getSectionRef = (value) => {
//   sectionEls.push(value.$el)
// }

let isClick = false
let currentDistance = -1
const tabClick = (index) => {
  // console.log('----------');
  const key = Object.keys(sectionEls.value)[index]
  const el = sectionEls.value[key]
  let distance = el.offsetTop
  if (index !== 0) {
    distance = distance - 44
  }

  isClick = true
  currentDistance = distance

  detailRef.value.scrollTo({
    // $el 拿到根元素
    top: instance,
    behavior: 'smooth'
  })
}

// 页面滚动时 匹配相应的tab
const tabControlRef = ref()
watch(scrollTop, (newValue) => {
  // 获取所有offsetTop 放到数组中
  if (newValue === currentDistance) {
    isClick = false
  }
  if (isClick) return
  const els = Object.values(sectionEls.value)
  const values = els.map(el => el.offsetTop)
  let index = values.length - 1
  for (let i = 0; i < values.length; i++){
    if(values[i] >= newValue + 44){
      index = i - 1
      break
    }
  }
  tabControlRef.value?.setCurrentIndex(index)
})
</script>

<style lang="less" scoped>
.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
  background-color: #fff;
  border-bottom: 1px solid #7688a7;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>