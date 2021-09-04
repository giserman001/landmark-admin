<template>
  <div class="bgfff out_wrap">
    <div class="flex_between1">
      <el-form :inline="true" :model="form" size="small" label-suffix=":">
        <el-form-item label="名称">
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
      :page-num="pages.pageNum"
      @change="handlePageChange"
    >
      <!-- 方案文本 -->
      <template
        slot="ebookName"
        slot-scope="{ row }"
      >
        <a class="active_color ellipsis" style="width:100%;" @click="ebookDownLoad(row)">下载</a>
      </template>
      <!-- 方案预算 -->
      <template
        slot="budgetName"
        slot-scope="{ row }"
      >
        <a class="active_color ellipsis" style="width:100%;" @click="budgetDownLoad(row)">下载</a>
      </template>
      <!-- 国宝单位档案 -->
      <template
        slot="recordName"
        slot-scope="{ row }"
      >
        <a class="active_color ellipsis" style="width:100%;" :title="row.recordName" @click="downLoad(row.recordName, row.record)">{{ row.recordName || '-' }}</a>
      </template>
      <!-- 单体建筑信息 -->
      <template
        slot="singleArchitectureInfo"
        slot-scope="{ row }"
      >
        <!-- <svg-icon icon-class="share" class-name="svg-class" @click="goDetail(row)" /> -->
        <a class="active_color" @click="goDetail(row)">查看</a>
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
    <el-dialog :title="`${mode === 1 ? '新增' : '编辑'}项目信息`" :visible.sync="formVisible" width="800px" center>
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
            <el-form-item label="总建筑面积(㎡)" prop="architectureArea">
              <el-input v-model="addForm.architectureArea" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="占地总面积(㎡)" prop="area">
              <el-input v-model="addForm.area" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="业主单位" prop="ownerId">
              <el-select v-model="addForm.ownerId" filterable style="width:253px;" placeholder="请选择">
                <el-option
                  v-for="item in ownerArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
              <!-- <el-button class="ml10" type="primary" icon="el-icon-plus" @click="addOwner">业主单位</el-button> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目实施单位" prop="projectExecuteCom">
              <el-select v-model="addForm.projectExecuteCom" filterable style="width:253px;" placeholder="请选择">
                <el-option
                  v-for="item in projectExecuteComArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
              <!-- <el-button class="ml10" type="primary" icon="el-icon-plus" @click="addExecute">实施单位</el-button> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="批准总经费(万)" prop="expenditure">
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
            <el-form-item prop="ebook">
              <div slot="label">
                <Tips content="格式：doc,docx,pdf " />方案文本
              </div>
              <upload v-model="addForm.ebook" :type="['.doc', '.docx', '.pdf']" :is-tips="false" :limit="4" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="方案预算" prop="budget">
              <div slot="label">
                <Tips content="格式：xlsx,xls,pdf " />方案预算
              </div>
              <upload v-model="addForm.budget" :type="['.xlsx', 'xls', '.pdf']" :is-tips="false" :limit="4" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="国保单位档案" prop="record">
              <div slot="label">
                <Tips content="格式：doc,docx,pdf " />国保单位档案
              </div>
              <upload v-model="addForm.record" :type="['.doc', '.docx', '.pdf']" :is-tips="false" :multiple="false" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <div slot="label">
                <Tips content="项目简介，建议200字左右。" />说明
              </div>
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
      <el-dialog
        width="640px"
        title="新增业主单位"
        :visible.sync="innerVisible1"
        append-to-body
        center
      >
        <el-form ref="ownerform" :model="ownerform" class="ownerform" :rules="ownerformRules" label-suffix=":" label-position="right" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称" prop="name">
                <el-input v-model="ownerform.name" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="在编人员数量" prop="staffNum">
                <el-input v-model="ownerform.staffNum" autocomplete="off" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="2020年度总经费" prop="expenditure2020">
                <el-input v-model="ownerform.expenditure2020" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="introduction">
                <div slot="label">
                  <Tips content="建议200字左右。" />单位简介
                </div>
                <el-input v-model="ownerform.introduction" autocomplete="off" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目实施单位遴选委托方式" prop="entrustType">
                <el-input v-model="ownerform.entrustType" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目实施经费拨付方式" prop="payType">
                <el-input v-model="ownerform.payType" autocomplete="off" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="ownerSubmit('ownerform')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog
        width="800px"
        title="新增实施单位"
        :visible.sync="innerVisible2"
        append-to-body
        center
      >
        <el-form ref="executeFrom" :model="executeFrom" class="executeFrom" :rules="executeFromRules" label-suffix=":" label-position="right" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称" prop="name">
                <el-input v-model="executeFrom.name" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="固定技术人员数量" prop="technologyStaffNum">
                <el-input v-model="executeFrom.technologyStaffNum" autocomplete="off" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="文保工程资质情况" prop="certificationRemark">
                <el-input v-model="executeFrom.certificationRemark" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="introduction">
                <div slot="label">
                  <Tips content="建议200字左右。" />单位简介
                </div>
                <el-input v-model="executeFrom.introduction" type="textarea" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目组成人员构成" prop="staffComposition">
                <el-checkbox-group v-model="executeFrom.staffComposition">
                  <el-checkbox label="1">文保设计师</el-checkbox>
                  <el-checkbox label="2">建筑师</el-checkbox>
                  <el-checkbox label="3">结构工程师</el-checkbox>
                  <el-checkbox label="4">建造师</el-checkbox>
                  <el-checkbox label="5">安全员</el-checkbox>
                  <el-checkbox label="6">木工</el-checkbox>
                  <el-checkbox label="7">瓦工</el-checkbox>
                  <el-checkbox label="8">油漆彩画工</el-checkbox>
                  <el-checkbox label="9">其他</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="executeSubmit('executeFrom')">确 定</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="downLoadDialog" width="500px" title="文件下载" center :before-close="handleClose">
      <div v-if="fileArr.length" class="downloadList">
        <div v-for="(item, index) in fileArr" :key="index" class="list flex_between">
          <span class="name flex1 ellipsis">{{ item.name }}</span><span class="active_color action" @click="downLoad(item.name, item.id)">下载</span>
        </div>
      </div>
      <div v-else class="center">暂无数据</div>
      <template #footer>
        <el-button @click="downLoadDialog = false">关 闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import ZfTable from '@/components/ZfTable/CoreTable'
