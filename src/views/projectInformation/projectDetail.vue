<template>
  <div class="bgfff out_wrap">
    <div class="flex_between1">
      <el-form :inline="true" :model="form" size="small" label-suffix=":">
        <el-form-item label="建筑名称">
          <el-input v-model="form.name" placeholder="请输入" @change="query" />
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" @click="yzVisible = true">业主单位信息</el-button>
        <el-button type="primary" @click="ssVisible = true">实施单位信息</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="add">新增子项</el-button>
      </div>
    </div>
    <zf-table
      :columns="column"
      :data-source="tableList"
      :total="pages.total"
      :page-size="pages.pageSize"
      :page-num="pages.page"
      @change="handlePageChange"
    >
      <!-- 单体建筑信息 -->
      <template
        slot="singleArchitectureInfo"
        slot-scope="{ row }"
      >
        <svg-icon icon-class="share" class-name="svg-class" @click="goDetail(row)" />
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
    <el-divider content-position="left">工作汇报</el-divider>
    <div class="report">
      <div v-for="item in report" :key="item.value" class="report-item">
        <div class="head">{{ item.name }}</div>
        <div class="operate">
          <svg-icon icon-class="upload" class-name="svg-class" @click="isUpload = true;upVisible = true" />
          <svg-icon icon-class="view" class-name="svg-class ml20" @click="isUpload = false;upVisible = true" />
        </div>
      </div>
    </div>
    <el-dialog :title="`${mode === 1 ? '新增' : '编辑'}项目信息`" :visible.sync="formVisible" width="650px" center>
      <el-form :model="addForm" label-suffix=":" label-position="right" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="子项编号">
              <el-input v-model="addForm.no" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="子项名称">
              <el-input v-model="addForm.name" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="始建年代">
              <el-input v-model="addForm.startYear" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="占地面积">
              <el-input v-model="addForm.approveMoney" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="建筑面积">
              <el-input v-model="addForm.area" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单体构成">
              <el-input v-model="addForm.single" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="历史沿革">
              <el-input v-model="addForm.history" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="历次修缮情况">
              <el-input v-model="addForm.historyRepair" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="价值评估结论">
              <el-input v-model="addForm.value" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="测绘图">
              <el-upload
                ref="upload"
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
                <div slot="tip" class="el-upload__tip" style="line-height:20px;">只能上传dwg/jpg/png文件，且不超过20M</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" @click="formVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="业主单位信息" :visible.sync="yzVisible" width="650px" center>
      <el-row class="mb20">
        <el-col :span="12">
          <div class="col-item">
            <span>单位名称</span>:
            <span>建筑1</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col-item">
            <span>2020年度经费</span>:
            <span>20000</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="mb20">
        <el-col :span="12">
          <div class="col-item">
            <span>在编人员数量</span>:
            <span>100</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col-item">
            <span>项目实施经费拨付方式</span>:
            <span>支付宝</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="mb20">
        <el-col :span="24">
          <div class="col-item">
            <span>项目实施单位遴选委托方式</span>:
            <span>就开始会</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="mb20">
        <el-col :span="24">
          <div class="col-item">
            <span>委托合同</span>:
            <span>111</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="mb20">
        <div class="mb10" style="font-weight: bold;">项目负责人信息:</div>
        <zf-table
          :columns="[{prop: 'name',label: '姓名'}, {prop: 'duty',label: '职务'}, {prop: 'title',label: '职称'}, {prop: 'cert',label: '专业证书'}, {prop: 'manage',label: '管理分工'}]"
          :data-source="projectList"
          :pagination="false"
        />
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="yzVisible = false">取 消</el-button>
        <el-button type="primary" @click="yzVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="实施单位信息" :visible.sync="ssVisible" width="650px" center>
      <el-row class="mb20">
        <el-col :span="12">
          <div class="col-item">
            <span>单位名称</span>:
            <span>建筑1</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col-item">
            <span>固定技术人员数量</span>:
            <span>2000</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="mb20">
        <el-col :span="12">
          <div class="col-item">
            <span>文保工程资质情况</span>:
            <span>建筑1</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col-item">
            <span>单位简介</span>:
            <span>哈哈撒</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="mb20">
        <div class="mb10" style="font-weight: bold;">项目负责人信息:</div>
        <zf-table
          :columns="[{prop: 'name',label: '姓名'}, {prop: 'title',label: '职称'}, {prop: 'cert',label: '专业证书'}, {prop: 'manage',label: '专长'}]"
          :data-source="projectList"
          :pagination="false"
        />
      </el-row>
      <el-row class="mb20">
        <div class="mb10" style="font-weight: bold;">项目组成员信息:</div>
        <zf-table
          :columns="[{prop: 'name',label: '姓名'}, {prop: 'title',label: '年龄'}, {prop: 'cert',label: '职称'}, {prop: 'manage',label: '专业技能资格'}, {prop: 'manage1',label: '项目内分工'}, {prop: 'time',label: '工作时间'}]"
          :data-source="projectList"
          :pagination="false"
        />
      </el-row>
      <el-row class="mb20">
        <div class="mb10" style="font-weight: bold;">项目组成员构成:</div>
        <div>
          暂无
        </div>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ssVisible = false">取 消</el-button>
        <el-button type="primary" @click="ssVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="upVisible" width="450px" center>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="日报上传" name="1">
          <el-upload
            v-if="isUpload"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <template v-else>
            <div class="mb10 bold">日报内容：</div>
            <div class="file-con mb10">
              <div>ghaj.jpg</div>
              <div>下载</div>
            </div>
            <div class="file-con">
              <div>ghaj1.jpg</div>
              <div>下载</div>
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane label="反馈栏" name="2">
          <div class="mb10 bold">请输入资料检查反馈信息:</div>
          <el-input
            v-if="isUpload"
            v-model="feedBack"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
          />
          <div v-else>
            是世界上看数据就是撒垃圾奥科吉
          </div>
        </el-tab-pane>
        <el-tab-pane label="评估意见栏" name="3">
          <el-form ref="form" :model="commentForm" label-width="145px" label-suffix=":">
            <el-form-item label="评估小组成员意见">
              <el-input v-if="isUpload" v-model="commentForm.sunName" />
              <span v-else>会撒娇就撒娇</span>
            </el-form-item>
            <el-form-item label="评估组长意见">
              <el-input v-if="isUpload" v-model="commentForm.sunName" />
              <span v-else>会撒娇就撒娇</span>
            </el-form-item>
            <el-form-item label="评估专家意见">
              <el-input v-if="isUpload" v-model="commentForm.sunName" />
              <span v-else>会撒娇就撒娇</span>
            </el-form-item>
            <el-form-item label="评估项目组综合意见">
              <el-input v-if="isUpload" v-model="commentForm.sunName" />
              <span v-else>会撒娇就撒娇</span>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="upVisible = false">取 消</el-button>
        <el-button type="primary" @click="upVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ZfTable from '@/components/ZfTable/CoreTable'
