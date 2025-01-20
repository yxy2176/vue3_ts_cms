<template>
  <div class="content">
    <!-- 头部部分 -->
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary">新建用户</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table :data="usersList" border>
        <el-table-column align="center" type="selection" />
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="60px"
        />
        <el-table-column
          align="center"
          label="用户名"
          prop="name"
          width="140px"
        />
        <el-table-column
          align="center"
          label="真实姓名"
          prop="realname"
          width="140px"
        />
        <el-table-column
          align="center"
          label="手机号码"
          prop="cellphone"
          width="140px"
        />
        <el-table-column
          align="center"
          label="状态"
          prop="enable"
          width="100px"
        />
        <el-table-column align="center" label="创建时间" prop="createAt" />
        <el-table-column align="center" label="更新时间" prop="updateAt" />
        <el-table-column align="center">
          <el-button size="small" icon="edit" type="primary" text>
            编辑</el-button
          >
          <el-button size="small" icon="delete" type="danger" text
            >删除</el-button
          >
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">分页</div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'

// 1、发起action，请求usersList的数据
const systemStore = useSystemStore()
systemStore.postUserListAction()

// 2、获取usersList的数据，并进行展示
const { usersList } = storeToRefs(systemStore)
</script>
<style lang="less" scoped>
.content {
  padding: 20px;
  margin-top: 20px;
  background-color: #fff;
}

.header {
  .title {
    font-size: 22px;
  }
  display: flex;
  justify-content: space-between;
}
</style>
