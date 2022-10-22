<template>
  <div class="detail hide-tabbar">
    <!-- 导航栏 -->
    <van-nav-bar title="房屋详情" left-text="返回首页" left-arrow @click-left="onClickLeft" />
    <!--  轮播图组件 -->
    <div class="main" v-if="mainPart">
      <DetailSwipe :swipe-data="mainPart.topModule.housePicture.housePics" />
    </div>
    
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import useDetailStore from "@/stores/modules/detail";
import { storeToRefs } from 'pinia';
import DetailSwipe from "./cpns/detail-swipe.vue";
const router = useRouter()
const route = useRoute()

const onClickLeft = () => {
  router.back()
}

const detailStore = useDetailStore()
detailStore.houseId = route.params.id
detailStore.fetchDetailData()
const { mainPart } = storeToRefs(detailStore)

</script>

<style lang="less" scoped>

</style>