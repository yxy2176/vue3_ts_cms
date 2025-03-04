<template>
  <div class="dashboard">
    <!-- 顶部数字 -->
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6" :xs="24" :sm="12" :md="8" :lg="6"> <count-card v-bind="item" /> </el-col>
      </template>
    </el-row>
    <!-- 中部部分echarts图 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <chart-card header="饼状图——各个商品的销量">
          <pie-echart :pie-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
      <el-col :span="10">
        <chart-card header="中国各地区销量">
          <map-echart :map-data="showGoodsAddressSale"></map-echart>
        </chart-card>
      </el-col>
      <el-col :span="7">111</el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import useAnalysisStore from '@/store/main/analysis/analysis'
import { storeToRefs } from 'pinia'
import countCard from './c-cpns/count-card/count-card.vue'
import chartCard from './c-cpns/chart-card/chart-card.vue'
import pieEchart from '@/components/page-echarts/src/pie-echart.vue'
import mapEchart from '@/components/page-echarts/src/map-echart.vue'
import { computed } from 'vue'

const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()

const { amountList, goodsCategoryCount, goodsCategorySale, goodsCategoryFavor, goodsAddressSale } =
  storeToRefs(analysisStore)

const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item) => ({
    name: item.name,
    value: item.goodsCount,
  }))
})

const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => ({
    name: item.address,
    value: item.count,
  }))
})
</script>
<style lang="less" scoped>
.dashboard {
  color: red;
}

.el-row {
  margin-bottom: 10px;
}
</style>
