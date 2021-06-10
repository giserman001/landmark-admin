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
      <!-- 反馈栏 -->
      <template
        slot="feedback"
      >
        <a class="active_color" @click="feedVisible=true;isFeed=false">查看</a>
        <a class="active_color ml20" @click="feedVisible=true;isFeed=true">编辑</a>
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
    <el-dialog :visible.sync="feedVisible" width="450px" center>
      <div class="bold mb10">日报反馈内容:</div>
      <el-input
        v-if="isFeed"
        v-model="feed"
        type="textarea"
        :rows="6"
        placeholder="请输入内容"
      />
      <div v-else>日报反馈内容日报反馈内容日报反馈内容日报反馈内容日报反馈内容</div>
      <div v-if="isFeed" slot="footer" class="dialog-footer">
        <el-button @click="feedVisible = false">取 消</el-button>
        <el-button type="primary" @click="feedVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ZfTable from '@/components/ZfTable/CoreTable'
import { week } from './columns/list'
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
      column: week,
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
      fileList: [
        { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
      ],
      commentForm: {},
      upVisible: false,
      isSubmit: false,
      feedVisible: false,
      feed: '',
      isFeed: false
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
      this.$router.push('/workReport/addWeek?a=2')
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
      this.$router.push('/workReport/addWeek?a=1')
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

<style>
.svg-class{
  cursor: pointer;
}
.inputWith {
  width: 230px;
}
</style>
