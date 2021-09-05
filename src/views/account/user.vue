<template>
  <div class="bgfff out_wrap">
    <div class="flex_between1">
      <el-form :inline="true" :model="form" size="small" label-suffix=":">
        <el-form-item label="用户名">
          <el-input v-model="form.userName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.mobile" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" icon="el-icon-plus" @click="add">新增用户</el-button>
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
    <el-dialog
      :title="mode == 1 ? '新建员工' : '编辑员工'"
      :visible.sync="dialogVisible"
      center
      width="400px"
    >
      <el-form ref="ruleForm" :model="groupOne" :rules="rules" class="demo-ruleForm" label-width="120px">
        <el-form-item label="用户姓名：" prop="userName">
          <el-input v-model="groupOne.userName" placeholder="请输入员工姓名" class="w100" clearable />
        </el-form-item>
        <el-form-item label="手机号：" prop="mobile">
          <el-input v-model="groupOne.mobile" placeholder="请输入员工手机号" class="w100" maxlength="11" clearable />
        </el-form-item>
        <el-form-item label="权限角色：" prop="roleId">
          <el-select v-model="groupOne.roleId" placeholder="请选择权限角色" class="w100" clearable filterable>
            <el-option v-for="item in optionArr" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="mode === 1" label="登录密码：" prop="password">
          <el-input v-model="groupOne.password" placeholder="登录密码" class="w100" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ZfTable from '@/components/ZfTable/CoreTable'
import { user } from './columns/list'
import { getUserList, getRoleList, saveUser, updataUserById, deteleUserById } from '@/api/common'
export default {
  name: 'List',
  components: {
    ZfTable
  },
  data() {
    const validateAccount = (rule, value, callback) => {
      if (value !== '' && value !== undefined) {
        if (!/^1[3456789]\d{9}$/.test(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请输入手机号'))
      }
    }
    return {
      mode: 1,
      groupOne: {
        userName: '',
        mobile: '',
        roleId: '',
        password: '',
        userId: ''
      },
      dialogVisible: false,
      rules: {
        userName: [
          { required: true, message: '请输入员工姓名', trigger: 'change' },
          { min: 2, max: 15, message: '用户名长度在2到15个字符', trigger: 'blur' }
        ],
        mobile: [{ required: true, validator: validateAccount, trigger: 'change' }],
        roleId: [{ required: true, message: '请选择权限角色', trigger: 'change' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 2, max: 15, message: '密码长度在2到15个字符', trigger: 'blur' }
        ]
      },
      optionArr: [],
      form: {
        userName: '', // 用户名
        mobile: '' // 手机号
      },
      column: user,
      tableList: [],
      pages: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  mounted() {
    this.query()
    getRoleList({ pageNum: 1, pageSize: 999999 }).then(res => {
      this.optionArr = res.data.roleList.rows
    })
  },
  methods: {
    async query() {
      const res = await getUserList({ ...this.form, ...this.pages })
      if (res.code === 0) {
        this.pages.total = res.data.userList.total
        this.tableList = res.data.userList.rows
      }
    },
    handlePageChange({ pageNum, pageSize, sorter: { prop, order }}) {
      this.pages.pageNum = pageNum
      this.pages.pageSize = pageSize
      this.query()
    },
    edit(row) {
      this.mode = 2
      this.groupOne.userId = row.userId
      this.groupOne.userName = row.username
      this.groupOne.mobile = row.mobile
      this.groupOne.roleId = row.role
      this.dialogVisible = true
    },
    del(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await deteleUserById({ userId: row.userId })
        if (res.code === 0) {
          this.$message.success('删除用户成功!')
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
      // 重置
      this.groupOne.userId = ''
      this.groupOne.userName = ''
      this.groupOne.mobile = ''
      this.groupOne.roleId = ''
      this.groupOne.password = ''
      this.dialogVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          if (this.mode === 1) {
            const res = await saveUser(this.groupOne)
            if (res.code === 0) {
              this.dialogVisible = false
              this.$message.success('新增用户成功!')
              this.query()
            }
          } else {
            delete this.groupOne.password
            const res = await updataUserById(this.groupOne)
            if (res.code === 0) {
              this.dialogVisible = false
              this.$message.success('编辑用户成功!')
              this.query()
            }
          }
        }
      })
    }
  }
}
</script>

<style>

</style>
