<script setup>
import TabBar from "@/components/tab-bar/tab-bar.vue";
import { useRoute } from "vue-router";
const route = useRoute()
</script>

<template>
  <div class="app">
    <router-view />
    <!-- <TabBar v-if="!route.meta.hideTabBar" /> -->
    <TabBar />
  </div>
</template>

<style lang="less" scoped>

</style>
