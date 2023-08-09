<template>
    <el-card style="margin-bottom:10px" v-loading="loading" shadow="never" class="search-wrapper">
        <el-form ref="searchFormRef" :inline="true" :model="searchData" label-width="auto">
            <el-form-item v-for="item in props.searchList" :prop="item.prop" :label="item.label">
                <!-- 输入框 -->
                <el-input v-if="item.type == 'input'" v-model="searchData[item.prop]" placeholder="请输入" clearable />
                <!-- 下拉框 -->
                <el-select v-else-if="item.type == 'select'" v-model="searchData[item.prop]" class="" placeholder="Select"
                    :multiple="item.multiple" v-bind="item" clearable>
                    <el-option v-for="el in item.data" :key="el.value" :label="el.label" :value="el.value" />
                </el-select>
                <!-- 日期选择 -->
                <el-date-picker v-else-if="item.type == 'date'" v-model="searchData[item.prop]" :type="item.dateType"
                    placeholder="Pick a day" value-format="YYYY-MM-DD" format="YYYY-MM-DD" />
                <!-- 日期选择  区间 -->
                <el-date-picker v-else-if="item.type == 'daterange'" v-model="searchData[item.prop]" :type="item.dateType"
                    value-format="YYYY-MM-DD" format="YYYY-MM-DD" range-separator="至" start-placeholder="Start date"
                    end-placeholder="End date" class="daterange" />
            </el-form-item>
            <!-- 操作部分 -->
            <el-form-item>
                <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
                <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang='ts' generic="T">

import { reactive, ref, toRaw } from "vue"
import bus from '@/utils/bus'
import { type FormInstance } from "element-plus"
import { Search, Refresh } from "@element-plus/icons-vue"
import { type SearchGroupProps } from '../component'

const props = defineProps<SearchGroupProps>();

const searchFormRef = ref<FormInstance | null>(null)

const loading = ref(false)

const searchData = reactive<any>({})

// props.searchList.forEach((item) => {
//     console.log(item.prop);
//     searchData[item.prop] = '';
// });


const handleSearch = () => {
    bus.emit('getTableData', searchData);
}

const resetSearch = () => {
    searchFormRef.value?.resetFields()
    handleSearch()
}

</script>

<style lang="scss" scoped>
:deep(.el-range-editor.el-input__wrapper) {
    width: 242px !important;
}

:deep(.el-input) {
    width: 180px;
}
</style>