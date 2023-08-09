<template>
  <div class="flex">
    <el-card>
      <el-table ref="tableRef" v-loading="loading" v-bind="attrs" :data="tableData"
        @selection-change="handleSelectionChange">
        <el-table-column v-if="attrs.selection" type="selection" width="56">
        </el-table-column>
        <el-table-column v-if="attrs.number" type="index" width="56" label="序号">
          <template #default="scope">
            {{ (Number(pagination.pageNum) - 1) * Number(pagination.pageSize) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <template v-for="item in columnList" :key="item.id">
          <el-table-column v-bind="item">
          </el-table-column>
        </template>
      </el-table>

      <pagination style="margin-top: 20px;" v-bind="attrs" :current-page="pagination.pageNum" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-card>
  </div>
</template>

<script lang="ts" setup generic="T">
import { ElTable } from "element-plus";
import bus from '@/utils/bus'
import request from "@/utils/service"
import Pagination from '../Pagination/index.vue'
import { useAttrs, toRaw, ref, getCurrentInstance, onMounted } from 'vue'

const attrs = useAttrs()

const emit = defineEmits(['selection-change'])

// 表格配置
const loading = ref(false)
const tableHeight = ref(500)
const tableRef = ref(null)
const columnList = toRaw(attrs.columns) as any;
// 分页数据
const total = ref(0)

// 查询接口数据
const searchData = ref();
const tableData = ref([]);
const pagination = ref({ pageNum: 1, pageSize: attrs['page-size'] || 20 })

//checkbox点击事件
const instance = getCurrentInstance();
const table = ref(null);
const multipleSelection = ref([]);
const checkNumber = ref(null);


onMounted(() => {
  // 设置表格高度
  tableHeight.value = 300;
  console.log(tableRef.value);

  bus.on('getTableData', (val) => {
    if (val) searchData.value = val;
    // pagination.value.pageNum = 1
    getTableData();
  })
  getTableData()
})

//勾选checkbox事件
const handleSelectionChange = (val: any) => {
  multipleSelection.value = val

  emit('selection-change', val)
  bus.emit('checkedList', val);
};

const handleSizeChange = (val: number) => {
  pagination.value.pageSize = val
  pagination.value.pageNum = 1
  getTableData()
}

const handleCurrentChange = (val: number) => {
  pagination.value.pageNum = val
  getTableData()
}

const getTableData = () => {
  loading.value = true
  request({
    url: attrs.url as string,
    method: "get",
    params: { ...pagination.value, ...searchData.value }
  }).then((res: any) => {
    tableData.value = res.data;
    total.value = res.total
    setTimeout(() => {
      loading.value = false
    }, 300);
  }).catch((error) => {
    console.log(error);

  })
}
//
// defineExpose({ getTableData })

</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-direction: column;
}

:deep(.el-table) {
  height: calc(100vh - 455px);
}
</style>
  