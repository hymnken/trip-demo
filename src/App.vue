<script setup>
import TabBar from "@/components/tab-bar/tab-bar.vue";
name: 'App'

</script>

<template>
  <div class="app">
    <router-view />
    <TabBar />
  </div>
</template>

<style lang="less" scoped>
</style>
