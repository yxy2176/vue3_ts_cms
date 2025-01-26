<template>
  <div class="content">
    <!-- 头部部分 -->
    <div class="header">
      <h3 class="title">部门列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建部门</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table :data="pageList" border>
        <el-table-column align="center" type="selection" />
        <el-table-column align="center" type="index" label="序号" width="60px" />
        <el-table-column align="center" label="部门名称" prop="name" width="150px" />
        <el-table-column align="center" label="部门领导" prop="leader" width="150px" />
        <el-table-column align="center" label="上级部门" prop="parentId" width="150px" />
        <el-table-column align="center" label="创建时间" prop="createAt">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateAt">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" width="150px" label="操作">
          <template #default="scope">
            <el-button
              size="small"
              icon="edit"
              type="primary"
              text
              @click="handleEditBtnClick(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              icon="delete"
              type="danger"
              @click="handleDeleteBtnClick(scope.row.id)"
              text
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'

// 1、发起action，请求usersList的数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchPageListData()

// 2、获取usersList,usersTotalCount的数据，并进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)

// 3、分页相关的逻辑
function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}

function fetchPageListData(formData: any = {}) {
  // 1、获取offset & size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  // 2、发起网络请求
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postPagelistAction('department', queryInfo)
}

// 4、编辑和删除逻辑
const emit = defineEmits(['editClick', 'newClick'])
// 4.1 编辑部分
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}
// 4.2 删除部分
function handleDeleteBtnClick(id: number) {
  systemStore.deletePageDataByIdAction('department', id)
}

// 5、新建用户部分
function handleNewUserClick() {
  emit('newClick')
}

defineExpose({ fetchPageListData })
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
  // align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 10px;
}

.table {
  margin-top: 5px;
  :deep(.el-table__cell) {
    padding: 12px 0;
  }
  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
