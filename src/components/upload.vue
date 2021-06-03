<template>
  <div class="upload">
    <el-upload class="mb22" action="#" :multiple="false" :auto-upload="true" :show-file-list="false" :before-upload="beforeUploadFile" :http-request="doUploadFile">
      <el-button size="small" type="primary"><i class="el-icon-upload2" /> 上传文件</el-button>
      <span slot="tip" class="el-upload__tip fs12 c9 ml20">支持扩展名：.doc .docx .pdf .jpg .png .xls .xlsx, 文件大小20MB以内</span>
    </el-upload>
    <div v-for="(item, index) in files" :key="index" class="file_item flex">
      <div class="flex1 ellipsis">{{ auto ? (item.filename || item[option.showName]) : item.filename }}</div>
      <el-date-picker v-if="showTime && item.isNew" v-model="item.update_time" type="datetime" :editable="false" placeholder="选择日期时间" @change="timeChange(item, $event)" />
      <div v-if="showTime && !item.isNew" style="width: 230px;">{{ item.update_time }}</div>
      <div v-if="item.filesize" class="w200 center">{{ item.filesize }}KB</div>
      <div class="w150 center">
        <a v-if="item.fullpath" class="add" @click="previewFile(item)">预览</a>
        <a v-if="item.code" class="add" @click="downloadFile(item)">下载</a>
        <a v-if="!isUserXY" class="del" @click="delFile(index)">删除</a>
        <a v-if="isUserXY && item.isNew" class="del" @click="delFile(index)">删除</a>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadNewFile } from '@/api/common'

export default {
  props: {
    arr: { // 文件列表
      type: Array,
      default() { return [] }
    },
    id: { // 任务单编号
      type: String,
      default() { return '' }
    },
    auto: { // 是否直接上传
      type: Boolean,
      default() { return false }
    },
    option: { // 其他参数项
      type: Object,
      default() { return {} }
    },
    powers: { // 权限数组
      type: Array,
      default() { return [1, 1, 1, 1] }// 上传、预览、下载、删除
    },
    showTime: { // 用户协议需要时间
      type: Boolean,
      default: false
    },
    isUserXY: { // 是否用户协议
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      files: this.arr
    }
  },
  watch: {
    arr() {
      this.files = [...this.arr]
    }
  },
  methods: {
    beforeUploadFile(file) {
      const type = /^(.doc|.docx|.pdf|.jpg|.png|.xls|.xlsx)$/.test(file.name.slice(file.name.lastIndexOf('.')))
      const size = file.size / 1024 / 1024 < 20
      if (!type) {
        this.$message('不支持该文件类型,请重新选择')
      }
      if (!size) {
        this.$message('文件大小不可超过20MB')
      }
      return type && size
    },
    doUploadFile(file) {
      const params = new FormData()
      params.append('file', file.file)
      console.log(params, 'params')
      uploadNewFile(params).then(data => {
        if (data) {
          if (!this.auto) {
            this.isUserXY && (data.isNew = true)
            this.files = [...this.files, data.data]
            console.log(this.files, 'this.files')
            this.$emit('UploadChange', this.files)
          } else {
            const propKey = this.option.showName
            this.$http.post(this.option.uploadUrl, { work_number: this.id, [propKey]: [data.code] }).then(res => {
              if (res) {
                this.$emit('UploadChange', true)
              }
            })
          }
        }
      })
    },
    previewFile(item) {
      window.open(`http://file.chonghai.net/onlinePreview?url=${item.fullpath}`)
    },
    downloadFile(item) {
      window.open(this.ExportUrl + '/api/downloadFile?file_code=' + item.code)
    },
    delFile(index) {
      if (!this.auto) {
        this.files.splice(index, 1)
        this.$emit('UploadChange', this.files)
      } else {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.option.delUrl, { id: this.files[index].id }).then(res => {
            if (res) {
              this.$message({ type: 'success', message: '删除成功!' })
              this.$emit('UploadChange', true)
            }
          })
        }).catch(() => {})
      }
    },
    timeChange(item, e) {
      item.update_time = this.$dateFormat(e, 1)
      this.$emit('UploadChange', this.files)
    }
  }
}
</script>

<style lang="less" scoped></style>
