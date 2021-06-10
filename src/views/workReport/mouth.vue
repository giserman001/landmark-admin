<template>
  <div class="bgfff out_wrap">
    <div class="flex_between1">
      <el-form :inline="true" :model="form" size="small" label-suffix=":">
        <el-form-item label="时间">
          <el-date-picker v-model="form.time" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" :editable="false" :value-format="'yyyy-MM-dd'" @change="query" />
        </el-form-item>
      </el-form>
      <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <zf-table
      :columns="column"
      :data-source="tableList"
      :total="pages.total"
      :page-size="pages.pageSize"
      :page-num="pages.page"
      @change="handlePageChange"
    >
      <!-- 报告 -->
      <template
        slot="report"
      >
        <a class="active_color">下载</a>
      </template>
      <!-- 评估意见栏 -->
      <template
        slot="idea"
      >
        <a class="active_color" @click="upVisible=true;isSubmit=false">查看</a>
        <a class="active_color ml20" @click="upVisible=true;isSubmit=true">编辑</a>
      </template>
      <!-- 操作 -->
      <template
        slot="action"
        slot-scope="{ row }"
      >
        <a class="active_color" @click="edit(row)">编辑</a>
        <a class="del ml20" @click="del(row)">删除</a>
      </template>
    </zf-table>
    <el-dialog :title="`${mode === 1 ? '新增' : '编辑'}月报`" :visible.sync="addVisible" width="600px" center>
      <el-form :model="addForm" label-suffix=":">
        <el-form-item label="时间">
          <el-date-picker v-model="addForm.time" :editable="false" clearable type="date" placeholder="请选择日期" />
        </el-form-item>
        <el-form-item label="当月开展的预防性保护巡查的内容和路线总结">
          <el-input v-model="addForm.name" class="inputWith" autocomplete="off" />
        </el-form-item>
        <el-form-item label="发现的病害问题及处置情况总结">
          <el-input v-model="addForm.name" class="inputWith" autocomplete="off" />
        </el-form-item>
        <el-form-item label="实施的专业检修工作内容，工作量和完成效果">
          <el-input v-model="addForm.name" class="inputWith" autocomplete="off" />
        </el-form-item>
        <el-form-item label="其他各项工作情况">
          <el-input v-model="addForm.name" class="inputWith" autocomplete="off" />
        </el-form-item>
        <el-form-item label="月报上传">
          <el-upload
            ref="upload"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
            <div slot="tip" class="el-upload__tip" style="line-height:20px;">只能上传dwg/jpg/png文件，且不超过20M</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="upVisible" width="450px" center>
      <el-form ref="form" :model="commentForm" label-width="145px" label-suffix=":">
        <el-form-item label="评估小组成员意见">
          <el-input v-if="isSubmit" v-model="commentForm.sunName" />
          <span v-else>会撒娇就撒娇</span>
        </el-form-item>
        <el-form-item label="评估组长意见">
          <el-input v-if="isSubmit" v-model="commentForm.sunName" />
          <span v-else>会撒娇就撒娇</span>
        </el-form-item>
        <el-form-item label="评估专家意见">
          <el-input v-if="isSubmit" v-model="commentForm.sunName" />
          <span v-else>会撒娇就撒娇</span>
        </el-form-item>
        <el-form-item label="评估项目组综合意见">
          <el-input v-if="isSubmit" v-model="commentForm.sunName" />
          <span v-else>会撒娇就撒娇</span>
        </el-form-item>
      </el-form>
      <div v-if="isSubmit" slot="footer" class="dialog-footer">
        <el-button @click="upVisible = false">取 消</el-button>
        <el-button type="primary" @click="upVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ZfTable from '@/components/ZfTable/CoreTable'
import { mouth } from './columns/list'
export default {
  name: 'List',
  components: {
    ZfTable
  },
  data() {
    return {
      form: {
        time: ''
      },
      column: mouth,
      tableList: [{
        id: 1,
        project: '承德避暑山庄',
        time: '2021-06-04'
      }, {
        id: 1,
        project: '承德避暑山庄',
        time: '2021-06-04'
      }, {
        id: 1,
        project: '承德避暑山庄',
        time: '2021-06-04'
      }],
      pages: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      mode: 1,
      addVisible: false,
      addForm: {},
      fileList: [
        { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
      ],
      upVisible: false,
      commentForm: {},
      isSubmit: false
    }
  },
  mounted() {
    // this.query()
  },
  methods: {
    query() {
      // const query = { ...this.page, ...this.form }
    },
    handlePageChange({ pageNum, pageSize, sorter: { prop, order }}) {
      console.log('aa')
    },
    edit(row) {
      this.mode = 2
      this.addVisible = true
    },
    del(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    add() {
      this.mode = 1
      this.addVisible = true
    },
    // 文件上传
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  }
}
</script>

<style scoped lang="scss">
.svg-class{
  cursor: pointer;
}
.inputWith {
  width: 230px;
}
</style>
