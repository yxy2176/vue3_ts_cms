<template>
  <div class="base-echart">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import ChinaJSON from '../data/china.json'
import { onMounted, ref, watch, watchEffect } from 'vue'

echarts.registerMap('china', ChinaJSON as any)

interface IProps {
  option: EChartsOption
}

const props = defineProps<IProps>()

const echartRef = ref<HTMLElement>()

onMounted(() => {
  const echartInstance = echarts.init(echartRef.value!, 'light', {
    renderer: 'canvas',
  })
  // 第一次进行setOption
//   watchEffect监听option变化, 重新执行
  watchEffect(()=>echartInstance.setOption(props.option))

  window.addEventListener('resize',()=>{
    echartInstance.resize()
  })
})



</script>
<style scoped>
.base-echart {
  color: red;
}

.echart {
  height: 300px;
}
</style>
