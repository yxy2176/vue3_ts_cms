<template>
  <div class="menu">
    <page-content :content-config="contentConfig" ref="contentRef"> </page-content>
  </div>
</template>
<script setup lang="ts">
import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content-config'
</script>
<style lang="less" scoped>
.menu {
  border-radius: 8px;
  overflow: hidden;
}
</style>
