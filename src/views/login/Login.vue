<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>
<script setup lang="ts">
import loginPanel from './childrenComponents/login-panel.vue'
</script>
<style lang="less" scoped>
.login {
  // 控制login页面的总体布局
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background: url(../../assets/img/login-bg.svg);
}
</style>
