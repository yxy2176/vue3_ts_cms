<template>
  <div class="department">
    <page-search :search-config="searchConfig" />
  </div>
</template>
<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search-config'
</script>
<style lang="less" scoped>
.department {
  border-radius: 8px;
  overflow: hidden;
}
</style>
