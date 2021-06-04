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
      :page-num="pages.page"
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
        <el-form-item label="角色名称：" prop="role_name">
          <el-input v-model="roleOne.role_name" placeholder="请输入角色名称" class="w100" clearable />
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="roleOne.describe" type="textarea" :rows="3" placeholder="请输入角色描述" :resize="'vertical'" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="权限配置" :visible.sync="authVisible">
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        :default-expanded-keys="['02', '03']"
        :default-checked-keys="['0301', '0302']"
        :props="defaultProps"
      />
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
        role_name: '',
        describe: ''
      },
      rules: {
        role_name: [{ required: true, message: '请输入角色名称', trigger: 'change' }]
      },
      form: {
        company_name: ''
      },
      column: role,
      tableList: [{
        role: '超级管理员',
        des: '拥有所有菜单权限'
      }, {
        role: '普通管理员',
        des: '只有部分菜单权限'
      }],
      pages: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      authVisible: false,
      data: [{
        id: '0101',
        label: '项目信息'
      }, {
        id: '02',
        label: '工作汇报',
        children: [{
          id: '0201',
          label: '日报'
        }, {
          id: '0202',
          label: '周报'
        }, {
          id: '0203',
          label: '月报'
        }, {
          id: '0204',
          label: '季报'
        }, {
          id: '0205',
          label: '年报'
        }]
      }, {
        id: '03',
        label: '管理员',
        children: [{
          id: '0302',
          label: '用户'
        }, {
          id: '0301',
          label: '角色'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
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
      this.mode = 2
      this.dialogFormVisible = true
    },
    del(row) {},
    add() {
      this.mode = 1
      this.dialogFormVisible = true
    },
    auth() {
      this.authVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
        }
      })
    },
    authForm() {}
  }
}
</script>

<style>

</style>