import upload from '@/components/upload'
import column from './columns/list'
import Tips from '@/components/tips.vue'
import { getProjectList, getOwnerIdAndName, getExecuteIdAndName, saveProject, updateProject, deteleProjectById, saveOwner, saveExecute } from '@/api/common'
import downFile from '@/utils/downFile'
export default {
  name: 'List',
  components: {
    ZfTable,
    upload,
    Tips
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
      projectExecuteComArr: [],
      innerVisible1: false,
      innerVisible2: false,
      ownerform: {
        name: '', // 名称
        staffNum: '', // 在编人员数量
        expenditure2020: '', // 2020年度总经费
        introduction: '', // 单位简介
        principal: '',	// 项目责任人（职工id）
        entrustType: '', // 项目实施单位遴选委托方式
        payType:	'',	// 项目实施经费拨付方式
        contract: '' // 委托合同（文件id）
      },
      ownerformRules: {
        name: [
          { required: true, message: '请输入名字', trigger: 'blur' }
        ]
      },
      // 实施单位新增
      executeFrom: {
        name: '', // 名称
        technologyStaffNum: '', // 固定技术人员数量
        certificationRemark: '', //	文保工程资质情况
        introduction: '', // 单位简介
        principal: '', // 项目责任人（职工id）
        staffComposition: ['1'] // 项目组成人员构成
      },
      executeFromRules: {
        name: [
          { required: true, message: '请输入名字', trigger: 'blur' }
        ]
      },
      downLoadDialog: false,
      fileArr: [] // 文件下载列表
    }
  },
  mounted() {
    this.query()
    // 业主下拉框
    this.getOwner()
    // 实施单位下拉框
    this.getExecute()
  },
  methods: {
    handleClose(done) {
      this.fileArr = []
      done()
    },
    ebookDownLoad(row) {
      this.downLoadDialog = true
      this.fileArr = this.parseData(row.ebookName) || []
    },
    budgetDownLoad(row) {
      this.downLoadDialog = true
      this.fileArr = this.parseData(row.budgetName) || []
    },
    getOwner() {
      // 业主下拉框
      getOwnerIdAndName().then(res => {
        this.ownerArr = res.data.ownerIdAndName
      })
    },
    getExecute() {
      // 实施单位下拉框
      getExecuteIdAndName().then(res => {
        this.projectExecuteComArr = res.data.executeIdAndName
      })
    },
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
              ebook: this.addForm.ebook.map(item => item.id).join(',') || '', // 方案文本
              budget: this.addForm.budget.map(item => item.id).join(',') || '', // 方案预算
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
              ebook: this.addForm.ebook.map(item => item.id).join(',') || '', // 方案文本
              budget: this.addForm.budget.map(item => item.id).join(',') || '', // 方案预算
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
      this.addForm.ebook = this.parseData(row.ebookName) || [] // 方案文本
      this.addForm.budget = this.parseData(row.budgetName) || [] // 方案预算
      this.addForm.record = (row.recordName && row.record) ? [{ name: row.recordName, id: row.record }] : [] // 国宝单位档案
      this.addForm.introduction = row.introduction // 说明
      this.addForm.id = row.id
    },
    parseData(obj) {
      const arr = []
      for (const key in obj) {
        arr.push({
          name: obj[key],
          id: key
        })
      }
      return arr
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
        downFile(id)
        this.formVisible = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消下载'
        })
      })
    },
    // 文件下载通用方法
    downLoadFn(id) {
      downFile(id)
    },
    addOwner() {
      this.innerVisible1 = true
      this.ownerform.name = '' // 名称
      this.ownerform.staffNum = '' // 在编人员数量
      this.ownerform.expenditure2020 = '' // 2020年度总经费
      this.ownerform.introduction = '' // 单位简介
      this.ownerform.principal = ''	// 项目责任人（职工id）
      this.ownerform.entrustType = '' // 项目实施单位遴选委托方式
      this.ownerform.payType =	''	// 项目实施经费拨付方式
      this.ownerform.contract = '' // 委托合同（文件id）
    },
    ownerSubmit(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          const res = await saveOwner(this.ownerform)
          if (res.code === 0) {
            this.innerVisible1 = false
            this.$message.success('新增业主单位成功!')
            // 更新业主下拉框
            this.getOwner()
          }
        }
      })
    },
    addExecute() {
      this.innerVisible2 = true
      this.executeFrom.name = '' // 名称
      this.executeFrom.technologyStaffNum = '' // 固定技术人员数量
      this.executeFrom.certificationRemark = '' // 文保工程资质情况
      this.executeFrom.introduction = '' // 单位简介
      this.executeFrom.staffComposition = ['1'] // 项目组成人员构成
    },
    executeSubmit(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          const res = await saveExecute({ ...this.executeFrom, staffComposition: this.executeFrom.staffComposition.join(',') })
          if (res.code === 0) {
            this.innerVisible2 = false
            this.$message.success('新增实施单位成功!')
            // 更新实施单位下拉框
            this.getExecute()
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-class{
  cursor: pointer;
}
::v-deep{
  .ownerform, .executeFrom {
    .el-form-item--medium .el-form-item__content, .el-form-item--medium .el-form-item__label{
      line-height: 20px;
    }
  }
}
.downloadList{
  .list{
    margin-bottom: 15px;
    .name{
      margin-right: 20px;
    }
    .action{
      width: 30px;
      cursor: pointer;
    }
  }
}

</style>
