<template>
  <el-upload :file-list="fileList" class="upload-demo" :action="action" :on-preview="handlePreview"
    :on-remove="handleRemove" list-type="picture" :accept="accept" :before-upload="beforeUpload">
    <el-button type="primary">Click to upload</el-button>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'

import { ElMessage, ElMessageBox, type UploadProps, type UploadUserFile } from 'element-plus'
import { log } from 'console';
const props = defineProps({
  action: { type: String },
  fileList: { type: Array<{ name: string, url: string }> },
  accept: { type: String, default: '.xlsx,.doc,.docx,.excel,.zip' },
  multiple: { type: Boolean, default: false }
})
const whiteList = ref('xlsx,doc,docx,excel,zip');
const fileList = props.fileList;

console.log(props, fileList);

const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {

  const fileSuffix = rawFile.name.substring(rawFile.name.lastIndexOf(".") + 1);

  console.log(111112312312312, fileSuffix, whiteList.indexOf('doc'));

  console.log(whiteList.indexOf(fileSuffix));

  // if (whiteList.indexOf(fileSuffix) === -1) {
  //   ElMessage.error(`上传文件只能是${whiteList}格式`);
  //   return false;
  // }
  console.log(rawFile, fileSuffix)
}

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  if (file.status == 'success') {

  }
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
    } totally`
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}
</script>
  