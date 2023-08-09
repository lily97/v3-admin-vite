<template>
  <div class="app-container flex">
    <!-- 左侧树 -->
    <Tree :treeData="treeData" :defaultChecked="defaultChecked" @check="handleCheckTree"></Tree>
    <div class="main">
      <!-- 查询条件 -->
      <SearchGroup :searchList="searchList"></SearchGroup>
      <!-- table -->
      <a-table :columns="columns" :url="url" stripe :selection="true" :number="false" style="width: 100%"
        @selection-change="handleSelectionChange">
      </a-table>
      <!-- 编辑弹窗 -->
      <EditForm v-model="showEdit" @on-submit="handleSubmit" :formList="formList" :title="'新增弹窗'">
      </EditForm>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { ref, reactive, toRaw } from 'vue'
import Tree from '@/components/Tree/index.vue'
import SearchGroup from '@/components/SearchGroup/index.vue'
import EditForm from '@/components/EditForm/index.vue'
const url = '/user/getUserList'
const showEdit = ref(false)

const departmentList = ref();
const fileList = ref();
const defaultChecked = ref([3]);

departmentList.value = [{ value: 1, label: '行政部' }, { value: 2, label: '法务部' }, { value: 3, label: '公关部' },]

const searchList = ref([
  { label: '用户名', type: 'input', prop: 'userName' },
  { label: '手机号', type: 'input', prop: 'phone' },
  { label: '部门', type: 'select', prop: 'department', data: departmentList, multiple: true },
  { label: '生日', type: 'date', prop: 'birthday', dateType: 'date' },
  { label: '区间', type: 'daterange', prop: 'startEnd', dateType: 'daterange' },
])

interface RuleForm {
  name: string
}

// 表单数据 新增/修改
const formList = ref([
  { label: '用户名', type: 'input', prop: 'userName', data: '', required: true },
  { label: '部门', type: 'select', prop: 'department', selectData: departmentList, required: true },
  { label: '生日', type: 'date', prop: 'birthday',data:'2021-07-09', dateType: 'date' },
  { label: '区间', type: 'daterange', prop: 'startEnd', dateType: 'daterange' },
  {
    label: '文件', type: 'uploadFile', prop: 'filePath',
    action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15', multiple: true, fileList: fileList
  },
])

fileList.value = [{
  name: 'food.jpeg',
  url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
},
{
  name: 'food2.jpeg',
  url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
},]

const treeData = ref([
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 11,

        label: 'Level two 1-1',
        children: [
          {
            id: 111,

            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 21,
        label: 'Level two 2-1',
        children: [
          {
            id: 211,
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        id: 22,
        label: 'Level two 2-2',
        children: [
          {
            id: 221,
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 31,
        label: 'Level two 3-1',
        children: [
          {
            id: 311,
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        id: 32,
        label: 'Level two 3-2',
        children: [
          {
            id: 321,
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
]);

const columns = ref(
  [
    {
      prop: "name", label: "姓名", formatter: (val: { name: string }, text: string) => {
        return val.name + '/good'
      }
    },
    { prop: "id", label: "id", sortable: true },
    { prop: "password", label: "密码" },
    {
      prop: "operation", label: "操作",
      formatter: (row: object) => {
        //编辑按钮事件
        const handleEdit = (val: object) => {
          showEdit.value = true;
        };
        //删除按钮事件
        const handleDelete = (val: object) => {
          console.log('row', row, val);
        }
        return <div style="display:flex;">
          <el-button
            type="primary"
            size="small"
            onClick={() => {
              handleEdit(row);
            }}
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="small"
            onClick={() => {
              handleDelete(row);
            }}
          >
            删除
          </el-button>
        </div>
      }
    }
  ]
)

const handleSelectionChange = (val: any) => {
  console.log(val);
}

const handleSubmit = (val: any) => {
  console.log(val);
  showEdit.value = val;
}

const handleCheckTree = (val: any) => {
  console.log(val);
}

</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}

.main {
  width: 82%;
}
</style>
