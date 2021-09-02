<template>
  <div class="bgfff out_wrap">
    <div class="flex_between1">
      <el-form :inline="true" :model="form" size="small" label-suffix=":">
        <el-form-item label="项目">
          <el-select v-model="form.projectId" filterable placeholder="请选择" class="w100" @change="query">
            <el-option label="全部" value="" />
            <el-option v-for="item in optionArr" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker v-model="form.time" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" :editable="false" :value-format="'yyyy-MM-dd'" @change="query" />
        </el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form>
      <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <zf-table
      :columns="column"
      :data-source="tableList"
      :total="pages.total"
      :page-size="pages.pageSize"
      :page-num="pages.pageNum"
      @change="handlePageChange"
    >
      <!-- 反馈栏 -->
      <template
        slot="feedback"
        slot-scope="{ row }"
      >
        <a class="active_color" @click="feedBackView(row)">查看</a>
        <a class="active_color ml20" @click="feedBackEdit(row)">编辑</a>
      </template>
      <!-- 评估意见栏 -->
      <template
        slot="idea"
        slot-scope="{ row }"
      >
        <a class="active_color" @click="upView(row)">查看</a>
        <a class="active_color ml20" @click="upEdit(row)">编辑</a>
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
      <el-form ref="form" :model="commentForm" label-width="145px" label-suffix=":" :disabled="!isSubmit">
        <el-form-item label="评估组长意见">
          <el-input v-model="commentForm.suggest2" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item label="评估专家意见">
          <el-input v-model="commentForm.suggest3" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item label="评估小组成员意见">
          <el-input v-model="commentForm.suggest1" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item label="评估项目组综合意见">
          <el-input v-model="commentForm.suggest4" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <div v-if="isSubmit" slot="footer" class="dialog-footer">
        <el-button @click="upVisible = false">取 消</el-button>
        <el-button type="primary" @click="commentSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="feedVisible" width="450px" center>
      <div class="bold mb10">周报反馈内容:</div>
      <el-input
        v-model="feedback"
        :disabled="!isFeed"
        type="textarea"
        :rows="6"
        placeholder="请输入内容"
      />
      <div v-if="isFeed" slot="footer" class="dialog-footer">
        <el-button @click="feedVisible = false">取 消</el-button>
        <el-button type="primary" @click="feedBackSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ZfTable from '@/components/ZfTable/CoreTable'
import { week } from './columns/list'
import { getProjectList, getWeekReportList, deteleWeekReportById, updateWeekReport } from '@/api/common'
export default {
  name: 'List',
  components: {
    ZfTable
  },
  data() {
    return {
      form: {
        projectId: +this.$route.query.id || '',
        time: ''
      },
      column: week,
      optionArr: [],
      tableList: [],
      pages: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      commentForm: {
        suggest1: '',
        suggest2: '',
        suggest3: '',
        suggest4: ''
      },
      upVisible: false,
      isSubmit: false,
      feedVisible: false,
      feedback: '',
      isFeed: false
    }
  },
  mounted() {
    this.query()
    getProjectList({ pageNum: 1, pageSize: 9999 }).then(res => {
      this.optionArr = res.data.projectList.rows
    })
  },
  methods: {
    async query() {
      const query = {
        beginTime: '',
        endTime: '',
        projectId: ''
      }
      if (this.form.time && this.form.time.length) {
        query.beginTime = this.form.time[0]
        query.endTime = this.form.time[1]
      }
      query.projectId = this.form.projectId
      const res = await getWeekReportList({ ...query, ...this.pages })
      if (res.code === 0) {
        this.pages.total = res.data.weekReportList.total
        this.tableList = res.data.weekReportList.rows
      }
    },
    handlePageChange({ pageNum, pageSize, sorter: { prop, order }}) {
      this.pages.pageNum = pageNum
      this.pages.pageSize = pageSize
      this.query()
    },
    edit(row) {
      this.$router.push(`/workReport/addWeek?id=${row.id}`)
    },
    del(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await deteleWeekReportById({ weekReportId: row.id })
        if (res.code === 0) {
          this.$message.success('删除周报成功!')
          this.query()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    add() {
      this.$router.push('/workReport/addWeek')
    },
    upView(row) {
      this.upVisible = true
      this.isSubmit = false
      this.commentForm.suggest1 = row.suggest1
      this.commentForm.suggest2 = row.suggest2
      this.commentForm.suggest3 = row.suggest3
      this.commentForm.suggest4 = row.suggest4
    },
    upEdit(row) {
      this.upVisible = true
      this.isSubmit = true
      this.commentForm.suggest1 = row.suggest1
      this.commentForm.suggest2 = row.suggest2
      this.commentForm.suggest3 = row.suggest3
      this.commentForm.suggest4 = row.suggest4
      this.form.id = row.id
    },
    async commentSubmit() {
      if (!(this.commentForm.suggest1 || this.commentForm.suggest2 || this.commentForm.suggest3 || this.commentForm.suggest4)) {
        this.$message.error('至少填写一项意见')
        return
      }
      const res = await updateWeekReport({
        id: this.form.id,
        ...this.commentForm
      })
      if (res.code === 0) {
        this.upVisible = false
        this.$message.success('编辑成功!')
        this.query()
      }
    },
    feedBackView(row) {
      this.feedVisible = true
      this.isFeed = false
      this.feedback = row.feedback
      // this.form.id = row.id
    },
    feedBackEdit(row) {
      this.feedVisible = true
      this.isFeed = true
      this.feedback = row.feedback
      this.form.id = row.id
    },
    async feedBackSubmit() {
      if (!this.feedback) {
        this.$message.error('请填写反馈兰内容')
        return
      }
      const res = await updateWeekReport({
        id: this.form.id,
        feedback: this.feedback
      })
      if (res.code === 0) {
        this.feedVisible = false
        this.$message.success('编辑成功!')
        this.query()
      }
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
