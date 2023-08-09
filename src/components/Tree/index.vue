<template>
  <el-card class="tree">
    <div class="title" v-if="title">
      <span>{{ title }}</span>
    </div>

    <!-- 操作组 -->
    <div class="operates">
      <el-space>
        <el-icon v-if="showExpend" @click="expandAll" size="26">
          <Fold v-if="!isExpandAll" />
          <Expand v-else />
        </el-icon>
        <el-checkbox v-if="showCheckBox" @click="checkAll" v-model="isCheckAll" label="" size="large" />

        <el-icon size="24" @click="refresh">
          <Refresh />
        </el-icon>
      </el-space>
    </div>

    <!-- 搜索框 -->
    <el-input v-model="filterText" placeholder="" class="input-with-select" v-if="hasSearch" clearable>
      <!-- <template #append>
        <el-button :icon="Search" />
      </template> -->
    </el-input>
    <el-tree :data="treeData" ref="treeRef" :lazy="false" v-loading="loading" :show-checkbox="showCheckBox" draggable
      :props="defaultProps" node-key="id" :default-checked-keys="defaultChecked" :default-expand-all="false"
      @node-click="handleNodeClick" @check="handleCheck" :filter-node-method="filterNode"
      @node-drag-start="handleDragStart" @node-drag-enter="handleDragEnter" @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver" @node-drag-end="handleDragEnd" @node-drop="handleDrop">
      <template #default="{ node, data }">
        <element-tree-line :node="node" :showLabelLine="false" :showLine="showLine" :lineStyle="lineStyle">
          <component :is="defaultIcon||data.icon" style="width: 12px;"></component> {{ node.label }}
          <el-dropdown>
            <span class="el-dropdown-link">
              ...
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <div @click="append(data)" class="flex-center">
                    <span>新增子级</span>
                    <el-icon :size="18">
                      <CirclePlus />
                    </el-icon>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div @click="append(data)" class="flex-center">
                    <span>删除</span>
                    <el-icon :size="18">
                      <Delete />
                    </el-icon>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item disabled>Action 3</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </element-tree-line>

      </template>
    </el-tree>
    <!-- 新增修改弹窗 -->
    <EditForm v-bind="{ ...editFormConfig }"></EditForm>
  </el-card>
</template>
  
<script lang="tsx" setup>
import { ref, reactive, watch, toRef, h } from 'vue'
import { Fold, Refresh, Search, ArrowDown } from '@element-plus/icons-vue'
import EditForm from '../EditForm/index.vue'
import bus from '@/utils/bus'
import { ElMessage, ElMessageBox, ElTree } from 'element-plus';
import type Node from 'element-plus/es/components/tree/src/model/node'
import type { DragEvents } from 'element-plus/es/components/tree/src/model/useDragNode'
import type {
  AllowDropType,
  NodeDropType,
} from 'element-plus/es/components/tree/src/tree.type'
import { onMounted } from 'vue'
import { getElementLabelLine } from './Line/index';
import './Line/style.scss';
import { type TreeProps, type WithTreeProps } from '../component'

const ElementTreeLine = getElementLabelLine(h);
interface Tree {
  id: number
  label: string
  children?: Tree[]
}

const props = withDefaults(defineProps<TreeProps>(), {
  treeData: () => [],
  defaultChecked: () => [],
  hasSearch: true,
  showExpend: true,
  showCheckBox: true,
  showLine: true
});

const filterText = ref<string>(''); // 查询框
const isExpandAll = ref(false); // 是否全部折叠
const isCheckAll = ref(false); // 是否全部选中
const treeRef = ref(ElTree) // 树节点
const loading = ref(false)// 加载状态
const defaultProps = { // 树的数据格式 
  children: 'children',
  label: 'label',
}
// const lineStyle = ref('1px dashed #dcdfe6')

// 修改弹窗数据
const editFormConfig = reactive({
  title: '修改树状图',
  show: false,
  formList: [
    { label: 'tree名', type: 'input', prop: 'name', required: true },
  ],
});


const emits = defineEmits(['check']);

onMounted(() => {
  getTreeData();
})

// 获取tree数据 保持当前折叠展开状态
const getTreeData = () => {
  console.log(props.treeData);
}
// 鼠标浮动到节点触发事件
const handleHover = (e: any) => {
  console.log(e);

}

