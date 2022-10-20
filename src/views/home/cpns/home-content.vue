<template>
  <div class="content">
    <h2 class="title">热门精选内容</h2>
    <div class="list">
      <template v-for="(item,index) in houselist" :key="item.data.houseId">
        <h3>{{item.data.houseName}}</h3>
      </template>
    </div>
  </div>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';

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
}
</style>