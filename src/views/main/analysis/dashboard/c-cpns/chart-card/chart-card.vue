<template>
  <div class="chart-card">
    <el-card class="box-card" :header="header">
      <slot>默认的内容</slot>
    </el-card>
  </div>
</template>
<script setup lang="ts">
interface IProps {
  header?: string
}
withDefaults(defineProps<IProps>(), {
  header: '默认标题',
})
</script>
<style scoped>
.chart-card {
  color: red;
}
</style>
