<template>
  <div class="home">
    <HomeNavBar />
    <!-- pic -->
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <!-- location -->
    <HomeSearchBox />

    
  </div>
</template>

<script setup>
import HomeNavBar from "./cpns/home-nav-bar.vue"
import HomeSearchBox from "./cpns/home-search-box.vue"
import useHomeStore from '@/stores/modules/home';
// const hotSuggests = ref([])
// knRequest.get({
//   url:'/home/hotSuggests'
// }).then(res => {
//   hotSuggests.value = res.data
//   console.log(res );
// })
// const categories = ref([])
// knRequest.get({
//   url:'/home/categories'
// }).then(res => {
//   categories.value = res.data
//   console.log(res );
// })
const homeStore = useHomeStore()
homeStore.fetchHotSuggestDate()



</script>

<style lang="less" scoped>
.banner {
  img {
    width: 100%;
  }
}

</style>