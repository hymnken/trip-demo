<template>
  <div class="favor" ref="favorRef">
    <h2>favor</h2>
  </div>
</template>

<script setup>
import useScroll from '@/hooks/useScroll';
import { ref } from 'vue';


const favorRef = ref()
useScroll(favorRef)
</script>

<style lang="less" scoped>

</style>