import column from './columns/projectDetail'
export default {
  name: 'ProjectDetail',
  components: {
    ZfTable
  },
  data() {
    return {
      form: {
        name: ''
      },
      column,
      tableList: [{
        id: 1,
        name: '承德避暑山庄',
        startYear: '1990-09-10',
        area: '123',
        allArea: 145,
        history: '手机号啥课',
        historyRepair: '经历三次重大修复',
        value: '古建筑具有重大意义',
        single: '由1,2,3构成',
        draw: '不知道该如何展示'
      }, {
        id: 2,
        name: '承德避暑山庄',
        startYear: '1990-09-10',
        area: '123',
        allArea: 145,
        history: '手机号啥课',
        historyRepair: '经历三次重大修复',
        value: '古建筑具有重大意义',
        single: '由1,2,3构成',
        draw: '不知道该如何展示'
      }, {
        id: 3,
        name: '承德避暑山庄',
        startYear: '1990-09-10',
        area: '123',
        allArea: 145,
        history: '手机号啥课',
        historyRepair: '经历三次重大修复',
        value: '古建筑具有重大意义',
        single: '由1,2,3构成',
        draw: '不知道该如何展示'
      }],
      pages: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      formVisible: false,
      mode: 1, // 默认新增模式
      addForm: {
        no: '',
        name: '',
        startYear: '',
        allArea: '',
        area: '',
        single: '',
        history: '',
        historyRepair: '',
        value: '',
        text: '', // 方案文本
        budget: '', // 方案预算
        record: '', // 国宝单位档案
        draw: ''
      },
      fileList: [
        { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
      ],
      report: [{
        name: '日报',
        value: 1
      }, {
        name: '周报',
        value: 2
      }, {
        name: '月报',
        value: 3
      }, {
        name: '季报',
        value: 4
      }, {
        name: '年报',
        value: 5
      }],
      yzVisible: false,
      ssVisible: false,
      projectList: [{
        name: '李军',
        duty: 'CEO',
        title: '教授',
        cert: '高级管理',
        manage: '高级管理',
        manage1: '1111',
        time: '1990-0910'
      }, {
        name: '左干',
        duty: 'CEO',
        title: '教授',
        cert: '高级管理',
        manage: '高级管理',
        manage1: '1111',
        time: '1990-0910'
      }],
      upVisible: false,
      activeName: '1',
      feedBack: '',
      commentForm: {
        sunName: ''
      },
      isUpload: false
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
      this.formVisible = true
      this.mode = 2
    },
    del(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
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
    },
    goDetail(row) {
      this.$router.push('/projectInformation/single-info')
    },
    // 文件上传
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleClick() {}
  }
}
</script>

<style lang="scss" scoped>
.svg-class{
  cursor: pointer;
}
.report{
  display: flex;
  .report-item{
    flex: 1;
    &>div{
      padding: 10px 0;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .head{
      background-color: #F5F8FA;
    }
    .operate{
      border-right: 1px solid #EBEEF5;
      border-bottom: 1px solid #EBEEF5;
    }
    &:last-child{
      .operate{
        border-right: none;
      }
    }
  }
}
.col-item{
  span{
    display: inline-block;
    &:first-child{
      width: 172px;
      text-align: right;
      // text-align-last: justify;
      font-weight: bold;
    }
    &:last-child{
      color: #3a8ee6;
    }
  }
}
.file-con{
  display: flex;
  &>div{
    &:first-child{
      flex: 3;
    }
    &:last-child{
      flex: 1;
      color: #3a8ee6;
      cursor: pointer;
    }
  }
}
</style>
