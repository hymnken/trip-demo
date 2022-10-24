<template>
  <div class="detail-map">
    <DetailSection title="位置与周边" more-text="查看更多周边信息">
      <div class="baidumap" ref="mapRef">
      </div>
    </DetailSection>
  </div>
</template>

<script setup>
import DetailSection from "@/components/detail-section/detail-section.vue";
import { onMounted, ref } from "vue";
import useDetailStore from "@/stores/modules/detail";

const mapRef = ref();
const { longitude, latitude } = useDetailStore()
// const { longitude, latitude } = storeToRefs(detailStore)
// console.log(longitude);

// console.log(longitude);
// const longitude = ref(position.longitude)
// const latitude = ref(position.latitude)
// console.log(longitude);

onMounted(() => {
  const map = new BMapGL.Map(mapRef.value);          // 创建地图实例 
  const point = new BMapGL.Point(longitude, latitude);  // 创建点坐标 
  map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
  var marker = new BMapGL.Marker(point);        // 创建标注   
  map.addOverlay(marker);                     // 将标注添加到地图中
})
</script>
<style lang="less" scoped>
.baidumap {
  height: 240px;
}
</style>