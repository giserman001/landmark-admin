<template>
  <div class="bgfff out_wrap">
    <div class="flex_between1">
      <el-form :inline="true" :model="form" size="small" label-suffix=":">
        <el-form-item label="职工名称">
          <el-input v-model="form.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="所属项目">
          <el-select v-model="form.projectId" filterable placeholder="请选择">
            <el-option label="全部" value="" />
            <el-option v-for="item in projectArr" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="所属类型">
          <el-select v-model="form.type" filterable placeholder="请选择" @change="(val) => changeType(val, 1)">
            <el-option label="全部" value="" />
            <el-option label="业主单位" :value="1" />
            <el-option label="实施单位" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="单位">
          <el-select v-model="form.id" filterable placeholder="请选择">
            <el-option
              v-for="item in option"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
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
      <!-- 年龄 -->
      <template
        slot="age"
        slot-scope="{ row }"
      >
        <span v-if="row.age">{{ row.age }}岁</span>
        <span v-else>暂无</span>
      </template>
      <!-- 性别 -->
      <template
        slot="sex"
        slot-scope="{ row }"
      >
        {{ row.sex? '男' : '女' }}
      </template>
      <!-- 所属类型 -->
      <template
        slot="type"
        slot-scope="{ row }"
      >
        {{ row.type === 1 ? '业主单位' : '实施单位' }}
      </template>
      <!-- 职称 -->
      <template
        slot="professional"
        slot-scope="{ row }"
      >
        {{ returnFn(row.professional) }}
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
    <el-dialog :title="`${mode === 1 ? '新增' : '编辑'}职工信息`" :visible.sync="formVisible" width="1050px" center>
      <el-form ref="addForm" :model="addForm" label-suffix=":" class="addFormcc" label-position="right" label-width="120px" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属类型" prop="type">
              <el-select v-model="addForm.type" filterable placeholder="请选择" @change="(val) => changeType(val, 2)">
                <el-option label="业主单位" :value="1" />
                <el-option label="实施单位" :value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位" prop="executeId">
              <el-select v-model="addForm.executeId" filterable placeholder="请选择">
                <el-option
                  v-for="item in optionArr"
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
            <el-form-item label="职工姓名" prop="name">
              <el-input v-model="addForm.name" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="addForm.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="addForm.age" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职务" prop="post">
              <el-input v-model="addForm.post" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目组成员构成" prop="professional">
              <el-radio-group v-model="addForm.professional">
                <el-radio :label="1">文保设计师</el-radio>
                <el-radio :label="2">建筑师</el-radio>
                <el-radio :label="3">结构工程师</el-radio>
                <el-radio :label="4">建造师</el-radio>
                <el-radio :label="5">安全员</el-radio>
                <el-radio :label="6">木工</el-radio>
                <el-radio :label="7">瓦工</el-radio>
                <el-radio :label="8">油漆彩画工</el-radio>
                <el-radio :label="9">石匠</el-radio>
                <el-radio :label="10">铁匠</el-radio>
                <el-radio :label="11">园艺师</el-radio>
                <el-radio :label="12">其他</el-radio>
                <el-radio :label="12">水电工</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="专业资格证书" prop="certificate">
              <el-input v-model="addForm.certificate" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="专长" prop="speciality">
              <el-input v-model="addForm.speciality" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理分工" prop="manage">
              <el-input v-model="addForm.manage" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目内分工" prop="jop">
              <el-input v-model="addForm.jop" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工作时间" prop="workTime">
              <el-input v-model="addForm.workTime" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否临时" prop="isOfficial">
              <el-radio-group v-model="addForm.isOfficial">
                <el-radio :label="1">正式</el-radio>
                <el-radio :label="0">临时</el-radio>
              </el-radio-group>
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
// import upload from '@/components/upload'
import column from './columns/staff'
import { getStaffInfoList, getOwnerIdAndName, getExecuteIdAndName, saveStaffInfo, updateStaffInfo, deteleStaffInfoById, getProjectList } from '@/api/common'
export default {
  name: 'List',
  components: {
    ZfTable
  },
  data() {
    return {
      form: {
        name: '',
        projectId: '', // 所属项目
        type: '',
        id: ''
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
        id: this.$route.query.id || '', // 编辑时使用
        name: '', // 职工名称
        type: 1, // 所属类型
        executeId: '', // 所属单位
        sex: 1, // 性别
        age: '', // 年龄
        post: '', // 职务
        professional: 1, // 职称
        certificate: '', // 专业资格证书
        speciality: '', // 专长
        manage: '', // 管理分工
        jop: '', // 项目内分工
        workTime: '', // 工作时间
        isOfficial: 1 // 是否临时
      },
      rules: {
        type: [
          { required: true, message: '请选择所属单位类型', trigger: 'blur' }
        ],
        executeId: [
          { required: true, message: '请算则所属单位', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入职工姓名', trigger: 'blur' }
        ]
      },
      optionArr: [],
      option: [],
      projectArr: []
    }
  },
  watch: {
    'addForm.type': {
      async handler(val) {
        if (val === 1) {
          const res = await this.getOwner()
          this.optionArr = res.data.ownerIdAndName
        } else {
          const res = await this.getExecute()
          this.optionArr = res.data.executeIdAndName
        }
      },
      immediate: true
    },
    'form.type': {
      async handler(val) {
        if (val === 1) {
          const res = await this.getOwner()
          this.option = res.data.ownerIdAndName
        } else if (val === 2) {
          const res = await this.getExecute()
          this.option = res.data.executeIdAndName
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.query()
    getProjectList({ pageNum: 1, pageSize: 9999 }).then(res => {
      this.projectArr = res.data.projectList.rows
    })
  },
  methods: {
    async changeType(val, i) {
      if (i === 1) {
        this.form.id = ''
        if (val === 1) {
          const res = await this.getOwner()
          this.option = res.data.ownerIdAndName
        } else if (val === 2) {
          const res = await this.getExecute()
          this.option = res.data.executeIdAndName
        }
      } else {
        this.addForm.executeId = ''
        if (val === 1) {
          const res = await this.getOwner()
          this.optionArr = res.data.ownerIdAndName
        } else {
          const res = await this.getExecute()
          this.optionArr = res.data.executeIdAndName
        }
      }
    },
    async getOwner() {
      // 业主下拉框
      return await getOwnerIdAndName()
    },
    async getExecute() {
      // 实施单位下拉框
      return await getExecuteIdAndName()
    },
    async query() {
      const res = await getStaffInfoList({ ...this.form, ...this.pages })
      if (res.code === 0) {
        this.pages.total = res.data.staffInfoList.total
        this.tableList = res.data.staffInfoList.rows
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
          console.log(this.addForm, 'this.addForm')
          if (this.mode === 1) {
            const res = await saveStaffInfo(this.addForm)
            if (res.code === 0) {
              this.formVisible = false
              this.$message.success('新增职工成功!')
              this.query()
            }
          } else {
            const res = await updateStaffInfo(this.addForm)
            if (res.code === 0) {
              this.formVisible = false
              this.$message.success('编辑职工成功!')
              this.query()
            }
          }
        }
      })
    },
    edit(row) {
      this.formVisible = true
      this.mode = 2
      this.addForm.name = row.name // 职工名称
      this.addForm.type = row.type // 所属类型
      this.addForm.executeId = row.executeId // 所属单位
      this.addForm.sex = row.sex // 性别
      this.addForm.age = row.age // 年龄
      this.addForm.post = row.post // 职务
      this.addForm.professional = row.professional // 职称
      this.addForm.certificate = row.certificate // 专业资格证书
      this.addForm.speciality = row.speciality // 专长
      this.addForm.manage = row.manage // 管理分工
      this.addForm.jop = row.jop // 项目内分工
      this.addForm.workTime = row.workTime // 工作时间
      this.addForm.isOfficial = +row.isOfficial // 是否临时
      this.addForm.id = row.id
    },
    del(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await deteleStaffInfoById({ staffInfoId: row.id })
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
      this.addForm.name = '' // 职工名称
      this.addForm.type = 1 // 所属类型
      this.addForm.executeId = '' // 所属单位
      this.addForm.sex = 1 // 性别
      this.addForm.age = '' // 年龄
      this.addForm.post = '' // 职务
      this.addForm.professional = 1 // 职称
      this.addForm.certificate = '' // 专业资格证书
      this.addForm.speciality = '' // 专长
      this.addForm.manage = '' // 管理分工
      this.addForm.jop = '' // 项目内分工
      this.addForm.workTime = '' // 工作时间
      this.addForm.isOfficial = 1 // 是否临时
    },
    returnFn(str) {
      switch (str) {
        case 1:
          return '文保设计师'
        case 2:
          return '建筑师'
        case 3:
          return '结构工程师'
        case 4:
          return '建造师'
        case 5:
          return '安全员'
        case 6:
          return '木工'
        case 7:
          return '瓦工'
        case 8:
          return '油漆彩画工'
        default:
          return '其他'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-class{
  cursor: pointer;
}
::v-deep{
    .addFormcc{
        .el-input__inner{
            width: 350px;
        }
        .el-radio__label{
          width: 80px;
          display: inline-block;
        }
        .el-radio{
          margin-bottom: 10px;
        }
    }

}
</style>
