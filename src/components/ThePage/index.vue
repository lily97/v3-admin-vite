<template>
    <div class="app-container flex">
        <!-- 左侧树 -->
        <Tree v-if="Object.keys(props.treeConfig || {}).length != 0" v-bind="{ ...props.treeConfig }"
            @check="handleCheckTree">
        </Tree>
        <div class="main">
            <!-- 查询条件 -->
            <SearchGroup v-if="Object.keys(props.searchGroupConfig || {}).length != 0"
                v-bind="{ ...props.searchGroupConfig }">
            </SearchGroup>
            <!-- 操作组 -->
            <OperateGroup :operationConfig="operationConfig"></OperateGroup>
            <!-- table -->
            <a-table v-bind="{ ...props.tableConfiger, ...props.paginationConfig }" style="width: 100%"
                @selection-change="handleSelectionChange">
            </a-table>
            <!-- 编辑弹窗 -->
            <EditForm v-bind="{ ...props.editFormConfig }">
            </EditForm>
        </div>
    </div>
</template>
  
<script lang="tsx" setup>
import { ref, reactive, toRaw } from 'vue'
import Tree from '../Tree/index.vue'
import SearchGroup from '../SearchGroup/index.vue'
import EditForm from '../EditForm/index.vue'
import OperateGroup from '../OperateGroup/index.vue'
import { type ThePageProps } from '../component'
const props = defineProps<ThePageProps>()


const handleSelectionChange = (val: any) => {
    console.log(val);
}

const handleSubmit = (val: any) => {
    console.log(val);
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
    width: 100%;
}
</style>
  