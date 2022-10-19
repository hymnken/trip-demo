<template>
  <div class="city-group">
    <van-index-bar :index-list="indexList">
      <van-index-anchor index="热门" />
      <div class="list">
        <template v-for="(city,index) in groupData.hotCities">
          <div class="city" @click="cityClick(city)">{{city.cityName}}</div>
        </template>
      </div>

      <template v-for="(item,index) in groupData.cities" :key="index">
        <van-index-anchor :index="item.group" />
        <template v-for="(obj,num) in item.cities" :key="num">
          <van-cell :title="obj.cityName" @click="cityClick(city)" />
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<script setup>
import useCityStore from '@/stores/modules/city';
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';
const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({})
  }
})

const indexList = computed(() =>{
  const list =  props.groupData.cities.map(item => item.group)
  list.unshift('#')
  return list 
})

const router = useRouter()
const cityStore = useCityStore()
const cityClick = (city) =>{
  
  cityStore.currentCity = city
  router.back()
}

</script>

<style lang="less" scoped>
.list {
  display: flex;
  justify-content: space-around;
  padding: 8px;
  padding-right: 25px;
  flex-wrap: wrap;
  .city {
    width: 70px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    border-radius: 14px;
    font-size: 12px;
    color: #000;
    background-color: #fff4ec;
    margin: 6px 0;
  }
}
</style>