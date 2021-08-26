<template>
  <div class="bgfff out_wrap">
    <div class="flex_between1">
      <el-form :inline="true" :model="form" size="small" label-suffix=":">
        <el-form-item label="子项名称">
          <el-input v-model="form.name" placeholder="请输入" @change="query" />
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" @click="getYZInfo">业主单位信息</el-button>
        <el-button type="primary" @click="getSSInfo">实施单位信息</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="add">新增子项</el-button>
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
      <!-- 测绘图 -->
      <template
        slot="map"
        slot-scope="{ row }"
      >
        <a class="active_color" @click="view(row.map)">查看</a>
      </template>
      <!-- 周边图片 -->
      <template
        slot="photo"
        slot-scope="{ row }"
      >
        <a class="active_color" @click="view(row.photo)">查看</a>
      </template>
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
          <!-- <svg-icon icon-class="upload" class-name="svg-class" @click="upReport(item)" /> -->
          <svg-icon icon-class="view" class-name="svg-class" @click="viewReport(item)" />
        </div>
      </div>
    </div>
    <el-dialog :title="`${mode === 1 ? '新增' : '编辑'}子项信息`" :visible.sync="formVisible" width="650px" center>
      <el-form ref="addSonProject" :model="addForm" label-suffix=":" label-position="right" label-width="120px" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="子项名称" prop="name">
              <el-input v-model="addForm.name" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="子项编号" prop="code">
              <el-input v-model="addForm.code" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="始建年代" prop="beginBuildTime">
              <el-input v-model="addForm.beginBuildTime" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="占地面积(㎡)" prop="area">
              <el-input v-model="addForm.area" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="建筑面积(㎡)" prop="architectureArea">
              <el-input v-model="addForm.architectureArea" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单体构成" prop="monomer">
              <el-input v-model="addForm.monomer" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="历史沿革" prop="history">
              <el-input v-model="addForm.history" autocomplete="off" type="textarea" :rows="3" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="价值评估结论" prop="valueAssess">
              <el-input v-model="addForm.valueAssess" autocomplete="off" type="textarea" :rows="3" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="photo">
              <div slot="label">
                <Tips content="包括周边环境、屋面鸟瞰、各向立面、室内梁架、有价值的细部等照片。格式：jpg" />现状照片
              </div>
              <upload v-model="addForm.photo" :limit="5" :type="['.jpg']" :multiple="true" :is-tips="false" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="map">
              <div slot="label">
                <Tips content="总平面图、各层平面图、屋顶平面图、各立面图、各剖面图、各细部图等。格式：pdf,dwg" />测绘图
              </div>
              <upload v-model="addForm.map" :limit="5" :type="['.dwg', '.pdf']" :multiple="true" :is-tips="false" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="历次修缮情况" prop="maintain">
              <el-input v-model="addForm.maintain" type="textarea" :rows="4" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSonProject('addSonProject')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="业主单位信息" :visible.sync="yzVisible" width="650px" center>
      <el-row class="mb20">
        <el-col :span="12">
          <div class="col-item">
            <span>单位名称:</span>
            <span>{{ yzData.name }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col-item">
            <span>2020年度经费:</span>
            <span>{{ yzData.expenditure2020 }}元</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="mb20">
        <el-col :span="12">
          <div class="col-item">
            <span>在编人员数量:</span>
            <span>{{ yzData.staffNum }}人</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col-item">
            <span>项目实施经费拨付方式:</span>
            <span>{{ yzData.payType }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="mb20">
        <el-col :span="12">
          <div class="col-item">
            <span>项目实施单位遴选委托方式:</span>
            <span>{{ yzData.entrustType }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col-item">
            <span>单位简介:</span>
            <span>{{ yzData.introduction }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="mb20">
        <el-col :span="12">
          <div class="col-item">
            <span>委托合同:</span>
            <span class="files" @click="downLoad(yzData.contract.id)">{{ yzData.contract && yzData.contract.name }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="mb20">
        <div class="mb10" style="font-weight: bold;">项目负责人信息:</div>
        <zf-table
          :columns="[{prop: 'name',label: '姓名'}, {prop: 'post',label: '职务'}, {prop: 'professional',label: '职称'}, {prop: 'certificate',label: '专业技术资格'}, {prop: 'manage',label: '管理分工'}]"
          :data-source="yzStaffInfo"
          :pagination="false"
        >
          <!-- 单体建筑信息 -->
          <template
            slot="professional"
            slot-scope="{ row }"
          >
            <div>{{ mapProfessional(row.professional) }}</div>
          </template>
        </zf-table>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="yzVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
    <el-dialog title="实施单位信息" :visible.sync="ssVisible" width="680px" center>
      <el-row class="mb20">
        <el-col :span="12">
          <div class="col-item">
            <span>单位名称:</span>
            <span>{{ ssData.name }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col-item">
            <span>固定技术人员数量:</span>
            <span>{{ ssData.technologyStaffNum }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="mb20">
        <el-col :span="12">
          <div class="col-item">
            <span>文保工程资质情况:</span>
            <span>{{ ssData.certificationRemark }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col-item">
            <span>单位简介:</span>
            <span>{{ ssData.introduction }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="mb20">
        <el-col :span="12">
          <div class="col-item">
            <span>项目组成员结构:</span>
            <span>{{ returnFn(ssData.staffComposition) }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="mb20">
        <div class="mb10" style="font-weight: bold;">项目负责人信息:</div>
        <zf-table
          :columns="[{prop: 'name',label: '姓名'}, {prop: 'professional',label: '职称'}, {prop: 'certificate',label: '专业证书'}, {prop: 'speciality',label: '专长'}]"
          :data-source="ssStaffInfo"
          :pagination="false"
        >
          <!-- 职称 -->
          <template
            slot="professional"
            slot-scope="{ row }"
          >
            <div>{{ mapProfessional(row.professional) }}</div>
          </template></zf-table>
      </el-row>
      <el-row class="mb20">
        <div class="mb10" style="font-weight: bold;">项目组成员信息:</div>
        <zf-table
          :columns="[{prop: 'name',label: '姓名'}, {prop: 'age',label: '年龄'}, {prop: 'professional',label: '职称'}, {prop: 'certificate',label: '专业证书'}, {prop: 'job',label: '项目内分工'}, {prop: 'workTime',label: '工作时间'}]"
          :data-source="projectMember"
          :pagination="false"
        >
          <!-- 职称 -->
          <template
            slot="professional"
            slot-scope="{ row }"
          >
            <div>{{ mapProfessional(row.professional) }}</div>
          </template>
        </zf-table>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ssVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="upVisible" width="450px" center>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="日报上传" name="1">
          <upload v-if="isUpload" v-model="addForm.fileIds" :limit="5" :type="['.doc', '.docx', '.pdf', '.xlsx', '.xls']" :multiple="true" />
          <template v-else>
            <div class="mb10 bold">日报内容：</div>
            <div class="files-warper">
              <template v-if="showFiles.length">
                <div v-for="(item, index) in showFiles" :key="index" class="file-item">
                  <div class="name">{{ item.name }}</div>
                  <div class="downLoad" @click="downLoad(item.id)">下载</div>
                </div>
              </template>
              <div v-else style="text-align:center;">暂无数据</div>
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane label="反馈栏" name="2">
          <div class="mb10 bold">请输入资料检查反馈信息:</div>
          <el-input
            v-model="feedback"
            :disabled="!isUpload"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
          />
        </el-tab-pane>
        <el-tab-pane label="评估意见栏" name="3">
          <el-form ref="form" :model="commentForm" label-width="145px" label-suffix=":">
            <el-form-item label="评估小组成员意见">
              <el-input v-model="commentForm.suggest1" :disabled="!isUpload" />
            </el-form-item>
            <el-form-item label="评估组长意见">
              <el-input v-model="commentForm.suggest2" :disabled="!isUpload" />
            </el-form-item>
            <el-form-item label="评估专家意见">
              <el-input v-model="commentForm.suggest3" :disabled="!isUpload" />
            </el-form-item>
            <el-form-item label="评估项目组综合意见">
              <el-input v-model="commentForm.suggest4" :disabled="!isUpload" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div v-if="isUpload" slot="footer" class="dialog-footer">
        <el-button @click="upVisible = false">取 消</el-button>
        <el-button type="primary" @click="upVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="查看" :visible.sync="dlfvisible" width="350px" center>
      <div class="files-warper">
        <template v-if="showFiles.length">
          <div v-for="(item, index) in showFiles" :key="index" class="file-item">
            <div class="name">{{ item.name }}</div>
            <div class="downLoad" @click="downLoad(item.id)">下载</div>
          </div>
        </template>
        <div v-else style="text-align:center;">暂无数据</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dlfvisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ZfTable from '@/components/ZfTable/CoreTable'
import column from './columns/projectDetail'
import upload from '@/components/upload'
import Tips from '@/components/tips.vue'
// import { validNumber } from '@/utils/fn'
import { getProjectSonList, saveProjectSon, updateProjectSon, getFiles, deteleProjectSonById, getOwnerById, getExecuteById, staffInfoById, getListByTypeAndComId } from '@/api/common'
export default {
  name: 'ProjectDetail',
  components: {
    ZfTable,
    upload,
    Tips
  },
  data() {
    return {
      ownerId: this.$route.query.ownerId, // 业主id
      projectExecuteCom: this.$route.query.projectExecuteCom, // 实施单位id
      form: {
        name: '',
        projectId: this.$route.query.id // 子项ID
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
        projectId: this.$route.query.id,
        id: '', // 子项id (用于编辑)
        code: '', // 子项编码
        name: '', // 子项名称
        beginBuildTime: '', // 始建年代
        architectureArea: '', // 建筑面积
        area: '', // 占地面积
        monomer: '', // 单体构成
        history: '', // 历史沿革
        maintain: '', // 历次修缮情况
        valueAssess: '', // 价值评估结论
        map: [], // 测绘图（文件id，多个的情况下用“，”隔开，如：1,2,3）
        photo: [] // 现状照片（文件id，多个的情况下用“，”隔开，如：1,2,3）
      },
      rules: {
        name: [
          { required: true, message: '请输入子项名字', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入子项编码', trigger: 'blur' }
        ]
      },
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
      yzVisible: false, // 业主弹框
      ssVisible: false, // 实施单位弹框
      yzStaffInfo: [], // 业主单位职工
      upVisible: false, // 日，周，月，季，年报上传
      activeName: '1', // tab
      feedback: '', // 反馈兰
      commentForm: { // 评估意见栏
        suggest1: '',
        suggest2: '',
        suggest3: '',
        suggest4: ''
      },
      isUpload: false, // 查看日报还是上传日报
      dlfvisible: false,
      showFiles: [], // 显示下载的文件列表
      yzData: {}, // 业主信息
      ssData: {}, // 实施单位信息
      ssStaffInfo: [], // 实施单位职工
      projectMember: [], // 实施单位项目成员
      reportType: 1 // 默认是日报
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    mapProfessional(id) {
      const _map = {
        1: '文保设计师',
        2: '建筑师',
        3: '结构工程师',
        4: '建造师',
        5: '安全员',
        6: '木工',
        7: '瓦工',
        8: '油漆彩画工',
        9: '其他'
      }
      return _map[id]
    },
    async query() {
      const res = await getProjectSonList({ ...this.form, ...this.pages })
      if (res.code === 0) {
        this.pages.total = res.data.projectSonList.total
        this.tableList = res.data.projectSonList.rows
      }
    },
    handlePageChange({ pageNum, pageSize, sorter: { prop, order }}) {
      this.pages.pageNum = pageNum
      this.pages.pageSize = pageSize
      this.query()
    },
    addSonProject(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          if (this.mode === 1) {
            const res = await saveProjectSon({
              ...this.addForm,
              map: this.addForm.map.map(item => item.id).join(',') || '', // 测绘图
              photo: this.addForm.photo.map(item => item.id).join(',') || '' // 周边状况
            })
            if (res.code === 0) {
              this.formVisible = false
              this.$message.success('新增子项成功!')
              this.query()
            }
          } else {
            const res = await updateProjectSon({
              ...this.addForm,
              map: this.addForm.map.map(item => item.id).join(',') || '', // 测绘图
              photo: this.addForm.photo.map(item => item.id).join(',') || '' // 周边状况
            })
            if (res.code === 0) {
              this.formVisible = false
              this.$message.success('编辑子项成功!')
              this.query()
            }
          }
        }
      })
    },
    async edit(row) {
      this.formVisible = true
      this.mode = 2
      this.addForm.name = row.name
      this.addForm.code = row.code
      this.addForm.beginBuildTime = row.beginBuildTime
      this.addForm.architectureArea = row.architectureArea
      this.addForm.area = row.area
      this.addForm.monomer = row.monomer
      this.addForm.history = row.history
      this.addForm.maintain = row.maintain
      this.addForm.valueAssess = row.valueAssess
      this.addForm.id = row.id
      // 通过ids获取文件
      this.addForm.map = await this.getFilesFn(row.map)
      this.addForm.photo = await this.getFilesFn(row.photo)
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
        const res = await deteleProjectSonById({ projectSonId: row.id })
        if (res.code === 0) {
          this.$message.success('删除子项成功!')
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
      this.addForm.name = ''
      this.addForm.code = ''
      this.addForm.beginBuildTime = ''
      this.addForm.architectureArea = ''
      this.addForm.area = ''
      this.addForm.monomer = ''
      this.addForm.history = ''
      this.addForm.maintain = ''
      this.addForm.valueAssess = ''
      this.addForm.id = ''
      // 通过ids获取文件
      this.addForm.map = []
      this.addForm.photo = []
    },
    goDetail(row) {
      this.$router.push(`/projectInformation/single-info?sonId=${row.id}`)
    },
    handleClick() {},
    async view(ids) {
      this.dlfvisible = true
      this.showFiles = []
      this.showFiles = await this.getFilesFn(ids)
    },
    downLoad(id) {
      const link = document.createElement('a')
      link.href = `${process.env.VUE_APP_BASE_API}/file/download?id=${id}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    async getYZInfo() {
      this.yzVisible = true
      const res = await getOwnerById({ id: this.ownerId })
      if (res.code === 0) {
        this.yzData = res.data.owner
        // 委托合同获取
        const result = await getFiles({ ids: this.yzData.contract })
        if (result.code === 0 && result.data.files.length) {
          this.yzData.contract = result.data.files[0]
        }
        // 职工信息获取
        const staffInfo = await staffInfoById({ id: this.yzData.principal })
        if (staffInfo.code === 0 && staffInfo.data) {
          this.yzStaffInfo = [{ ...staffInfo.data.staffInfo }]
        }
      }
    },
    // 对接到实施单位信息
    async getSSInfo() {
      this.ssVisible = true
      const res = await getExecuteById({ id: this.projectExecuteCom })
      if (res.code === 0) {
        this.ssData = res.data.execute
        // 职工信息获取
        const staffInfo = await staffInfoById({ id: this.ssData.principal })
        if (staffInfo.code === 0 && staffInfo.data) {
          this.ssStaffInfo = [{ ...staffInfo.data.staffInfo }]
        }
        const info = await getListByTypeAndComId({ type: 2, comId: res.data.execute.id })
        this.projectMember = info.data.list
      }
    },
    viewReport(item) {
      console.log(item)
      switch (item.value) {
        case 1:
          this.$router.push(`/workReport/day?id=${this.$route.query.id}`)
          break
        case 2:
          this.$router.push(`/workReport/week?id=${this.$route.query.id}`)
          break
        case 3:
          this.$router.push(`/workReport/mouth?id=${this.$route.query.id}`)
          break
        case 4:
          this.$router.push(`/workReport/quarter?id=${this.$route.query.id}`)
          break
        default:
          this.$router.push(`/workReport/year?id=${this.$route.query.id}`)
          break
      }
    },
    returnFn(data) {
      if (!data) return '暂无'
      const _map = {
        1: '文保设计师',
        2: '建筑师',
        3: '结构工程师',
        4: '建造师',
        5: '安全员',
        6: '木工',
        7: '瓦工',
        8: '油漆彩画工',
        9: '其他'
      }
      const arr = []
      data.split(',').forEach(item => {
        arr.push(_map[item])
      })
      return arr.join(',') || '暂无'
    }
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
  display: flex;
  span{
    display: inline-block;
    &:first-child{
      width: 173px;
      text-align: right;
      font-weight: bold;
    }
    &:last-child{
      padding-left: 5px;
      flex: 1;
      color: #3a8ee6;
    }
    &.files{
      cursor: pointer;
      &:hover{
        text-decoration: underline;
      }
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
.files-warper{
  .file-item{
    display: flex;
    margin-bottom: 10px;
    &:last-child{
      margin-bottom: 0;
    }
    .name{
      flex: 2;
    }
    .downLoad{
      flex: 1;
      text-align: right;
      color: red;
      cursor: pointer;
    }
  }
}
</style>
