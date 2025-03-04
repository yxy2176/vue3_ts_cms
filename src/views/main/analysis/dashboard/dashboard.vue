<template>
  <div class="dashboard">
    <!-- 顶部数字 -->
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6" :xs="24" :sm="12" :md="8" :lg="6"> <count-card v-bind="item" /> </el-col>
      </template>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import useAnalysisStore from '@/store/main/analysis/analysis'
import { storeToRefs } from 'pinia'
import countCard from './c-cpns/count-card/count-card.vue'

const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()

const { amountList, goodsCategoryCount, goodsCategorySale, goodsCategoryFavor, goodsAddressSale } =
  storeToRefs(analysisStore)
</script>
<style lang="less" scoped>
.dashboard {
  color: red;
}

.el-row {
  margin-bottom: 10px;
}
</style>
