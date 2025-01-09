<template>
  <div class="main">
    <h2>main</h2>
    <div>
      {{ counterStore.counter }}--{{ counterStore.doubleCounter }}
    </div>
    <button @click="changeCounter">修改counter的值</button>
  </div>
</template>
<script setup lang="ts">
import useCounterStore from '@/store/counter'

const counterStore = useCounterStore()

function changeCounter() {
  counterStore.changeCounterAction(999)
}
</script>

<style lang="less" scoped>
.main {
  color: red;
}
</style>
