<template>
  <div class="city hide-tabbar">
    <div class="top">
      <van-search shape="round" v-model="searchValue" placeholder="城市/区域/位置" show-action @cancel="cancelClick" />
      <!-- 内容切换 -->
      <van-tabs v-model:active="tabValue" color="#ff9854">
        <template v-for="(value,key,index) in allCities" :key="key">
          <!-- ?.可以判断有没有值 -->
          <!-- <van-tab :title="value?.title"></van-tab> -->
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <!-- 这种方法可以不用computed -->
      <!-- <template v-for="item in allCities[tabValue]?.cities"> -->
      <!-- <CityGroup :groupData="currentGroup" /> -->
      <template v-for="(value,key,index) in allCities">
        <!-- <h2 v-show="tabValue === key">{{value.title}}</h2> -->
        <CityGroup v-show="tabValue === key" :groupData="value" />
      </template>
    </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city';
import { storeToRefs } from 'pinia';
import CityGroup from "./cpns/city-group.vue";
const router = useRouter()
const searchValue = ref('')
const cancelClick = () => {
  router.back()
}
const tabValue = ref()
// 默认空对象 以免出现undefind 或者用?.方法
// const allCity = ref()
// getAllCity().then(res => {
//   console.log(res);
//   allCity.value = res.data
// })

const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)
//获取选中标签后的数据
const currentGroup = computed(() => allCities.value[tabValue.value])
</script>

<style lang="less" scoped>
// .city{ 
//   .top{
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//   }
//   .content{
//     margin-top: 98px;
//   }
// }

.city {
  .top {
    position: relative;
    z-index: 9;
  }

  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>