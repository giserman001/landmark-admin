<template>
  <div class="upload">
    <el-upload action="#" :limit="limit" :multiple="multiple" :auto-upload="autoUpload" :show-file-list="false" :before-upload="beforeUploadFile" :on-exceed="onExceed" :http-request="doUploadFile">
      <el-button size="small" type="primary"><i class="el-icon-upload2" /> 上传文件</el-button>
      <div slot="tip" class="el-upload__tip fs12 c9" style="line-height:18px;">支持扩展名：{{ type.join(',') }} 文件大小{{ size }}MB以内</div>
    </el-upload>
    <div class="file-list">
      <div v-for="(item, index) in fileList" :key="index" class="file-item">
        <div class="name">{{ item.name }}</div>
        <div class="operate" @click="del(index)">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
import { saveFile } from '@/api/common'

export default {
  props: {
    value: { // 文件列表
      type: Array,
      default() { return [] }
    },
    size: {
      type: Number,
      default() { return 20 }
    },
    type: {
      type: Array,
      default() { return ['.doc', '.docx', '.pdf', '.jpg', '.png'] }
    },
    multiple: {
      type: Boolean,
      default() {
        return true
      }
    },
    autoUpload: {
      type: Boolean,
      default() {
        return true
      }
    },
    limit: {
      type: Number,
      default() { return 1 }
    }
  },
  data() {
    return {
      fileList: []
    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(val) {
        this.fileList = JSON.parse(JSON.stringify(val))
      }
    }
  },
  methods: {
    onExceed() {
      this.$message.error(`最多上传${this.limit}个文件, 如果想重新上传, 请手动删除!`)
    },
    beforeUploadFile(file) {
      const reg = `^(${this.type.join('|')})$`
      const type = new RegExp(reg).test(file.name.slice(file.name.lastIndexOf('.')))
      const size = file.size / 1024 / 1024 < this.size
      if (!type) {
        this.$message('不支持该文件类型,请重新选择')
      }
      if (!size) {
        this.$message(`文件大小不可超过${this.size}MB`)
      }
      return type && size
    },
    doUploadFile(file) {
      console.log(file, 'file', this.fileList)
      const params = new FormData()
      params.append('file', file.file)
      params.append('type', '01')
      saveFile(params).then(res => {
        if (res.code === 0) {
          this.fileList = this.fileList.concat([{ name: res.data.fileName, id: res.data.fileId }])
          this.$emit('input', this.fileList)
        }
      })
    },
    del(index) {
      this.fileList.splice(index, 1)
      this.$emit('input', this.fileList)
    }
  }
}
</script>

<style lang="scss" scoped>
.file-item{
  display: flex;
  .name{
    flex: 3;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .operate{
    flex: 1;
    text-align: right;
    color: red;
    cursor: pointer;
  }
}
</style>
