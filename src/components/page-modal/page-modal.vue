<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
      width="30%"
      center
    >
      <div class="dialogForm">
        <el-form :model="dialogFormData" label-width="70px" size="large">
          <template v-for="item in props.modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="dialogFormData[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select v-model="dialogFormData[item.prop]" :placeholder="item.placeholder">
                  <!-- <template v-for="item in entireDepartments" :key="item.id">
                    <el-option :label="item.name" :value="item.id"></el-option>
                  </template> -->
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value"></el-option>
                  </template>
                </el-select>
              </template>
              <template v-else-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { ref, reactive } from 'vue'
const dialogVisible = ref(false)
const dialogFormData = reactive<any>({
  name: '',
  leader: '',
  parentId: '',
})
const isNewRef = ref(true)
const editData = ref()
const systemStore = useSystemStore()

const mainStore = useMainStore()

// 0：定义props
interface IProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}

const props = defineProps<IProps>()

// 2、modal提示框的内容显示
function setModalVisible(isNew: boolean = true, itemData?: any) {
  isNewRef.value = isNew
  dialogVisible.value = true

  if (!isNew && itemData) {
    // 编辑用户 的情况
    for (const key in dialogFormData) {
      dialogFormData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    // 新建用户 的情况
    // for (const key in dialogFormData) {
    //   dialogFormData[key] = ''
    // }
    for (const key in dialogFormData) {
      // 若config里有初始化数据
      const item = props.modalConfig.formItems.find((item) => item.prop === key)
      dialogFormData[key] = item ? item.initialValue : ''
    }
    editData.value = null
  }
}

// 3、点击了确定后的逻辑
function handleConfirmClick() {
  dialogVisible.value = false
  if (!isNewRef.value && editData.value) {
    // 编辑
    systemStore.editPageDataAction(props.modalConfig.pageName, editData.value.id, dialogFormData)
  } else {
    // 新建
    systemStore.newPageDataAction(props.modalConfig.pageName, dialogFormData)
  }
}

defineExpose({ setModalVisible })
</script>
<style lang="less" scoped>
.dialogForm {
  padding: 5px 20px;
}
</style>
