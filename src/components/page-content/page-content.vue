<template>
  <div class="content">
    <!-- 头部部分 -->
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button type="primary" @click="handleNewUserClick">{{
        contentConfig?.header?.btnTitle ?? '新建数据'
      }}</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table :data="pageList" border v-bind="contentConfig.childrenTree">
        <template v-for="item in contentConfig.propList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
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
          </template>
          <!-- <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" :prop="item.prop" v-bind="scope"></slot>
              </template>
            </el-table-column>
          </template> -->
          <template v-else>
            <el-table-column align="center" v-bind="item"></el-table-column>
          </template>
        </template>
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
import { ref } from 'vue'
import { formatUTC } from '@/utils/format'

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propList: any[]
    childrenTree?: any
  }
}

// props传入数据
const props = defineProps<IProps>()

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
  systemStore.postPagelistAction(props.contentConfig.pageName, queryInfo)
}

// 4、编辑和删除逻辑
const emit = defineEmits(['editClick', 'newClick'])
// 4.1 编辑部分
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}
// 4.2 删除部分
function handleDeleteBtnClick(id: number) {
  systemStore.deletePageDataByIdAction(props.contentConfig.pageName, id)
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
