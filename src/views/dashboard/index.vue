<template>
  <ThePage :treeConfig="treeConfig" :searchGroupConfig="searchGroupConfig" :tableConfiger="tableConfiger"
    :editFormConfig="editFormConfig" :operationConfig="operationConfig" :paginationConfig="paginationConfig">
  </ThePage>
</template>

<script lang="tsx" setup>
import { ref, reactive, toRaw } from 'vue'
import ThePage from '@/components/ThePage/index.vue'
import { onMounted } from 'vue';
import bus from '@/utils/bus'


/*
树状图的数据以及配置参数
*/
const treeConfig = reactive({
  title: '树状图', // 树状图标题 false
  hasSearch: true, // 是否展示搜索框  true
  showExpend: true,// 是否显示全部展开折叠按钮 true
  // showCheckBox: false, // 是否展示复选框  true
  defaultIcon: 'Delete', // 默认图标  false
  showLine: true,// 是否展示左侧链接线 true
  lineStyle: '1px dashed white' // 链接线的风格  默认：1px dashed #dcdfe6 注意顺序
} as any)
treeConfig.defaultChecked = [3]; // 复选框默认选中项
treeConfig.treeData = [
  {
    id: 1,
    label: 'Level one 1',
    icon: 'Search',
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
];

/*
搜索框的数据以及配置参数
*/
const searchGroupConfig = reactive({} as any)
const departmentList = ref(); // 如果有下拉数据 则请求出来并赋值给
departmentList.value = [{ value: 1, label: '行政部' }, { value: 2, label: '法务部' }, { value: 3, label: '公关部' },]
searchGroupConfig.searchList = [
  { label: '用户名', type: 'input', prop: 'name' },
  { label: '手机号', type: 'input', prop: 'phone' },
  { label: '部门', type: 'select', prop: 'department', selectData: departmentList.value, multiple: true },
  { label: '生日', type: 'date', prop: 'birthday', dateType: 'date' },
  { label: '区间', type: 'daterange', prop: 'startEnd', dateType: 'daterange' },
]


/*
操作组的数据以及配置参数
*/
const operationConfig = reactive([
  { label: '新增', type: 'primary', icon: 'Plus', click: 'add', data: { url: 'getdata/url/list', state: 1 } },
  { label: '删除', type: 'danger', icon: 'Delete', click: 'del' },
  { label: '导出', type: 'primary', icon: 'MessageBox', click: 'exportData' },
  { label: '打印', type: 'primary', icon: 'Printer', click: 'printData' },
  {
    label: '停用', type: 'warning', icon: 'Delete', func: () => {
      console.log('这是自定义函数事件----停用啦');
    }
  },
])

/*
表格数据以及配置参数
*/
const tableConfiger = reactive({} as any)
tableConfiger.columns =
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
          editFormConfig.show = true;
          bus.emit('openEditForm', { row: val })
        };
        //删除按钮事件
        const handleDelete = (val: object) => {
          console.log('row', row, val);
        }
        return <div style="display:flex;">
          <el-button
            type="primary"
            icon="Edit"
            size="small"
            onClick={() => {
              handleEdit(row);
            }}
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            icon="delete"
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
tableConfiger.url = '/user/getUserList';
tableConfiger.stripe = true;
tableConfiger.selection = true;
tableConfiger.number = true;

/*
分页数据以及配置参数
*/
const paginationConfig = reactive({
  layout: "total, sizes, prev, pager, next,jumper",
  'page-sizes': [10, 20, 30, 50],
});

/*
新增修改弹窗的数据以及配置参数
*/
const editFormConfig = reactive({
  title: '修改资料',
  show: false
} as any);
const fileList = ref();
editFormConfig.formList = [
  { label: '姓名', type: 'input', prop: 'name', required: true },
  { label: '部门', type: 'select', prop: 'department', selectData: departmentList, required: true },
  { label: '生日', type: 'date', prop: 'birthday', data: '2021-07-09', dateType: 'date' },
  { label: '区间', type: 'daterange', prop: 'startEnd', dateType: 'daterange' },
  {
    label: '文件', type: 'uploadFile', prop: 'filePath',
    action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15', multiple: true, fileList: fileList
  },
]
fileList.value = [{
  name: 'food.jpeg',
  url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
},
{
  name: 'food2.jpeg',
  url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
},]


onMounted(() => {
  // 如果不使用组件内部的提交事件 则在此写入你的提交逻辑 val就是表单数据
  bus.on('submitForm', ((val) => {
    console.log(val);
  }))
})

</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}

.main {
  width: 82%;
}
</style>
