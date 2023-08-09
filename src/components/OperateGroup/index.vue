<template>
    <el-card style="margin-bottom:10px">
        <el-button v-for="item in operationConfig" v-bind="{ ...item }" plain @click=" filterFunc(item)">{{
            item.label
        }}</el-button>
    </el-card>
</template>

<script setup lang='ts'>
import { ref } from "vue"
import bus from '@/utils/bus'
import { Search, Refresh, Delete, Plus, Printer, MessageBox } from "@element-plus/icons-vue"
import { onMounted } from "vue";
import { type OperateGroupProps } from '../component'

const props = defineProps<OperateGroupProps>();
const checkedList = ref();
const currentClick = ref();

onMounted(() => {
    bus.on('checkedList', (val: any) => {
        checkedList.value = val;
        console.log(checkedList);
    })
})


const filterFunc = (item: any) => {
    console.log(item);
    currentClick.value = item.data
    switch (item.click) {
        case 'del':
            return del();

        case 'add':
            return add();

        case 'printData':
            return printData();

        case 'exportData':
            return exportData();

        default:
            return item.func();
    }
}


const del = () => {
    const xhr = new XMLHttpRequest();
    if (Object.keys(checkedList.value || {}).length == 0) {
        console.log('111111');
    } else {
        console.log('222222');
        bus.emit('getTableData');
    }
}

const add = () => {
    bus.emit('openEditForm', { visible: true, url: currentClick.value.url })
    console.log('新增');
}

const printData = () => {
    console.log(props);

    console.log('打印');

}

const exportData = () => {
    console.log('导出');
}



</script>

<style lang="less" scoped></style>