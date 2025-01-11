<template>
  <div class="login-panel">
    <!-- 1、顶部的标题 -->
    <h1 class="title">后台管理系统</h1>

    <!-- 2、中间的tabs的切换 -->
    <div class="tabs">
      <el-tabs v-model="activeName">
        <!-- 2.1 账号登录的panel -->
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <pane-account ref="accountRef" />
        </el-tab-pane>

        <!-- 2.2 手机登录的panel -->
        <el-tab-pane class="phone">
          <template #label>
            <div class="label">
              <el-icon><Cellphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <pane-phone />
        </el-tab-pane>
      </el-tabs>

      <div class="controls">
        <el-checkbox label="记住密码" size="large" />
        <el-link type="primary">忘记密码</el-link>
      </div>
      <el-button
        class="login-btn"
        type="primary"
        round
        @click="handleLoginBtnClick"
        >立即登录</el-button
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import paneAccount from './pane-account.vue'
import panePhone from './pane-phone.vue'
import { ref } from 'vue'

const activeName = ref('account')
const isRemPwd = ref(false)
const accountRef = ref<InstanceType<typeof paneAccount>>()

function handleLoginBtnClick() {
  if ((activeName.value = 'account')) {
    accountRef.value?.loginAction()
  } else {
    console.log('用户在进行手机登录')
  }
}
</script>
<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;
}

.title {
  text-align: center;
  margin-bottom: 15px;
}

.label {
  display: flex;
  align-items: center;
  justify-content: center;

  .text {
    margin-left: 5px;
  }
}

.controls {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
}

.login-btn {
  width: 100%;
  margin-top: 10px;
}
</style>
