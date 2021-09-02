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
      <!-- 报告 -->
      <template
        slot="fileIds"
        slot-scope="{ row }"
      >
        <a class="active_color" @click="view(row.fileIds)">查看&下载</a>
      </template>
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
    <el-dialog :title="`${mode === 1 ? '新增' : '编辑'}日报`" :visible.sync="addVisible" width="350px" center>
      <el-form ref="addDayReport" :model="addForm" label-suffix=":">
        <el-form-item label="项目">
          <el-select v-model="addForm.projectId" placeholder="请选择" class="inputWith" filterable :disabled="mode === 2">
            <el-option v-for="item in optionArr" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="日报上传">
          <upload v-model="addForm.fileIds" :limit="5" :type="['.doc', '.docx', '.pdf', '.xlsx', '.xls']" :multiple="true" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDayReport('addDayReport')">确 定</el-button>
      </div>
    </el-dialog>
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
      <div class="bold mb10">日报反馈内容:</div>
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
    <el-dialog title="查看" :visible.sync="dlfvisible" width="350px" center>
      <div class="files-warper">
        <template v-if="showFiles.length">
          <div v-for="(item, index) in showFiles" :key="index" class="file-item">
            <div class="name">{{ item.name }}</div>
            <div class="downLoad" @click="downLoad(item.id)">下载</div>
          </div>
        </template>
        <div v-else style="text-align:center;">暂无数据</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dlfvisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ZfTable from '@/components/ZfTable/CoreTable'
import upload from '@/components/upload'
import { day } from './columns/list'
import { getDayReportList, getProjectList, saveDayReport, updateDayReport, getFiles, deteleDayReportById } from '@/api/common'
export default {
  name: 'List',
  components: {
    ZfTable,
    upload
  },
  data() {
    return {
      form: {
        projectId: +this.$route.query.id || '',
        time: '',
        beginTime: '',
        endTime: ''
      },
      column: day,
      tableList: [],
      pages: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      addVisible: false,
      mode: 1,
      addForm: {
        id: '', // 日报id (用于编辑)
        projectId: '',
        fileIds: []
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
      isFeed: false,
      optionArr: [],
      dlfvisible: false,
      showFiles: []
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
      const res = await getDayReportList({ ...query, ...this.pages })
      if (res.code === 0) {
        this.pages.total = res.data.dayReportList.total
        this.tableList = res.data.dayReportList.rows
      }
    },
    handlePageChange({ pageNum, pageSize, sorter: { prop, order }}) {
      this.pages.pageNum = pageNum
      this.pages.pageSize = pageSize
      this.query()
    },
    async edit(row) {
      this.mode = 2
      this.addVisible = true
      this.addForm.id = row.id
      this.addForm.projectId = row.projectId
      // 通过ids获取文件
      this.addForm.fileIds = await this.getFilesFn(row.fileIds)
    },
    del(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await deteleDayReportById({ dayReportId: row.id })
        if (res.code === 0) {
          this.$message.success('删除日报成功!')
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
      this.mode = 1
      this.addVisible = true
      this.addForm.id = []
      this.addForm.projectId = []
      // 通过ids获取文件
      this.addForm.fileIds = []
    },
    addDayReport(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          if (this.mode === 1) {
            const res = await saveDayReport({
              ...this.addForm,
              fileIds: this.addForm.fileIds.map(item => item.id).join(',') || '' // 日报
            })
            if (res.code === 0) {
              this.addVisible = false
              this.$message.success('新增日报成功!')
              this.query()
            }
          } else {
            const res = await updateDayReport({
              ...this.addForm,
              fileIds: this.addForm.fileIds.map(item => item.id).join(',') || '' // 日报
            })
            if (res.code === 0) {
              this.addVisible = false
              this.$message.success('编辑日报成功!')
              this.query()
            }
          }
        }
      })
    },
    getFilesFn(ids) {
      return new Promise((resolve, reject) => {
        getFiles({ ids }).then(res => {
          let arr = []
          if (res.code === 0 && res.data) {
            arr = res.data.files.map(item => {
              return {
                name: item.name,
                id: item.id
              }
            })
          }
          resolve(arr)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    downLoad(id) {
      const link = document.createElement('a')
      link.href = `${process.env.VUE_APP_BASE_API}/file/download?id=${id}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    async view(ids) {
      this.dlfvisible = true
      this.showFiles = []
      this.showFiles = await this.getFilesFn(ids)
    },
    feedBackView(row) {
      this.feedVisible = true
      this.isFeed = false
      this.feedback = row.feedback
      // this.addForm.id = row.id
    },
    feedBackEdit(row) {
      this.feedVisible = true
      this.isFeed = true
      this.feedback = row.feedback
      this.addForm.id = row.id
      this.addForm.fileIds = row.fileIds
    },
    async feedBackSubmit() {
      if (!this.feedback) {
        this.$message.error('请填写反馈兰内容')
        return
      }
      const res = await updateDayReport({
        id: this.addForm.id,
        fileIds: this.addForm.fileIds,
        feedback: this.feedback
      })
      if (res.code === 0) {
        this.feedVisible = false
        this.$message.success('编辑成功!')
        this.query()
      }
    },
    upView(row) {
      this.upVisible = true
      this.isSubmit = false
      this.commentForm.suggest1 = row.suggest1
      this.commentForm.suggest2 = row.suggest2
      this.commentForm.suggest3 = row.suggest3
      this.commentForm.suggest4 = row.suggest4
      // this.addForm.id = row.id
    },
    upEdit(row) {
      this.upVisible = true
      this.isSubmit = true
      this.commentForm.suggest1 = row.suggest1
      this.commentForm.suggest2 = row.suggest2
      this.commentForm.suggest3 = row.suggest3
      this.commentForm.suggest4 = row.suggest4
      this.addForm.id = row.id
      this.addForm.fileIds = row.fileIds
    },
    async commentSubmit() {
      if (!(this.commentForm.suggest1 || this.commentForm.suggest2 || this.commentForm.suggest3 || this.commentForm.suggest4)) {
        this.$message.error('至少填写一项意见')
        return
      }
      const res = await updateDayReport({
        id: this.addForm.id,
        fileIds: this.addForm.fileIds,
        ...this.commentForm
      })
      if (res.code === 0) {
        this.upVisible = false
        this.$message.success('编辑成功!')
        this.query()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-class{
  cursor: pointer;
}
.inputWith {
  width: 230px;
}
.files-warper{
  .file-item{
    display: flex;
    margin-bottom: 10px;
    &:last-child{
      margin-bottom: 0;
    }
    .name{
      flex: 2;
    }
    .downLoad{
      flex: 1;
      text-align: right;
      color: red;
      cursor: pointer;
    }
  }
}
</style>
