<template>
    <el-dialog v-model="dialogVisible" :title="title" width="500px" :before-close="handleClose">
        <!-- <el-card style="margin-bottom:10px" v-loading="loading" shadow="never" class="search-wrapper"> -->
        <el-form ref="formListRef" :model="formData" :rules="rules" label-width="auto">
            <el-form-item :prop="item.prop" :label="item.label" v-for="item in props.formList">
                <!-- <component :is="item.type" v-model="formData[item.prop]"></component> -->
                <!-- 输入框 -->
                <el-input v-if="item.type == 'input'" v-model="formData[item.prop]" placeholder="请输入" clearable />
                <!-- 下拉框 -->
                <el-select v-else-if="item.type == 'select'" v-model="formData[item.prop]" placeholder="Select"
                    :multiple="item.multiple" clearable>
                    <el-option v-for="el in item.selectData" :key="el.value" :label="el.label" :value="el.value" />
                </el-select>
                <!-- 日期选择 -->
                <el-date-picker v-else-if="item.type == 'date'" v-model="formData[item.prop]" :type="item.dateType"
                    value-format="YYYY-MM-DD" format="YYYY-MM-DD" placeholder="Pick a day" />
                <!-- 日期选择  区间 -->
                <el-date-picker v-else-if="item.type == 'daterange'" v-model="formData[item.prop]" :type="item.dateType"
                    value-format="YYYY-MM-DD" format="YYYY-MM-DD" range-separator="至" start-placeholder="Start date"
                    end-placeholder="End date" class="daterange" />
                <!-- 文件上传 -->
                <Upload v-else-if="item.type == 'uploadFile'" v-bind="item"></Upload>
            </el-form-item>
        </el-form>
        <!-- </el-card> -->
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submit">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang='ts' generic="T">

import { reactive, ref, toRaw, computed, onMounted, watch } from "vue"
import bus from '@/utils/bus'
import { type FormInstance, type FormRules, ElMessageBox, ElMessage } from "element-plus"
import { Search, Refresh, CirclePlus, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import Upload from '@/components/UploadFile/index.vue'

interface Props {
    title?: string,
    url?: string,
    val?: object,
    show: boolean,
    formList: Array<{
        label: string,
        type: string,
        prop: string,
        data?: any
        selectData?: Array<{ value: number, label: string }>,
        multiple?: boolean | undefined,
        action?: string,
        required?: boolean | false,
        dateType?: "date" | "year" | "month" | "dates" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange"
    }>

}

const props = defineProps<Props>();
console.log(props);

const formListRef = ref<FormInstance | null>(null)

const formData = ref<any>({})
const rules: FormRules = reactive({})

const dialogVisible = ref(false);

onMounted(() => {
    bus.off('openEditForm')

    bus.on('openEditForm', ((val: any) => {
        console.log(props);
        dialogVisible.value = true // 显示弹窗
        // 循环处理必填项 和当前行数据
        const row = val?.row;
        props.formList.forEach((item) => {
            if (item.required) {
                rules[item.prop] = [{ required: true, message: `${item.label}是必填项`, trigger: item.type == 'input' ? 'blur' : 'change' }];
            }
            // 如果row存在 是修改 否则是新增
            if (row) {
                formData.value[item.prop] = row[item.prop];  //  赋值数据
            }
        });
        console.log(formData);
    }))
})

const close = () => {
    dialogVisible.value = false
}


const submit = () => {
    formListRef.value?.validate((valid: boolean, fields) => {
        if (valid) {
            if (props.url) {
                // 如果url有值  则在此保存
            } else {
                // 否则把参数传出去 走自定义保存逻辑
                bus.emit('submitForm', formData)
            }
            dialogVisible.value = false
            formListRef.value?.resetFields()
            bus.emit('getTableData');
        } else {
            ElMessage.error('请完善数据')
        }
    })
}

const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            done()
            dialogVisible.value = false
        })
        .catch(() => {
            // catch error
        })
}

console.log(toRaw(formData));


</script>

<style lang="scss" scoped>
:deep(.el-select) {
    width: 100%;
}

:deep(.el-input) {
    width: 100%;
}
</style>