<template>
    <el-pagination v-bind="attrs" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>

<script setup lang='ts'>
import { ref, useAttrs } from "vue"

const attrs = useAttrs();
const emit = defineEmits(['size-change', 'current-change'])

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
    emit('size-change', val)
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    emit('current-change', val)
}
</script>

<style lang="less" scoped></style>