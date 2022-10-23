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
import { storeToRefs } from "pinia";
const detailStore = useDetailStore()
const { position } = storeToRefs(detailStore)
// console.log(position.longitude);
const mapRef = ref()


onMounted(() => {
  const map = new BMapGL.Map(mapRef.value);          // 创建地图实例 
  const point = new BMapGL.Point(position.longitude, position.latitude);  // 创建点坐标 
  map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
  var marker = new BMapGL.Marker(point);        // 创建标注   
  map.addOverlay(marker);                     // 将标注添加到地图中
})
</script>
<style lang="less" scoped>
.baidumap {
  height: 300px;
}
</style>