<template>
  <div class="home" ref="homeRef">
    <HomeNavBar />
    <!-- pic -->
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <!-- location -->
    <HomeSearchBox />
    <HomeCategories />

    <div class="search-bar" v-if="isShowSearchBar">
      <SearchBar :start-date="'09.20'" :end-date="'09.21'" />
    </div>

    <HomeContent />
  </div>
</template>


<script>
export default {
  name:'home'
}
</script>

<script setup>
import HomeNavBar from "./cpns/home-nav-bar.vue"
import HomeSearchBox from "./cpns/home-search-box.vue"
import HomeCategories from "./cpns/home-categories.vue"
import HomeContent from "./cpns/home-content.vue"
import useHomeStore from '@/stores/modules/home';
import useScroll from "@/hooks/useScroll";
import { computed, onActivated, ref, watch } from "vue";
import SearchBar from "@/components/search-bar.vue/search-bar.vue";
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
homeStore.fetchCategoriesData()
// let currentPage = 1
homeStore.fetchHouselistData()

// const moreBtn = () =>{
//   // currentPage++
//   homeStore.fetchHouselistData()
// }
// 加载更多
// useScroll(() => {
//   homeStore.fetchHouselistData()
// })

// 二：
const homeRef = ref()
const { isReachBottom, scrollTop } = useScroll(homeRef)
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouselistData().then(() => {
      isReachBottom.value = false
    })
  }
})

// 控制搜索框显示
// const isShowSearchBar = ref(false)
// watch(scrollTop,(newTop) => {
//   console.log(newTop);
//   isShowSearchBar.value = newTop > 100
// })
// 另外一种简洁的写法 而且有缓存 不用频繁调
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 360
})
//- onActivated(): 被包含在`<keep-alive>`中的组件，
  // 会多出两个生命周期钩子函数。被激活时执行。
onActivated(() => {
  homeRef.value?.scrollTo({
    top:scrollTop.value
  })
})
</script>

<style lang="less" scoped>
.home {
  padding-bottom: 60px;
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;

  .banner {
    img {
      width: 100%;
    }

  }

  .search-bar {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
  }
}
</style>