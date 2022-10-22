<template>
  <div class="swipe">
    <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
      <template v-for="(item,index) in swipeData" :key="index">
        <van-swipe-item class="item">
          <img :src="item.url" alt="">
        </van-swipe-item>
      </template>
      <template #indicator="{active,total}">
        <!-- <div class="indicator">{{ active }} / {{ total }}</div> -->
        <div class="indicator">
          <template v-for="(value,key,index) in swipeGroup" :key="key">
            <span class="item">{{getTitle(value[0].title)}}</span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
const props = defineProps({
  swipeData: {
    type: Array,
    default: () => []
  }
})

// 转换数据
// 一
const swipeGroup = {}
// for (const item of props.swipeData) {
//   let valueArray = swipeGroup[item.enumPictureCategory]
//   if(!valueArray){
//     valueArray = []
//     swipeGroup[item.enumPictureCategory] = valueArray
//   }
//   valueArray.push[item]
// }

// 二

for(const item of props.swipeData) {
  swipeGroup[item.enumPictureCategory] = []
}
for (const item of props.swipeData) {
  const valueArray = swipeGroup[item.enumPictureCategory]
  valueArray.push(item)
}
console.log(swipeGroup);

const titleReg = /【(.*?)】/i
const getTitle = (title) => {
  // return title.replace('：','').replace('【','').replace('】','')
  const results = titleReg.exec(title)
  return results[1]
}
</script>

<style lang="less" scoped>
.swipe {
  .swipe-list {

    .indicator {
      position: absolute;
      color: #fff;
      display: flex;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.8);
      .item {
        
        margin: 0 3px;
      }
    }

    .item {

      img {
        width: 100%;
      }
    }
  }
}
</style>