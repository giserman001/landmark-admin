<template>
  <div class="bgfff out_wrap">
    <div class="flex_between1">
      <el-form :inline="true" :model="form" size="small" label-suffix=":">
        <el-form-item label="时间">
          <el-date-picker v-model="form.time" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" :editable="false" :value-format="'yyyy-MM-dd'" @change="query" />
        </el-form-item>
      </el-form>
      <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <zf-table
      :columns="column"
      :data-source="tableList"
      :total="pages.total"
      :page-size="pages.pageSize"
      :page-num="pages.page"
      @change="handlePageChange"
    >
      <!-- 报告 -->
      <template
        slot="report"
      >
        <a class="active_color">查看</a>
        <a class="active_color ml20">下载</a>
      </template>
      <!-- 反馈栏 -->
      <!-- <template
        slot="feedback"
      >
        <a class="active_color">查看</a>
        <a class="active_color ml20">编辑</a>
      </template> -->
      <!-- 评估意见栏 -->
      <template
        slot="idea"
      >
        <a class="active_color">查看</a>
        <a class="active_color ml20">编辑</a>
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
  </div>
</template>

<script>
import ZfTable from '@/components/ZfTable/CoreTable'
import { quarter } from './columns/list'
export default {
  name: 'List',
  components: {
    ZfTable
  },
  data() {
    return {
      form: {
        time: ''
      },
      column: quarter,
      tableList: [{
        id: 1,
        project: '承德避暑山庄',
        time: '2021-06-04'
      }, {
        id: 1,
        project: '承德避暑山庄',
        time: '2021-06-04'
      }, {
        id: 1,
        project: '承德避暑山庄',
        time: '2021-06-04'
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
    edit(row) {},
    del(row) {},
    add() {}
  }
}
</script>

<style>
.svg-class{
  cursor: pointer;
}
</style>
