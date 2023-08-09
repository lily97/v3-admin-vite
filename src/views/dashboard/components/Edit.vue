<template>
  <el-dialog v-model="dialogVisible" :before-close="handleClose" title="Tips" width="30%">
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close()">Cancel</el-button>
        <el-button type="primary" @click="submit">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { computed } from 'vue';
const props = defineProps({
  modelValue: { type: Boolean, default: false },
})

const emits = defineEmits(['update:modelValue']);

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => emits('update:modelValue', val)
})

const close = () => {
  dialogVisible.value=false
}

const submit = () => {
  dialogVisible.value=false
}

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
      dialogVisible.value=false
    })
    .catch(() => {
      // catch error
    })
}

</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
