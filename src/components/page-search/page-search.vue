<template>
  <div class="search">
    <el-form
      :model="searchForm"
      ref="formRef"
      :label-width="searchConfig.labelWidth ?? '80px'"
      size="large"
    >
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select v-model="searchForm[item.prop]" :placeholder="item.placeholder">
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value"></el-option>
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
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

// 定义自定义事件 & 接收的属性
interface IProps {
  searchConfig: {
    labelWidth?: string
    formItems: any[]
  }
}
const props = defineProps<IProps>()

// 定义form数据
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const searchForm = reactive(initialForm)

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