// 刷新tree 保持当前折叠展开状态
const refresh = () => {

}

// 点击当前行
const handleNodeClick = (data: Tree) => {
  console.log(data)
}

// 勾选一个节点
const handleCheck = (checkedNodes: any, checkedKeys: any) => {
  const nodes = treeRef.value.store.nodesMap;
  var state = true
  for (var i in nodes) {
    if (!nodes[i].checked) {
      state = false
    }
  }
  isCheckAll.value = state;
}


const handleDragStart = (node: Node, ev: DragEvents) => {
  console.log('drag start', node)
}

const handleDragEnter = (
  draggingNode: Node,
  dropNode: Node,
  ev: DragEvents
) => {
  console.log('tree drag enter:', dropNode.label)
}
const handleDragLeave = (
  draggingNode: Node,
  dropNode: Node,
  ev: DragEvents
) => {
  console.log('tree drag leave:', dropNode.label)
}

const handleDragOver = (draggingNode: Node, dropNode: Node, ev: DragEvents) => {
  console.log('tree drag over:', dropNode.label)
}

const handleDragEnd = (
  draggingNode: Node,
  dropNode: Node,
  dropType: NodeDropType,
  ev: DragEvents
) => {
  console.log('tree drag end:', dropNode && dropNode.label, dropType)
}

const handleDrop = (
  draggingNode: Node,
  dropNode: Node,
  dropType: NodeDropType,
  ev: DragEvents
) => {
  console.log('tree drop:', dropNode.label, dropType)
}
const allowDrop = (draggingNode: Node, dropNode: Node, type: AllowDropType) => {
  if (dropNode.data.label === 'Level two 3-1') {
    return type !== 'inner'
  } else {
    return true
  }
}
const allowDrag = (draggingNode: Node) => {
  return !draggingNode.data.label.includes('Level three 3-1-1')
}

watch(filterText, (val) => {
  loading.value = true
  treeRef.value!.filter(val)
})
const filterNode = (value: string, data: { [key: string]: any }) => {
  setTimeout(() => {
    loading.value = false
  }, 300);
  if (!value) return true
  return data.label.includes(value)
}


const append = (data: Tree) => {
  editFormConfig.show = true;
  bus.emit('openEditForm')
}

const remove = (data: Tree, node: Node) => {
  ElMessageBox.confirm('是否删除该节点?')
    .then(() => {
      // done()
    })
    .catch(() => {
      // catch error
    })
}

const expandAll = () => {
  console.log(treeRef.value);
  isExpandAll.value = !isExpandAll.value
  const nodes = treeRef.value.store.nodesMap;
  for (var i in nodes) {
    nodes[i].expanded = isExpandAll.value;
  }
}

const checkAll = () => {
  if (!isCheckAll.value) {
    treeRef.value.setCheckedNodes(props.treeData)
  } else {
    treeRef.value.setCheckedNodes([])
  }

}

</script>

<style lang="scss" scoped>
:v-deep .input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}

.tree {
  width: 260px !important;
  min-width: 260px;
  margin-right: 10px;
  // overflow: auto;

  .title {
    margin-bottom: 10px;
  }
}

.el-input {
  margin-bottom: 20px;
}

.custom-tree-node {
  margin-left: 10px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.operates {
  display: flex;
  align-items: center;

  .el-icon {
    cursor: pointer;
  }

  :deep(.el-checkbox.el-checkbox--large .el-checkbox__inner) {
    width: 20px !important;
    height: 20px !important;
  }

  :deep(.el-checkbox__inner::after) {
    height: 14px !important;
    left: 7px !important;
  }
}

:deep(.el-tree) {
  height: calc(100% - 110px);
  overflow: auto;
}

:deep(.el-tree-node>.el-tree-node__children) {
  overflow: auto !important;
}

:deep(.el-tree>.el-tree-node) {
  display: inline-block;
  min-width: 100%;
}

:deep(.el-card__body) {
  height: 100%;
}

.el-dropdown-link {
  display: none;
}

.el-tree-node__content:hover .el-dropdown-link {
  display: block;
}

// dropmenu
.el-dropdown {
  margin-left: 30px;
}

.flex-center {
  display: flex;
  align-items: center;
}
</style>
  