<template>
  <div class="bgfff out_wrap">
    <div class="flex_between1">
      <el-form :inline="true" :model="form" size="small" label-suffix=":">
        <el-form-item label="用户">
          <el-input v-model="form.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.company_name" placeholder="请输入" />
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
      :page-num="pages.page"
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
      width="400px"
    >
      <el-form ref="ruleForm" :model="groupOne" :rules="rules" class="demo-ruleForm" label-width="120px">
        <el-form-item label="用户姓名：" prop="name">
          <el-input v-model="groupOne.name" placeholder="请输入员工姓名" class="w100" clearable />
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-input v-model="groupOne.phone" placeholder="请输入员工手机号" class="w100" maxlength="11" clearable :disabled="mode == 2" />
        </el-form-item>
        <el-form-item label="权限角色：" prop="role_id">
          <el-select v-model="groupOne.role_id" placeholder="请选择权限角色" class="w100" clearable filterable>
            <el-option v-for="(item) in optionArr" :key="item.role_id" :label="item.role_name" :value="item.role_id" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="mode == 1" label="默认登录密码：">
          <el-input placeholder="默认登录密码" class="w100" disabled value="111111" />
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
        name: '',
        phone: '',
        role_id: ''
      },
      dialogVisible: false,
      rules: {
        name: [{ required: true, message: '请输入员工姓名', trigger: 'change' }],
        phone: [{ required: true, validator: validateAccount, trigger: 'change' }],
        role_id: [{ required: true, message: '请选择权限角色', trigger: 'change' }]
      },
      optionArr: [],
      form: {
        company_name: ''
      },
      column: user,
      tableList: [{
        name: '左千',
        phone: '181568312978',
        role: '超级管理员',
        create_time: '2021-06-04'
      }, {
        name: '刘亚',
        phone: '181568312978',
        role: '普通管理员',
        create_time: '2021-06-04'
      }],
      pages: {
        page: 1,
        pageSize: 10,
        total: 0
      }
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
      this.dialogVisible = true
    },
    del(row) {},
    add() {
      this.dialogVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false
          console.log('验证通过')
        }
      })
    }
  }
}
</script>

<style>

</style>
