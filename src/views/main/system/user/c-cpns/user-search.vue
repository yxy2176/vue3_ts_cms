<template>
  <div class="search">
    <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入查询的用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realName">
            <el-input v-model="searchForm.realName" placeholder="请输入查询的真实姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="searchForm.cellphone" placeholder="请输入查询的手机号码" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="status">
            <el-select
              v-model="searchForm.enable"
              placeholder="请选择想要查询的状态"
              style="width: 100%"
            >
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" v-model="searchForm.createAt" prop="createAt">
            <el-date-picker
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="btns">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button icon="Search" @click="handleQueryClick">查询</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

const emit = defineEmits(['resetClick', 'queryClick'])

const searchForm = reactive({
  name: '', // 用户名
  realName: '', // 真实姓名
  cellphone: '', // 手机号码
  enable: '', // 状态  -> 1：启用 & 0：禁用
  createAt: '', // 创建时间（包含 开始时间 和 结束时间）
})

const formRef = ref<InstanceType<typeof ElForm>>()

// 重置按钮点击
function handleResetClick() {
  // 1、先将form中的数据全部重置
  formRef.value?.resetFields()
  // 2、将事件发出去，然后在content内部重新发送网络请求
  emit('resetClick')
}

// 查询按钮点击
function handleQueryClick() {
  emit('queryClick', searchForm)
}
</script>
<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;
  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }
}

.btns {
  text-align: right;
  padding: 0 20px 10px 0;
  .el-button {
    height: 30px;
  }
}
</style>
