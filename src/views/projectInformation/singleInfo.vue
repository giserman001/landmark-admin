<template>
  <div class="bgfff out_wrap">
    <div class="flex_between1">
      <el-form :inline="true" :model="form" size="small" label-suffix=":">
        <el-form-item label="单体名称">
          <el-input v-model="form.name" placeholder="请输入" @change="query" />
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
      </div>
    </div>
    <zf-table
      :columns="column"
      :data-source="tableList"
      :total="pages.total"
      :page-size="pages.pageSize"
      :page-num="pages.page"
      @change="handlePageChange"
    >
      <!-- 单体建筑信息 -->
      <template
        slot="singleArchitectureInfo"
        slot-scope="{ row }"
      >
        <svg-icon icon-class="share" class-name="svg-class" @click="goDetail(row)" />
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
    <el-dialog :title="`${mode === 1 ? '新增' : '编辑'}项目信息`" :visible.sync="formVisible" width="650px" center>
      <el-form :model="addForm" label-suffix=":" label-position="right" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="单体编号">
              <el-input v-model="addForm.no" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单体名称">
              <el-input v-model="addForm.name" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="建设年代">
              <el-input v-model="addForm.startYear" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="建筑面积">
              <el-input v-model="addForm.approveMoney" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="历史沿革">
              <el-input v-model="addForm.history" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="历次修缮情况">
              <el-input v-model="addForm.historyRepair" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="价值评估结论">
              <el-input v-model="addForm.value" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="测绘图">
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
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="周边环境">
              <el-upload
                ref="upload"
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
                <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
                <div slot="tip" class="el-upload__tip" style="line-height:20px;">只能上传jpg/png文件，且不超过5M</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" @click="formVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ZfTable from '@/components/ZfTable/CoreTable'
import column from './columns/singleInfo'
export default {
  name: 'SingleInfo',
  components: {
    ZfTable
  },
  data() {
    return {
      form: {
        name: ''
      },
      column,
      tableList: [{
        id: 1,
        name: '承德避暑山庄',
        startYear: '1990-09-10',
        area: '123',
        history: '手机号啥课',
        historyRepair: '经历三次重大修复',
        value: '古建筑具有重大意义',
        single: '由1,2,3构成',
        draw: '不知道该如何展示'
      }, {
        id: 2,
        name: '承德避暑山庄',
        startYear: '1990-09-10',
        area: '123',
        history: '手机号啥课',
        historyRepair: '经历三次重大修复',
        value: '古建筑具有重大意义',
        single: '由1,2,3构成',
        draw: '不知道该如何展示'
      }, {
        id: 3,
        name: '承德避暑山庄',
        startYear: '1990-09-10',
        area: '123',
        history: '手机号啥课',
        historyRepair: '经历三次重大修复',
        value: '古建筑具有重大意义',
        single: '由1,2,3构成',
        draw: '不知道该如何展示'
      }],
      pages: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      formVisible: false,
      mode: 1, // 默认新增模式
      addForm: {
        no: '',
        name: '',
        startYear: '',
        allArea: '',
        area: '',
        single: '',
        history: '',
        historyRepair: '',
        value: '',
        text: '', // 方案文本
        budget: '', // 方案预算
        record: '', // 国宝单位档案
        draw: ''
      },
      fileList: [
        { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
      ]
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
      this.formVisible = true
      this.mode = 2
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
      this.formVisible = true
      this.mode = 1
    },
    goDetail(row) {
      this.$router.push('/projectInformation/single-detail')
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

<style lang="scss" scoped>
.svg-class{
  cursor: pointer;
}
.col-item{
  span{
    display: inline-block;
    &:first-child{
      width: 172px;
      text-align: right;
      // text-align-last: justify;
      font-weight: bold;
    }
    &:last-child{
      color: #3a8ee6;
    }
  }
}
</style>
