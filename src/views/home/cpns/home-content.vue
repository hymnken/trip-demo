<template>
  <div class="content">
    <h2 class="title">热门精选内容</h2>
    <div class="list">
      <template v-for="(item,index) in houselist" :key="item.data.houseId">
        <!-- <h3>{{item.data.houseName}}</h3> -->
        <HouseItemT9 v-if="item.discoveryContentType === 9" :item-data="item.data" />
        <HouseItemT3 v-else-if="item.discoveryContentType === 3" :item-data="item.data" />
      </template>
    </div>
  </div>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';
import HouseItemT3 from '@/components/house-item-t3/house-item-t3.vue'
import HouseItemT9 from '@/components/house-item-t9/house-item-t9.vue'
const homeStore = useHomeStore()
const { houselist } = storeToRefs(homeStore)

</script>

<style lang="less" scoped>
.content {
  padding: 8px 8px;

  .title {
    padding: 8px;
    font-size: 20px;
  }
  .list{
    display: flex;
    flex-wrap: wrap;
  }
}
</style>