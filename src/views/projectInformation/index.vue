<template>
  <div class="bgfff out_wrap">
    <div class="flex_between1">
      <el-form :inline="true" :model="form" size="small" label-suffix=":">
        <el-form-item label="名称">
          <el-input v-model="form.name" placeholder="请输入" @change="query" />
        </el-form-item>
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
      <!-- 方案文本 -->
      <template
        slot="ebookName"
        slot-scope="{ row }"
      >
        <a class="active_color" @click="downLoad(row.ebookName, row.ebook)">{{ row.ebookName || '-' }}</a>
      </template>
      <!-- 方案预算 -->
      <template
        slot="budgetName"
        slot-scope="{ row }"
      >
        <a class="active_color" @click="downLoad(row.budgetName, row.budget)">{{ row.budgetName || '-' }}</a>
      </template>
      <!-- 国宝单位档案 -->
      <template
        slot="recordName"
        slot-scope="{ row }"
      >
        <a class="active_color" @click="downLoad(row.recordName, row.record)">{{ row.recordName || '-' }}</a>
      </template>
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
    <el-dialog :title="`${mode === 1 ? '新增' : '编辑'}项目信息`" :visible.sync="formVisible" width="700px" center>
      <el-form ref="addForm" :model="addForm" label-suffix=":" label-position="right" label-width="120px" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-input v-model="addForm.name" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="子项构成" prop="sonName">
              <el-input v-model="addForm.sonName" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="总建筑面积" prop="architectureArea">
              <el-input v-model="addForm.architectureArea" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="占地总面积" prop="area">
              <el-input v-model="addForm.area" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="业主单位" prop="ownerId">
              <el-select v-model="addForm.ownerId" placeholder="请选择">
                <el-option
                  v-for="item in ownerArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目实施单位" prop="projectExecuteCom">
              <el-select v-model="addForm.projectExecuteCom" placeholder="请选择">
                <el-option
                  v-for="item in projectExecuteComArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="批准总经费" prop="expenditure">
              <el-input v-model="addForm.expenditure" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="方案制编单位" prop="projectCompileCom">
              <el-input v-model="addForm.projectCompileCom" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="方案文本" prop="ebook">
              <upload v-model="addForm.ebook" :type="['.doc', '.docx', '.pdf']" :multiple="false" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="方案预算" prop="budget">
              <upload v-model="addForm.budget" :type="['.xlsx', 'xls', '.pdf']" :multiple="false" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="国宝单位档案" prop="record">
              <upload v-model="addForm.record" :type="['.doc', '.docx', '.pdf']" :multiple="false" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="说明">
              <el-input
                v-model="addForm.introduction"
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ZfTable from '@/components/ZfTable/CoreTable'
import upload from '@/components/upload'
import column from './columns/list'
import { getProjectList, getOwnerIdAndName, getExecuteIdAndName, saveProject, updateProject, deteleProjectById } from '@/api/common'
export default {
  name: 'List',
  components: {
    ZfTable,
    upload
  },
  data() {
    return {
      form: {
        name: ''
      },
      column,
      tableList: [],
      pages: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      formVisible: false,
      mode: 1, // 默认新增模式
      addForm: {
        id: '',
        name: '',
        sonName: '', // 子项构成
        architectureArea: '', // 总建筑面积
        area: '', // 占地面积
        ownerId: '', // 业主
        projectExecuteCom: '', // 项目实施单位
        expenditure: '', // 批准总经费
        projectCompileCom: '', // 方案编制单位名称
        ebook: [], // 方案文本
        budget: [], // 方案预算
        record: [], // 国宝单位档案
        introduction: '' // 说明
      },
      rules: {
        name: [
          { required: true, message: '请输入项目名字', trigger: 'blur' }
        ]
      },
      ownerArr: [],
      projectExecuteComArr: []
    }
  },
  mounted() {
    this.query()
    // 业主下拉框
    getOwnerIdAndName().then(res => {
      this.ownerArr = res.data.ownerIdAndName
    })
    // 实施单位下拉框
    getExecuteIdAndName().then(res => {
      this.projectExecuteComArr = res.data.executeIdAndName
    })
  },
  methods: {
    async query() {
      const res = await getProjectList({ ...this.form, ...this.pages })
      if (res.code === 0) {
        this.pages.total = res.data.projectList.total
        this.tableList = res.data.projectList.rows
      }
    },
    handlePageChange({ pageNum, pageSize, sorter: { prop, order }}) {
      this.pages.pageNum = pageNum
      this.pages.pageSize = pageSize
      this.query()
    },
    handleSubmit(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          if (this.mode === 1) {
            const res = await saveProject({
              ...this.addForm,
              ebook: (this.addForm.ebook.length && this.addForm.ebook[0].id) || '', // 方案文本
              budget: (this.addForm.budget.length && this.addForm.budget[0].id) || '', // 方案预算
              record: (this.addForm.record.length && this.addForm.record[0].id) || '' // 国宝单位档案
            })
            if (res.code === 0) {
              this.formVisible = false
              this.$message.success('新增项目成功!')
              this.query()
            }
          } else {
            const res = await updateProject({
              ...this.addForm,
              ebook: (this.addForm.ebook.length && this.addForm.ebook[0].id) || '', // 方案文本
              budget: (this.addForm.budget.length && this.addForm.budget[0].id) || '', // 方案预算
              record: (this.addForm.record.length && this.addForm.record[0].id) || '' // 国宝单位档案
            })
            if (res.code === 0) {
              this.formVisible = false
              this.$message.success('编辑项目成功!')
              this.query()
            }
          }
        }
      })
    },
    edit(row) {
      this.formVisible = true
      this.mode = 2
      this.addForm.name = row.name
      this.addForm.sonName = row.sonName // 子项构成
      this.addForm.architectureArea = row.architectureArea // 总建筑面积
      this.addForm.area = row.area // 占地面积
      this.addForm.ownerId = row.ownerId // 业主
      this.addForm.projectExecuteCom = row.projectExecuteCom // 项目实施单位
      this.addForm.expenditure = row.expenditure // 批准总经费
      this.addForm.projectCompileCom = row.projectCompileCom // 方案编制单位名称
      this.addForm.ebook = (row.ebookName && row.ebook) ? [{ name: row.ebookName, id: row.ebook }] : [] // 方案文本
      this.addForm.budget = (row.budgetName && row.budget) ? [{ name: row.budgetName, id: row.budget }] : [] // 方案预算
      this.addForm.record = (row.recordName && row.record) ? [{ name: row.recordName, id: row.record }] : [] // 国宝单位档案
      this.addForm.introduction = row.introduction // 说明
      this.addForm.id = row.id
    },
    del(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await deteleProjectById({ projectId: row.id })
        if (res.code === 0) {
          this.$message.success('删除项目成功!')
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
      this.formVisible = true
      this.mode = 1
      // 重置
      this.addForm.name = ''
      this.addForm.sonName = '' // 子项构成
      this.addForm.architectureArea = '' // 总建筑面积
      this.addForm.area = '' // 占地面积
      this.addForm.ownerId = '' // 业主
      this.addForm.projectExecuteCom = '' // 项目实施单位
      this.addForm.expenditure = '' // 批准总经费
      this.addForm.projectCompileCom = '' // 方案编制单位名称
      this.addForm.ebook = [] // 方案文本
      this.addForm.budget = [] // 方案预算
      this.addForm.record = [] // 国宝单位档案
      this.addForm.introduction = '' // 说明
      this.addForm.id = '' // 项目id
    },
    goDetail(row) {
      this.$router.push(`/projectInformation/project-detail?id=${row.id}&ownerId=${row.ownerId}&projectExecuteCom=${row.projectExecuteCom}`)
    },
    // 下载
    downLoad(name, id) {
      if (!(name && id)) return
      this.$confirm(`即将下载 <span style='color:#3a8ee6;'>${name}</span>, 是否继续?`, '提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 下载
        const link = document.createElement('a')
        link.href = `${process.env.VUE_APP_BASE_API}/file/download?id=${id}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        this.formVisible = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消下载'
        })
      })
    }
  }
}
</script>

<style>
.svg-class{
  cursor: pointer;
}
</style>
