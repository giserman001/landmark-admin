<template>
  <div class="bgfff out_wrap">
    <el-form ref="form" :model="addForm" label-width="115px" label-suffix=":">
      <div class="top-select">
        <el-form-item label="项目" label-width="50px">
          <el-select v-model="addForm.projectId" placeholder="请选择" class="ml10" @change="changeProject">
            <el-option v-for="item in optionArr" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="子项" label-width="60px">
          <el-select v-model="addForm.projectSonId" placeholder="请选择" class="ml10" @change="changeProjectSon">
            <el-option v-for="item in sonProject" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="单体" label-width="60px">
          <el-select v-model="addForm.architectureId" placeholder="请选择" class="ml10">
            <el-option v-for="item in architectureArr" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <div class="ml20">
          <el-button type="primary" @click="add">添加</el-button>
        </div>
      </div>
      <div class="table-custom">
        <div class="head flex">
          <div class="th flex1">子项</div>
          <div class="th flex1">单体</div>
          <div class="th flex1">实施日期</div>
          <div class="th flex1">巡查及其延伸工作</div>
          <div class="th flex1">单体列表实施人员</div>
          <div class="th flex1">详情</div>
          <div class="th flex1">其他相关工作<Tips content="填写除巡查检修外，本周开展的其他相关工作的内容及其成效。如测绘（说明对象）、档案整理（说明内容）、仪器设备维护（说明设备名称）、员工培训学习（说明人员和内容）、工作交流（说明人员和内容）等。" /></div>
          <div class="th flex1">操作</div>
        </div>
        <div class="body">
          <template v-if="addForm.reportArray.length">
            <div v-for="(item, index) in addForm.reportArray" :key="item.key" class="tr flex">
              <div class="td flex1">{{ item.projectSonName }}</div>
              <div class="td flex1">{{ item.architectureName }}</div>
              <div class="td flex1">
                <el-form-item label-width="0">
                  <!-- <el-input v-model="item.executeDate" placeholder="请输入日期" style="width:120px;" /> -->
                  <el-date-picker
                    v-model="item.executeDate"
                    value-format="yyyy-MM-dd"
                    type="date"
                    style="width:140px;"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </div>
              <div class="td flex1">
                <el-form-item label-width="0">
                  <el-select v-model="item.patrol" placeholder="请选择">
                    <el-option label="常规巡查" value="1" />
                    <el-option label="定期观测" value="2" />
                    <el-option label="专业检修" value="3" />
                    <el-option label="检修效果评估" value="4" />
                  </el-select>
                </el-form-item>
              </div>
              <div class="td flex1"><el-input v-model="item.executeBy" placeholder="请输入" style="width:120px;" /></div>
              <div class="td flex1">
                <a class="active_color" @click="view(item, index)">查看</a>
              </div>
              <div class="td flex1">
                <el-form-item label-width="0">
                  <el-input v-model="item.other" placeholder="请输入" style="width:120px;" />
                </el-form-item>
              </div>
              <div class="td flex1">
                <a class="del" @click="del(item, index)">删除</a>
              </div>
            </div>
          </template>
          <div v-else class="no-data flex_center">暂无数据</div>
        </div>
      </div>
      <div class="center mt20">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="clear">清除</el-button>
      </div>
    </el-form>
    <!-- 详情弹框form表单 -->
    <el-dialog :title="title[1]" :visible.sync="detailVisible" width="800px" center @close="closeFn">
      <el-form ref="addForm" :model="detailForm" label-suffix=":" label-position="right" label-width="120px">
        <div v-if="title[0] === '1'">
          <el-row>
            <el-col :span="12">
              <el-form-item label="巡查工具">
                <el-input v-model="detailForm.patrolTool" class="inputWith" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <div slot="label">
                  <Tips content="根据方案内容填写，应包括此前巡查中提出的需要定期观测的部位的对比，此前专业检修的实施效果评估等。" />巡查内容
                </div>
                <el-input v-model="detailForm.patrolContent" class="inputWith" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="档案留存">
                <upload v-model="detailForm.patrolFileId" :limit="5" :type="['.png', '.jpg', '.jpeg', '.JPG']" :multiple="true" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否发现新病害">
                <el-radio-group v-model="detailForm.haveNewDisease">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
                <el-button v-if="detailForm.haveNewDisease === 1" class="ml20" type="primary" @click="addVirus">添加</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 病毒害动态新增 -->
          <div v-if="detailForm.haveNewDisease === 1">
            <div v-for="(item, index) in detailForm.diseaseArray" :key="index" class="dynamic-warper">
              <div class="head-tit flex_between mb10"><span class="left">病毒害{{ index + 1 }}</span> <span v-if="detailForm.diseaseArray.length > 1" class="right del pointer" @click="delVirus(item)">删除</span></div>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="病害部位">
                    <el-input v-model="item.diseasePart" class="inputWith" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="病害类型">
                    <el-input v-model="item.diseaseType" class="inputWith" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="病害表征">
                    <el-input v-model="item.diseaseTrait" class="inputWith" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="成因分析">
                    <el-input v-model="item.diseaseCause" class="inputWith" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item>
                    <div slot="label">
                      <Tips content="建议上传多张不同角度的病害照片，并辅以文字注释（描述病害部位、面积、表征、严重程度和成因等）。格式: jpg,png,jpeg" />照片
                    </div>
                    <upload v-model="item.diseasePhotos" :limit="5" :type="['.png', '.jpg', '.jpeg', '.JPG']" :multiple="true" :is-tips="false" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="结构性病害">
                    <el-select v-model="item.diseaseIsStructure" placeholder="请选择" class="inputWith">
                      <el-option label="是" value="1" />
                      <el-option label="否" value="2" />
                      <el-option label="有待检测鉴定" value="3" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="病害严重程度">
                    <el-select v-model="item.diseaseDegree" placeholder="请选择" class="inputWith">
                      <el-option label="轻微" value="1" />
                      <el-option label="严重" value="2" />
                      <el-option label="有待检测检测" value="3" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="处理方式" style="margin-bottom:0;">
                    <el-checkbox-group v-model="item.diseaseSolveWay">
                      <el-checkbox label="1" name="type">无需任何处理<Tips content="一般针对轻微且无发展（稳定）的非结构性病害" /></el-checkbox>
                      <el-checkbox label="2" name="type">定期巡视观测<Tips content="针对轻微，发展缓慢的非结构性病害" /></el-checkbox>
                      <el-checkbox label="3" name="type">专业检修<Tips content="针对非结构性病害，成因明确，且发展迅速，须立即进行检修，以阻止或减缓病害发展" /></el-checkbox>
                      <el-checkbox label="4" name="type">检测鉴定<Tips content="成因或严重程度不清，需要通过专门的仪器设备检测鉴定其成因或严重程度" /></el-checkbox>
                      <el-checkbox label="5" name="type">专项监测<Tips content="针对轻微且发展迅速的结构性病害，应明确 监测内容" /></el-checkbox>
                      <el-checkbox label="6" name="type">抢险支护<Tips content="针对发展迅速的结构性病害，必须立即开展支护等可逆的抢修工程，以防治其破坏" /></el-checkbox>
                      <el-checkbox label="7" name="type">修缮工程<Tips content="针对严重且发展缓慢的结构性病害，或大面积的严重的非结构性病害，必须单独申报修缮工程立项" /></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div v-if="title[0] === '2'">
          <el-row>
            <el-col :span="12">
              <el-form-item label="观测对比">
                <el-select v-model="detailForm.beforeComparison" placeholder="请选择" class="inputWith">
                  <el-option label="无发展" value="1" />
                  <el-option label="轻微发展" value="2" />
                  <el-option label="迅速发展" value="3" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="评估结论">
                <el-select v-model="detailForm.beforeVerdict" placeholder="请选择" class="inputWith">
                  <el-option label="继续观测" value="1" />
                  <el-option label="停止观测" value="2" />
                  <el-option label="加密观测" value="3" />
                  <el-option label="专业检修" value="4" />
                  <el-option label="检测鉴定" value="5" />
                  <el-option label="专项监测" value="6" />
                  <el-option label="修缮工程" value="7" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item>
                <div slot="label">
                  <Tips content="建议上传历次观测时同一角度病害照片，有需要时辅以文字注释。格式: jpg,png,jpeg" />照片
                </div>
                <upload v-model="detailForm.observationFileId" :limit="5" :type="['.png', '.jpg', '.jpeg', '.JPG']" :multiple="true" :is-tips="false" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-if="title[0] === '3'">
          <el-row>
            <el-col :span="12">
              <el-form-item>
                <div slot="label">
                  <Tips content="简要文字说明，草图，或专门绘制的检修方案图纸" />检修方案说明
                </div>
                <el-input v-model="detailForm.reconditionScheme" class="inputWith" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <div slot="label">
                  <Tips content="开始日期和完成日期" />检修实施时间
                </div>
                <el-input v-model="detailForm.reconditionTime" class="inputWith" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item>
                <div slot="label">
                  <Tips content="简述施工步骤，说明所用原材料、工具、设备等" />检修完成状况
                </div>
                <el-input v-model="detailForm.reconditionCondition" class="inputWith" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <div slot="label">
                  <Tips content="填写姓名、工种和分工情况" />检修实施人员
                </div>
                <el-input v-model="detailForm.reconditionStaff" class="inputWith" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item>
                <div slot="label">
                  <Tips content="检修全过程的照片。应至少包括检修施工前病害部位情况的照片1张、检修施工关键过程的照片1张，检修完成后与检修前的同角度对比照片1张，并适当配以文字说明。格式：png,jpg,jpeg" />照片
                </div>
                <upload v-model="detailForm.reconditionPhoto" :limit="5" :type="['.png', '.jpg', '.jpeg', '.JPG']" :multiple="true" :is-tips="false" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注">
                <el-input v-model="detailForm.reconditionPhotoRemark" class="inputWith" type="textarea" :rows="6" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-if="title[0] === '4'">
          <el-row>
            <el-col :span="12">
              <el-form-item label="检修后观测对比">
                <el-select v-model="detailForm.observationComparison" placeholder="请选择" class="inputWith">
                  <el-option label="效果良好" value="1" />
                  <el-option label="有一定效果" value="2" />
                  <el-option label="无效" value="3" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检修后评估结论">
                <el-select v-model="detailForm.observationVerdict" placeholder="请选择" class="inputWith">
                  <el-option label="持续巡查评估" value="1" />
                  <el-option label="再次检修" value="2" />
                  <el-option label="检测鉴定" value="3" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureFn">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getProjectList, getProjectSonIdAndName, saveWeekReport, getWeekReportByIdDetail, getFiles, getArchitectureIdAndName, updateWeekReportRecord } from '@/api/common'
