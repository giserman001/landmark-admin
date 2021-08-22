<template>
  <div class="bgfff out_wrap">
    <div class="flex_between1">
      <el-form :inline="true" :model="form" size="small" label-suffix=":">
        <el-form-item label="业主单位名称">
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
    <el-dialog :title="`${mode === 1 ? '新增' : '编辑'}业主信息`" :visible.sync="formVisible" width="60%" center>
      <el-form ref="addForm" :model="addForm" label-suffix=":" class="addFormcc" label-position="right" label-width="200px" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="业主单位名称" prop="name">
              <el-input v-model="addForm.name" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col v-if="mode == 2" :span="12">
            <el-form-item label="项目责任人" prop="principal">
              <el-select v-model="addForm.principal">
                <el-option v-for="(item, index) in staffArr" :key="index" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="2020年度总经费(万)" prop="expenditure2020">
              <el-input v-model="addForm.expenditure2020" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="在编人员数量" prop="staffNum">
              <el-input v-model="addForm.staffNum" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目实施单位遴选委托方式" prop="entrustType">
              <el-input v-model="addForm.entrustType" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目实施经费拨付方式" prop="payType">
              <el-input v-model="addForm.payType" autocomplete="off" />
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
            <el-form-item prop="contract">
              <div slot="label">
                <Tips content="委托合同。格式：pdf,doc,docx" />委托合同
              </div>
              <upload v-model="addForm.contract" :limit="5" :type="['.doc', '.pdf', '.docx']" :multiple="true" :is-tips="false" />
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
import column from './columns/owner'
import Tips from '@/components/tips.vue'
import { getOwnerList, saveOwner, updateOwner, getListByTypeAndComId, deteleOwnerById, getFiles } from '@/api/common'
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
        id: '', // 编辑时使用
        name: '', // 名称
        staffNum: '', // 在编人员数量
        expenditure2020: '', // 2020年度总经费
        introduction: '', // 单位简介
        principal: '', // 项目责任人（职工id）
        entrustType: '', // 项目实施单位遴选委托方式
        payType: '', // 项目实施经费拨付方式
        contract: [] // 委托合同（文件id）
      },
      rules: {
        name: [
          { required: true, message: '请输入业主单位姓名', trigger: 'blur' }
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
      const res = await getOwnerList({ ...this.form, ...this.pages })
      if (res.code === 0) {
        this.pages.total = res.data.ownerList.total
        this.tableList = res.data.ownerList.rows
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
            const res = await saveOwner({ ...this.addForm, contract: this.addForm.contract.map(item => item.id).join(',') || '' })
            if (res.code === 0) {
              this.formVisible = false
              this.$message.success('新增业主单位成功!')
              this.query()
            }
          } else {
            const res = await updateOwner({ ...this.addForm, contract: this.addForm.contract.map(item => item.id).join(',') || '' })
            if (res.code === 0) {
              this.formVisible = false
              this.$message.success('编辑业主单位成功!')
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
      this.addForm.staffNum = row.staffNum // 在编人员数量
      this.addForm.expenditure2020 = row.expenditure2020 // 2020年度总经费
      this.addForm.introduction = row.introduction // 单位简介
      this.addForm.principal = row.principal // 项目责任人（职工id）
      this.addForm.entrustType = row.entrustType // 项目实施单位遴选委托方式
      this.addForm.payType = row.payType // 项目实施经费拨付方式
      this.addForm.contract = await this.getFilesFn(row.contract) // 委托合同（文件id）
      this.addForm.id = row.id
      // 获取下拉框
      const info = await getListByTypeAndComId({ type: 1, comId: row.id })
      this.staffArr = info.data.list
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
    del(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await deteleOwnerById({ ownerId: row.id })
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
      this.addForm.staffNum = '' // 在编人员数量
      this.addForm.expenditure2020 = '' // 2020年度总经费
      this.addForm.introduction = '' // 单位简介
      this.addForm.principal = '' // 项目责任人（职工id）
      this.addForm.entrustType = '' // 项目实施单位遴选委托方式
      this.addForm.payType = '' // 项目实施经费拨付方式
      this.addForm.contract = []// 委托合同（文件id）
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
