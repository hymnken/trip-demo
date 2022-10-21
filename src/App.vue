<script setup>
import TabBar from "@/components/tab-bar/tab-bar.vue";
import { useRoute } from "vue-router";
import Loading from "@/components/loading/loading.vue";
const route = useRoute()
</script>

<template>
  <div class="app">
    <router-view />
    <TabBar v-if="!route.meta.hideTabBar" />
    <Loading />
  </div>
</template>

<style lang="less" scoped>

</style>
