<template>
  <div class="tab-bar">
  <van-tabbar v-model="currentIndex" active-color="#ff9854" route >
    <template v-for="(item,index) in tabbarData" :key="index">
      <van-tabbar-item :to="item.path">
      <span>
        {{item.text}}
      </span>
      <template #icon>
        <img v-if="currentIndex !== index" 
        :src="getAssetURL(item.image)"
        />
        <img v-else :src="getAssetURL(item.imageActive)" />
      </template>
    </van-tabbar-item>
    </template>
  </van-tabbar>


    <!-- <template v-for="(item,index) in tabbarData" :key="index">
    <div class="tab-bar-item" 
    :class="{active: currentIndex === index}"
    @click="itemClick(index,item)"
    >
      <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="" />
      <img v-else :src="getAssetURL(item.imageActive)" alt="" />
      <span class="text">{{item.text}}</span>
    </div>
    </template> -->
  </div>
</template>

<script setup>
import tabbarData from "@/assets/data/tabbar";
import { getAssetURL } from "@/utils/load_assets";
import { ref } from "@vue/reactivity";
import { watch } from "vue";
import { useRoute } from "vue-router";
const currentIndex = ref(0)
const route = useRoute()
watch(route,(newRoute) => {
  const index = tabbarData.findIndex(item => item.path === newRoute.path)
  if (index=== -1 ) return 
  currentIndex.value = index
})

</script>

<style lang="less" scoped>
.tab-bar{

  // 修改第三方组件库样式，1.修改变量 只针对。tab-bar子元素生效
  --van-tabbar-item-font-size: 12px !important;
  // 第二种 ：deep方法可以找到子组件的类，让子组件的类也可以生效
  // :deep(.van-tabbar-item__icon){
  //   font-size: 50px;
  // }

  img{
    height: 26px;
  }
}
</style>