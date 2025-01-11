<template>
  <div class="pane-account">
    <!-- status-icon -->
    <el-form
      :model="account"
      :rules="accountRules"
      label-width="60px"
      status-icon
      ref="formRef"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import type { IAccount } from '@/types'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'
import useLoginStore from '@/store/login/login'

// 1、定义account的数据（包括其ts里对应的类型IAccount）
const account = reactive<IAccount>({
  name: '',
  password: '',
})

// 2.定义校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成~',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur',
    },
  ],
}

// 3、执行帐号的登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction() {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1、获取输入的用户名和密码
      const name = account.name
      const password = account.password

      // 2、向服务器发送网络请求（携带上帐号和密码）
      loginStore.loginAccountAction({ name, password })
    }
  })
}

defineExpose({
  loginAction,
})
</script>
<style lang="less" scoped></style>
