<template>
  <div class="bgfff out_wrap">
    <div class="flex_between1">
      <el-form :inline="true" :model="form" size="small" label-suffix=":">
        <el-form-item label="建筑名称">
          <el-input v-model="form.name" placeholder="请输入" @change="query" />
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
      <!-- 业主信息 -->
      <!-- <template
        slot="ownerInfo"
      >
        <svg-icon icon-class="ownerInfo" class-name="svg-class" />
      </template> -->
      <!-- 实施单位信息 -->
      <!-- <template
        slot="putInfo"
      >
        <svg-icon icon-class="putInfo" class-name="svg-class" />
      </template> -->
      <!-- 单体建筑信息 -->
      <template
        slot="singleArchitectureInfo"
      >
        <svg-icon icon-class="share" class-name="svg-class" />
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
      tableList: [{
        id: 1,
        name: '承德避暑山庄',
        area: '123',
        allArea: 145,
        money: 45677,
        subContent: '承德建筑主群',
        unit: '博物院',
        text: '西三脚架看就看写接口',
        budget: 345678,
        record: '是撒接口了'
      }, {
        id: 1,
        name: '承德避暑山庄',
        area: '123',
        allArea: 145,
        money: 45677,
        subContent: '承德建筑主群',
        unit: '博物院',
        text: '西三脚架看就看写接口',
        budget: 345678,
        record: '是撒接口了'
      }, {
        id: 1,
        name: '承德避暑山庄',
        area: '123',
        allArea: 145,
        money: 45677,
        subContent: '承德建筑主群',
        unit: '博物院',
        text: '西三脚架看就看写接口',
        budget: 345678,
        record: '是撒接口了'
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
