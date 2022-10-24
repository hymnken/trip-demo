<template>
  <div class="detail hide-tabbar" ref="detailRef">
    <TabControl :titles="['adsa','fdf','yuy','hgg']"
    v-if="showTabControl"
    class="tabs"
    />
    <!-- 导航栏 -->
    <van-nav-bar title="房屋详情" left-text="返回首页" left-arrow @click-left="onClickLeft" />
    
    <div class="main" v-if="mainPart">
      <DetailSwipe :swipe-data="mainPart.topModule?.housePicture.housePics" />
      <DetailInfos />
      <DetailFacility />
      <DetailLandLord />
      <DetailComment />
      <DetailNotice />
      <DetailMap />
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
import { computed,ref } from "vue";
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
const { scrollTop } =useScroll(detailRef)
const showTabControl = computed(() => {
  return scrollTop.value > 300 
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