import upload from '@/components/upload'
import Tips from '@/components/tips.vue'
export default {
  components: {
    upload,
    Tips
  },
  data() {
    return {
      optionArr: [],
      sonProject: [],
      architectureArr: [],
      // TODO 2021-06-27修改
      addForm: {
        reportId: this.$route.query.id || '', // 周报id（用于编辑）
        projectId: '', // 项目id
        projectSonId: '', // 子项id
        architectureId: '', // 单体建筑id
        reportArray: []
      },
      // 详情弹框form表单
      title: '查看',
      detailVisible: false,
      detailForm: {
        patrolTool: '', // 巡查工具
        patrolContent: '', // 巡查内容
        patrolFileId: [], // 档案留存
        haveNewDisease: 1, // 是否病毒还
        diseaseArray: [{
          diseasePart: '', // 病害部位
          diseaseType: '', // 病害类型
          diseaseTrait: '', // 病害表征
          diseaseCause: '', // 病害成因分析
          diseasePhotos: [], // 照片 => 需要处理
          diseaseIsStructure: '', // 是否结构性病害
          diseaseDegree: '', // 病害严重程度
          diseaseSolveWay: ['1'] // 病毒处理方式 => 需要处理
        }],
        beforeComparison: '', // 观测对比
        beforeVerdict: '', // 评估结论
        observationFileId: [], // 观测图片照片
        reconditionScheme: '', // 检修方案说明
        reconditionTime: '', // 检修实施时间
        reconditionPhoto: [], // 检修照片 => 需要处理
        reconditionCondition: '', // 检修完成情况
        reconditionStaff: '', // 检修实施人员
        reconditionPhotoRemark: '', // 检测过程备注
        observationComparison: '', // 检修后观测对比
        observationVerdict: '' // 检修后评估结论
      },
      curIndex: ''
    }
  },
  mounted() {
    if (this.$route.query.id) {
      getWeekReportByIdDetail({ reportId: this.$route.query.id }).then(async(res) => {
        console.log(res, '详情')
        if (res.code === 0) {
          if (res.data.list && res.data.list.length) {
            res.data.list.forEach(item => {
              this.addForm.reportArray.push({
                ...item.weekReportRecord,
                patrol: `${item.weekReportRecord.patrol}`,
                diseaseArray: item.diseaseRecordList || []
              })
            })
            // 转换文件数据结构
            this.addForm.reportArray.forEach(async(item) => {
              item.observationFileId = item.observationFileId && await this.getFilesFn(item.observationFileId) || []
              item.patrolFileId = item.patrolFileId && await this.getFilesFn(item.patrolFileId) || []
              item.reconditionPhoto = item.reconditionPhoto && await this.getFilesFn(item.reconditionPhoto) || []
              if (item.diseaseArray && item.diseaseArray.length) {
                item.diseaseArray.forEach(async(list) => {
                  list.diseasePhotos = list.diseasePhotos && await this.getFilesFn(list.diseasePhotos) || []
                  // 处理方式
                  list.diseaseSolveWay = list.diseaseSolveWay && list.diseaseSolveWay.split(',') || []
                })
              }
            })
          }
        }
      })
    }
    getProjectList({ pageNum: 1, pageSize: 9999 }).then(res => {
      this.optionArr = res.data.projectList.rows
      this.addForm.projectId = this.optionArr[0].id
      return true
    }).then(res => {
      // 当前项目下的子项
      if (res) {
        this.getSonProject()
      }
    })
  },
  methods: {
    // 获取子项下拉
    getSonProject() {
      getProjectSonIdAndName({ projectId: this.addForm.projectId }).then(res => {
        this.sonProject = res.data.sonIdAndName
      })
    },
    // 获取单体下拉
    getArchitecture() {
      getArchitectureIdAndName({ projectId: this.addForm.projectSonId }).then(res => {
        this.architectureArr = res.data.sonIdAndName
      })
    },
    changeProject() {
      this.getSonProject()
      this.addForm.projectSonId = ''
      this.addForm.architectureId = ''
    },
    changeProjectSon() {
      this.getArchitecture()
      this.addForm.architectureId = ''
    },
    async submitForm() {
      if (!this.addForm.reportArray.length) {
        this.$message.error('请先添加数据!')
        return
      }
      // 深拷贝
      const parseData = JSON.parse(JSON.stringify(this.addForm))
      console.log(parseData, 'parseDataparseDataparseDataparseData')
      parseData.reportArray.forEach(item => {
        item.observationFileId = item.observationFileId.map(it => it.id).join(',')
        item.patrolFileId = item.patrolFileId.map(it => it.id).join(',')
        item.reconditionPhoto = item.reconditionPhoto.map(it => it.id).join(',')
        item.diseaseArray.forEach(list => {
          list.diseasePhotos = list.diseasePhotos.map(it => it.id).join(',')
          list.diseaseSolveWay = list.diseaseSolveWay.join(',')
        })
      })
      if (!this.$route.query.id) {
        const res = await saveWeekReport(parseData)
        if (res.code === 0) {
          this.$message.success('提交成功')
          this.$router.go(-1)
        }
      } else {
        const res = await updateWeekReportRecord(parseData)
        if (res.code === 0) {
          this.$message.success('编辑成功')
          this.$router.go(-1)
        }
      }
    },
    sureFn() {
      // 最新组合数据
      this.$set(this.addForm.reportArray, this.curIndex, { ...this.addForm.reportArray[this.curIndex], ...this.detailForm })
      this.detailVisible = false
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
    add() {
      if (!this.addForm.projectId) {
        this.$message.error('请选择项目')
        return
      }
      if (!this.addForm.projectSonId) {
        this.$message.error('请选择子项')
        return
      }
      if (!this.addForm.architectureId) {
        this.$message.error('请选择单体')
        return
      }
      this.addForm.reportArray.push({
        projectSonId: this.addForm.projectSonId, // 子项id
        projectSonName: this.sonProject.find(item => item.id === this.addForm.projectSonId).name, // 子项名字
        architectureId: this.addForm.architectureId, // 单体建筑id
        architectureName: this.architectureArr.find(item => item.id === this.addForm.architectureId).name, // 单体建筑名字
        executeDate: '', // 实施日期（填报日期）
        executeBy: '', // 实施人员
        patrol: '1', // 巡查及其延伸工作
        other: '', // 其他相关工作
        key: Date.now(),
        // 组合数据
        patrolTool: '', // 巡查工具
        patrolContent: '', // 巡查内容
        patrolFileId: [], // 档案留存
        haveNewDisease: 1, // 是否病毒还
        diseaseArray: [{
          diseasePart: '', // 病害部位
          diseaseType: '', // 病害类型
          diseaseTrait: '', // 病害表征
          diseaseCause: '', // 病害成因分析
          diseasePhotos: [], // 照片 => 需要处理
          diseaseIsStructure: '', // 是否结构性病害
          diseaseDegree: '', // 病害严重程度
          diseaseSolveWay: ['1'] // 病毒处理方式 => 需要处理
        }],
        beforeComparison: '', // 观测对比
        beforeVerdict: '', // 评估结论
        observationFileId: [], // 观测图片照片
        reconditionScheme: '', // 检修方案说明
        reconditionTime: '', // 检修实施时间
        reconditionPhoto: [], // 检修照片 => 需要处理
        reconditionCondition: '', // 检修完成情况
        reconditionStaff: '', // 检修实施人员
        reconditionPhotoRemark: '', // 检测过程备注
        observationComparison: '', // 检修后观测对比
        observationVerdict: '' // 检修后评估结论
      })
    },
    view(item, index) {
      if (!this.addForm.reportArray[index].patrol) {
        this.$message.error('请选择巡查及其延伸工作')
        return
      }
      this.curIndex = index
      switch (this.addForm.reportArray[index].patrol) {
        case '1':
          this.title = ['1', '常规巡查']
          break
        case '2':
          this.title = ['2', '定期观测']
          break
        case '3':
          this.title = ['3', '专业检修']
          break
        default:
          this.title = ['4', '检修效果评估']
          break
      }
      this.detailForm = {
        ...this.detailForm,
        patrolTool: item.patrolTool, // 巡查工具
        patrolContent: item.patrolContent, // 巡查内容
        patrolFileId: item.patrolFileId, // 档案留存
        haveNewDisease: item.haveNewDisease, // 是否病毒还
        diseaseArray: item.diseaseArray,
        beforeComparison: item.beforeComparison, // 观测对比
        beforeVerdict: item.beforeVerdict, // 评估结论
        observationFileId: item.observationFileId, // 观测图片照片
        reconditionScheme: item.reconditionScheme, // 检修方案说明
        reconditionTime: item.reconditionTime, // 检修实施时间
        reconditionPhoto: item.reconditionPhoto, // 检修照片 => 需要处理
        reconditionCondition: item.reconditionCondition, // 检修完成情况
        reconditionStaff: item.reconditionStaff, // 检修实施人员
        reconditionPhotoRemark: item.reconditionPhotoRemark, // 检测过程备注
        observationComparison: item.observationComparison, // 检修后观测对比
        observationVerdict: item.observationVerdict // 检修后评估结论
      }
      this.detailVisible = true
    },
    closeFn() {
      // 清空数据
      this.detailForm = {
        patrolTool: '', // 巡查工具
        patrolContent: '', // 巡查内容
        patrolFileId: [], // 档案留存
        haveNewDisease: 1, // 是否病毒还
        diseaseArray: [{
          diseasePart: '', // 病害部位
          diseaseType: '', // 病害类型
          diseaseTrait: '', // 病害表征
          diseaseCause: '', // 病害成因分析
          diseasePhotos: [], // 照片 => 需要处理
          diseaseIsStructure: '', // 是否结构性病害
          diseaseDegree: '', // 病害严重程度
          diseaseSolveWay: ['1'] // 病毒处理方式 => 需要处理
        }],
        beforeComparison: '', // 观测对比
        beforeVerdict: '', // 评估结论
        observationFileId: [], // 观测图片照片
        reconditionScheme: '', // 检修方案说明
        reconditionTime: '', // 检修实施时间
        reconditionPhoto: [], // 检修照片 => 需要处理
        reconditionCondition: '', // 检修完成情况
        reconditionStaff: '', // 检修实施人员
        reconditionPhotoRemark: '', // 检测过程备注
        observationComparison: '', // 检修后观测对比
        observationVerdict: '' // 检修后评估结论
      }
    },
    del(item) {
      var index = this.addForm.reportArray.indexOf(item)
      if (index !== -1) {
        this.addForm.reportArray.splice(index, 1)
      }
    },
    clear() {
      this.addForm.reportArray = []
    },
    addVirus() {
      this.detailForm.diseaseArray.push({
        diseasePart: '', // 病害部位
        diseaseType: '', // 病害类型
        diseaseTrait: '', // 病害表征
        diseaseCause: '', // 病害成因分析
        diseasePhotos: [], // 照片 => 需要处理
        diseaseIsStructure: '', // 是否结构性病害
        diseaseDegree: '', // 病害严重程度
        diseaseSolveWay: ['1'] // 病毒处理方式 => 需要处理
      })
    },
    delVirus(item) {
      var index = this.detailForm.diseaseArray.indexOf(item)
      if (index !== -1) {
        this.detailForm.diseaseArray.splice(index, 1)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.form-warper{
  width: 70%;
  margin: 0 auto;
}
.inputWith {
  width: 230px;
}
.head-tit{
  font-size: 16px;
  font-weight: bold;
}
.top-select{
  display: flex;
}
.table-custom{
  .head{
    background-color: #F5F8FA;
    .th{
      padding: 12px 0;
      text-align: center;
    }
  }
  .body{
    .tr{
      border-bottom: 1px solid #EBEEF5;
      &:hover{
        background-color: #F5F8FA;
      }
    }
    .td{
      padding: 9px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-form-item{
        margin-bottom: 0;
      }
    }
  }
}
.no-data{
  color: #999;
  padding: 50px 0;
}
.dynamic-warper{
  border: 1px solid #EBEEF5;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  &:last-child{
    margin-bottom: 0;
  }
}
</style>
