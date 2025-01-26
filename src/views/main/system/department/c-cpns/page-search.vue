<template>
  <div class="search">
    <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入查询的部门名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="searchForm.leader" placeholder="请输入查询的领导名称" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
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
      <el-button icon="Refresh" @click="handleResetClick" size="large">重置</el-button>
      <el-button icon="Search" @click="handleQueryClick" size="large" type="primary"
        >查询</el-button
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

const emit = defineEmits(['resetClick', 'queryClick'])

const searchForm = reactive({
  name: '', // 部门名称
  leader: '', //部门领导
  createAt: '', //创建时间
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
  padding: 10px 20px 10px 0;
  .el-button {
    height: 35px;
  }
}
</style>
