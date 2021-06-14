<template>
  <div class="bgfff out_wrap">
    <div class="flex_between1">
      <el-form :inline="true" :model="form" size="small" label-suffix=":">
        <el-form-item label="角色名称">
          <el-input v-model="form.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" icon="el-icon-plus" @click="add">新增角色</el-button>
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
        <a class="active_color ml20" @click="auth(row)">权限配置</a>
        <a class="del ml20" @click="del(row)">删除</a>
      </template>
    </zf-table>
    <el-dialog :title="mode == 1 ? '新增角色' : '编辑角色'" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" :model="roleOne" :rules="rules" class="demo-ruleForm" label-width="100px">
        <el-form-item label="角色名称：" prop="name">
          <el-input v-model="roleOne.name" placeholder="请输入角色名称" class="w100" clearable />
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="roleOne.remark" type="textarea" :rows="6" placeholder="请输入角色描述" :resize="'vertical'" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="权限配置" :visible.sync="authVisible">
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="item in authArr" :key="item.code" :label="item.code">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="authVisible = false">取消</el-button>
        <el-button type="primary" @click="authForm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ZfTable from '@/components/ZfTable/CoreTable'
import { role } from './columns/list'
import { getRoleList, saveRole, updataRoleById, deteleRoleById, getAllPageAuth, getPageByRoleId, updateRolePageForRoleId } from '@/api/common'
export default {
  name: 'List',
  components: {
    ZfTable
  },
  data() {
    return {
      mode: 1,
      dialogFormVisible: false,
      roleOne: {
        name: '',
        remark: '',
        roleId: ''
      },
      rules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'change' }]
      },
      form: {
        name: ''
      },
      column: role,
      tableList: [],
      pages: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      authVisible: false,
      // 多选框之间的状态
      authArr: [],
      checkAll: false,
      checkedCities: [],
      isIndeterminate: false
    }
  },
  mounted() {
    this.query()
    getAllPageAuth().then(res => {
      this.authArr = res.data.pageList
    })
  },
  methods: {
    async query() {
      const res = await getRoleList({ ...this.form, ...this.pages })
      if (res.code === 0) {
        this.pages.total = res.data.roleList.total
        this.tableList = res.data.roleList.rows
      }
    },
    handlePageChange({ pageNum, pageSize, sorter: { prop, order }}) {
      this.pages.pageNum = pageNum
      this.pages.pageSize = pageSize
      this.query()
    },
    edit(row) {
      this.mode = 2
      this.roleOne.name = row.name
      this.roleOne.remark = row.remark
      this.roleOne.roleId = row.id
      this.dialogFormVisible = true
    },
    del(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await deteleRoleById({ userId: row.userId })
        if (res.code === 0) {
          this.$message.success('删除角色成功!')
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
      this.roleOne.name = ''
      this.roleOne.remark = ''
      this.roleOne.roleId = ''
      this.mode = 1
      this.dialogFormVisible = true
    },
    async auth(row) {
      this.authVisible = true
      // 重置
      this.checkAll = false
      this.checkedCities = []
      this.isIndeterminate = false
      this.roleOne.roleId = row.id
      const res = await getPageByRoleId({ roleId: row.id })
      if (res.code === 0) {
        if (res.data) {
          this.checkedCities = res.data.codes
          const len = res.data.codes.length
          this.checkAll = len === this.authArr.length
          this.isIndeterminate = len > 0 && len < this.authArr.length
        }
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          if (this.mode === 1) {
            const res = await saveRole(this.roleOne)
            if (res.code === 0) {
              this.dialogFormVisible = false
              this.$message.success('新增角色成功!')
              this.query()
            }
          } else {
            const res = await updataRoleById(this.roleOne)
            if (res.code === 0) {
              this.dialogFormVisible = false
              this.$message.success('编辑角色成功!')
              this.query()
            }
          }
        }
      })
    },
    async authForm() {
      const ids = []
      this.authArr.forEach(item => {
        if (this.checkedCities.includes(item.code)) {
          ids.push(item.id)
        }
      })
      if (!ids.length) {
        this.$message.error('必选一项')
        return
      }
      const res = await updateRolePageForRoleId({ roleId: this.roleOne.roleId, pages: ids.join(',') })
      if (res.code === 0) {
        this.$message.success('权限编辑成功')
        this.authVisible = false
      }
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.authArr.map(item => item.code) : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.authArr.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.authArr.length
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep{
  .el-checkbox{
    margin-top: 10px;
  }
}
</style>
