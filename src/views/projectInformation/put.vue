<template>
  <div class="bgfff out_wrap">
    <div class="flex_between1">
      <el-form :inline="true" :model="form" size="small" label-suffix=":">
        <el-form-item label="实施单位名称">
          <el-input v-model="form.name" placeholder="请输入" />
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
      <!-- 操作 -->
      <template
        slot="action"
        slot-scope="{ row }"
      >
        <a class="active_color" @click="edit(row)">编辑</a>
        <a class="del ml20" @click="del(row)">删除</a>
      </template>
    </zf-table>
    <el-dialog :title="`${mode === 1 ? '新增' : '编辑'}实施信息`" :visible.sync="formVisible" width="60%" center>
      <el-form ref="addForm" :model="addForm" label-suffix=":" class="addFormcc" label-position="right" label-width="200px" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="实施单位名称" prop="name">
              <el-input v-model="addForm.name" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col v-if="mode == 2" :span="12">
            <el-form-item label="项目责任人" prop="principal">
              <el-select v-model="addForm.principal" filterable>
                <el-option v-for="(item, index) in staffArr" :key="index" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="单位简介" prop="introduction">
              <el-input v-model="addForm.introduction" autocomplete="off" type="textarea" :rows="3" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文保工程资质情况" prop="certificationRemark">
              <el-input v-model="addForm.certificationRemark" autocomplete="off" type="textarea" :rows="3" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="固定技术人员数量" prop="technologyStaffNum">
              <el-input v-model="addForm.technologyStaffNum" autocomplete="off" />
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
import column from './columns/put'
import { getExecuteList, saveExecute, updateExecute, getListByTypeAndComId, deteleExecuteById } from '@/api/common'
export default {
  name: 'List',
  components: {
    ZfTable
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
        id: '', // 编辑时使用
        name: '', // 名称
        technologyStaffNum: '', // 固定技术人员数量
        certificationRemark: '', // 文保工程资质情况
        introduction: '', // 单位简介
        principal: '' // 项目责任人（职工id）
      },
      rules: {
        name: [
          { required: true, message: '请输入实施单位姓名', trigger: 'blur' }
        ]
      },
      staffArr: [] // 职工人员
    }
  },
  async mounted() {
    this.query()
  },
  methods: {
    async query() {
      const res = await getExecuteList({ ...this.form, ...this.pages })
      if (res.code === 0) {
        this.pages.total = res.data.executeList.total
        this.tableList = res.data.executeList.rows
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
            const res = await saveExecute(this.addForm)
            if (res.code === 0) {
              this.formVisible = false
              this.$message.success('新增实施单位成功!')
              this.query()
            }
          } else {
            const res = await updateExecute(this.addForm)
            if (res.code === 0) {
              this.formVisible = false
              this.$message.success('编辑实施单位成功!')
              this.query()
            }
          }
        }
      })
    },
    async edit(row) {
      this.formVisible = true
      this.mode = 2
      this.addForm.name = row.name // 名称
      this.addForm.technologyStaffNum = row.technologyStaffNum // 固定技术人员数量
      this.addForm.certificationRemark = row.certificationRemark // 文保工程资质情况
      this.addForm.introduction = row.introduction // 单位简介
      this.addForm.principal = row.principal // 项目责任人（职工id）
      this.addForm.id = row.id
      // 获取下拉框
      const info = await getListByTypeAndComId({ type: 2, comId: row.id })
      this.staffArr = info.data.list
    },
    del(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await deteleExecuteById({ executeId: row.id })
        if (res.code === 0) {
          this.$message.success('删除成功!')
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
      this.addForm.name = '' // 名称
      this.addForm.technologyStaffNum = '' // 固定技术人员数量
      this.addForm.certificationRemark = '' // 文保工程资质情况
      this.addForm.introduction = '' // 单位简介
      this.addForm.principal = '' // 项目责任人（职工id）
      this.addForm.id = ''
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
      width: 240px;
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
