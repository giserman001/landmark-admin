<template>
  <div class="bgfff out_wrap">
    <el-form :inline="true" :model="form" size="small" label-suffix=":">
      <el-form-item label="客户名称">
        <el-input v-model="form.company_name" placeholder="客户名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
    <zf-table
      :columns="column"
      :data-source="tableList"
      :total="pages.total"
      :page-size="pages.pageSize"
      :page-num="pages.page"
      @change="handlePageChange"
    >
      <!-- 服务费率 -->
      <template
        slot="service_rate"
        slot-scope="{ row }"
      >
        <a class="active_color" @click="views(row)">查看</a>
      </template>
      <!-- 操作 -->
      <template
        slot="action"
        slot-scope="{ row }"
      >
        <a class="active_color" @click="nextDetail(row)">详情</a>
      </template>
    </zf-table>
  </div>
</template>

<script>
import ZfTable from '@/components/ZfTable/CoreTable'
import column from './columns/list'
export default {
  name: 'List',
  components: {
    ZfTable
  },
  data() {
    return {
      form: {
        company_name: ''
      },
      column,
      tableList: [],
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
    nextDetail(row) {}
  }
}
</script>

<style>

</style>
