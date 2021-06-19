<template>
  <div class="bgfff out_wrap">
    <el-form ref="form" :model="form" label-width="115px" label-suffix=":">
      <div class="top-select mb20">
        <span>项目:</span>
        <el-select v-model="form.projectId" placeholder="请选择" class="ml10">
          <el-option v-for="item in optionArr" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="本周巡查" name="1">
          <div class="form-warper">
            <el-row>
              <el-col :span="12">
                <el-form-item label="巡查人员">
                  <el-input v-model="form.patrolBy" class="inputWith" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="巡查工具">
                  <el-input v-model="form.patrolTool" class="inputWith" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="档案留存">
                  <el-radio-group v-model="form.patrolRecord">
                    <el-radio :label="1">照片</el-radio>
                    <el-radio :label="2">图纸</el-radio>
                    <el-radio :label="3">文字</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="巡查内容">
                  <el-input v-model="form.patrolContent" class="inputWith" type="textarea" :rows="6" />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="巡查发现新病害及其评估" name="2">
          <div class="form-warper">
            <div class="head-tit mb10">第一层级: 子项选择</div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="子项">
                  <!-- <el-select v-model="form.projectSonId" placeholder="请选择" class="ml10" clearable>
                    <el-option v-for="item in sonProject" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select> -->
                  暂无
                </el-form-item>
              </el-col>
            </el-row>
            <div class="head-tit mb10">第二层级: 病害表征和成因</div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="病害部位">
                  <el-input v-model="form.diseasePart" class="inputWith" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="病害类型">
                  <el-input v-model="form.diseaseType" class="inputWith" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="病害表征">
                  <el-input v-model="form.diseaseTrait" class="inputWith" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="成因分析">
                  <el-input v-model="form.diseaseCause" class="inputWith" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="照片">
                  <upload v-model="form.diseasePhotos" :limit="5" :type="['.png', '.jpg', '.jpeg', '.JPG']" :multiple="true" />
                </el-form-item>
              </el-col>
            </el-row>
            <div class="head-tit mb10">第三层级: 病害表严重性评估</div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="结构性病害">
                  <el-select v-model="form.diseaseIsStructure" placeholder="请选择" class="inputWith">
                    <el-option label="是" value="1" />
                    <el-option label="否" value="2" />
                    <el-option label="有待检测鉴定" value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="病害严重程度">
                  <el-select v-model="form.diseaseDegree" placeholder="请选择" class="inputWith">
                    <el-option label="轻微" value="1" />
                    <el-option label="严重" value="2" />
                    <el-option label="有待检测检测" value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="疾病发展速度">
                  <el-select v-model="form.diseaseSpeed" placeholder="请选择" class="inputWith">
                    <el-option label="无发展（稳定）" value="1" />
                    <el-option label="发展缓慢" value="2" />
                    <el-option label="发展迅速" value="3" />
                    <el-option label="有待专项监测" value="4" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="head-tit mb10">第四层级: 处理方式(多选)</div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="处理方式">
                  <el-checkbox-group v-model="form.diseaseSolveWay">
                    <el-checkbox label="1" name="type">无需任何处理</el-checkbox>
                    <el-checkbox label="2" name="type">定期巡视观测</el-checkbox>
                    <el-checkbox label="3" name="type">专业检修</el-checkbox>
                    <el-checkbox label="4" name="type">检测鉴定</el-checkbox>
                    <el-checkbox label="5" name="type">专项监测</el-checkbox>
                    <el-checkbox label="6" name="type">抢险支护</el-checkbox>
                    <el-checkbox label="7" name="type">修缮工程</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="新开展专业检修项目" name="3">
          <div class="form-warper">
            <el-row>
              <el-col :span="12">
                <el-form-item label="检修方案说明">
                  <el-input v-model="form.reconditionScheme" class="inputWith" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="检修实施时间">
                  <!-- <el-date-picker v-model="form.reconditionTime" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" :editable="false" :value-format="'yyyy-MM-dd'" /> -->
                  <el-input v-model="form.reconditionTime" class="inputWith" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="检修完成状况">
                  <el-input v-model="form.reconditionCondition" class="inputWith" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="检修实施人员">
                  <el-input v-model="form.reconditionStaff" class="inputWith" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="照片">
                  <upload v-model="form.reconditionPhoto" :limit="5" :type="['.png', '.jpg', '.jpeg', '.JPG']" :multiple="true" />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="前期巡查既有疾病定期评估" name="4">
          <div class="form-warper">
            <el-row>
              <el-col :span="12">
                <el-form-item label="观测对比">
                  <el-select v-model="form.beforeComparison" placeholder="请选择" class="inputWith">
                    <el-option label="无发展" value="1" />
                    <el-option label="轻微发展" value="2" />
                    <el-option label="迅速发展" value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="评估结论">
                  <el-select v-model="form.beforeVerdict" placeholder="请选择" class="inputWith">
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
          </div>
        </el-tab-pane>
        <el-tab-pane label="前期专业检修后续效果评估" name="5">
          <div class="form-warper">
            <el-row>
              <el-col :span="12">
                <el-form-item label="检修后观测对比">
                  <el-select v-model="form.afterComparison" placeholder="请选择" class="inputWith">
                    <el-option label="效果良好" value="1" />
                    <el-option label="有一定效果" value="2" />
                    <el-option label="无效" value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="检修后评估结论">
                  <el-select v-model="form.afterVerdict" placeholder="请选择" class="inputWith">
                    <el-option label="持续巡查评估" value="1" />
                    <el-option label="再次检修" value="2" />
                    <el-option label="检测鉴定" value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="本周其他工作">
                  <el-input v-model="form.otherWork" class="inputWith" />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="center">
        <el-button v-if="activeName !== '1'" type="primary" @click="back">上一步</el-button>
        <el-button v-if="activeName !== '5'" type="primary" @click="next">下一步</el-button>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button>取消</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { getProjectList, getProjectSonList, saveWeekReport, getWeekReportByIdDetail, getFiles, updateWeekReport } from '@/api/common'
import upload from '@/components/upload'
export default {
  components: {
    upload
  },
  data() {
    return {
      project: '',
      optionArr: [],
      sonProject: [],
      activeName: '1',
      form: {
        id: this.$route.query.id || '', // 周报id(用于编辑)
        projectId: '', // 项目id
        patrolContent: '', // 巡查内容
        patrolBy: '', // 巡查人员
        patrolTool: '', // 巡查工具
        patrolRecord: 1, // 巡查档案留存（1：照片；2：图纸；3：文字）
        projectSonId: '', // 子项(暂无没有对接)
        diseasePart: '', // 病害部位
        diseaseType: '', // 病害类型
        diseaseTrait: '', // 病害表征
        diseaseCause: '', // 病害成因分析
        diseasePhotos: [], // 照片 => 需要处理
        diseaseIsStructure: '', // 是否结构性病害
        diseaseDegree: '', // 病害严重程度
        diseaseSpeed: '', // 病害发展速度
        diseaseSolveWay: ['1'], // 病毒处理方式 => 需要处理
        reconditionScheme: '', // 检修方案说明
        reconditionTime: '', // 检修实施时间
        reconditionPhoto: [], // 检修照片 => 需要处理
        reconditionCondition: '', // 检修完成情况
        reconditionStaff: '', // 检修实施人员
        beforeComparison: '', // 观测对比
        beforeVerdict: '', // 评估结论
        afterComparison: '', // 检修后观测对比
        afterVerdict: '', // 检修后评估结论
        otherWork: '' // 本周其他相关工作
      }
    }
  },
  mounted() {
    if (this.$route.query.id) {
      getWeekReportByIdDetail({ id: this.$route.query.id }).then(async(res) => {
        console.log(res, 'fffffffffffffff')
        const {
          projectId,
          patrolContent,
          patrolBy,
          patrolTool,
          patrolRecord,
          diseasePart,
          diseaseType,
          diseaseTrait,
          diseaseCause,
          diseasePhotos,
          diseaseIsStructure,
          diseaseDegree,
          diseaseSpeed,
          diseaseSolveWay,
          reconditionScheme,
          reconditionTime,
          reconditionPhoto,
          reconditionCondition,
          reconditionStaff,
          beforeComparison,
          beforeVerdict,
          afterComparison,
          afterVerdict,
          otherWork
        } = res.data.weekReport
        console.log(diseasePhotos, reconditionPhoto, '图片')
        this.form.projectId = projectId // 项目id
        this.form.patrolContent = patrolContent // 巡查内容
        this.form.patrolBy = patrolBy // 巡查人员
        this.form.patrolTool = patrolTool // 巡查工具
        this.form.patrolRecord = patrolRecord // 巡查档案留存（1：照片；2：图纸；3：文字）
        // this.form.projectSonId = '' // 子项(暂无没有对接)
        this.form.diseasePart = diseasePart // 病害部位
        this.form.diseaseType = diseaseType // 病害类型
        this.form.diseaseTrait = diseaseTrait // 病害表征
        this.form.diseaseCause = diseaseCause // 病害成因分析
        this.form.diseasePhotos = [] // 照片 => 需要处理
        this.form.diseasePhotos = await this.getFilesFn(diseasePhotos)
        this.form.diseaseIsStructure = `${diseaseIsStructure}` // 是否结构性病害
        this.form.diseaseDegree = `${diseaseDegree}` // 病害严重程度
        this.form.diseaseSpeed = `${diseaseSpeed}` // 病害发展速度
        this.form.diseaseSolveWay = diseaseSolveWay ? diseaseSolveWay.split(',') : [] // 病毒处理方式 => 需要处理
        this.form.reconditionScheme = reconditionScheme // 检修方案说明
        this.form.reconditionTime = reconditionTime // 检修实施时间
        this.form.reconditionPhoto = await this.getFilesFn(reconditionPhoto) // 检修照片 => 需要处理
        this.form.reconditionCondition = reconditionCondition // 检修完成情况
        this.form.reconditionStaff = reconditionStaff // 检修实施人员
        this.form.beforeComparison = `${beforeComparison}` // 观测对比
        this.form.beforeVerdict = `${beforeVerdict}` // 评估结论
        this.form.afterComparison = `${afterComparison}` // 检修后观测对比
        this.form.afterVerdict = `${afterVerdict}` // 检修后评估结论
        this.form.otherWork = otherWork // 本周其他相关工作
      })
    }
    getProjectList({ pageNum: 1, pageSize: 9999 }).then(res => {
      this.optionArr = res.data.projectList.rows
      this.form.projectId = this.optionArr[0].id
      return true
    }).then(res => {
      // 当前项目下的子项
      if (res) {
        this.getSonProject()
      }
    })
  },
  methods: {
    getSonProject() {
      getProjectSonList({ pageNum: 1, pageSize: 9999, projectId: this.form.projectId }).then(res => {
        this.sonProject = res.data.projectSonList.rows
      })
    },
    changeProject() {
      this.getSonProject()
    },
    async submitForm() {
      if (!this.$route.query.id) {
        const res = await saveWeekReport({
          ...this.form,
          diseasePhotos: this.form.diseasePhotos.map(item => item.id).join(',') || '', // 照片 => 需要处理
          diseaseSolveWay: this.form.diseaseSolveWay.join(','), // 病毒处理方式 => 需要处理
          reconditionPhoto: this.form.reconditionPhoto.map(item => item.id).join(',') || '' // 检修照片 => 需要处理
        })
        if (res.code === 0) {
          this.$message.success('提交成功')
          this.$router.go(-1)
        }
      } else {
        const res = await updateWeekReport({
          ...this.form,
          diseasePhotos: this.form.diseasePhotos.map(item => item.id).join(',') || '', // 照片 => 需要处理
          diseaseSolveWay: this.form.diseaseSolveWay.join(','), // 病毒处理方式 => 需要处理
          reconditionPhoto: this.form.reconditionPhoto.map(item => item.id).join(',') || '' // 检修照片 => 需要处理
        })
        if (res.code === 0) {
          this.$message.success('编辑成功')
          this.$router.go(-1)
        }
      }
    },
    handleClick() {},
    back() {
      this.activeName = `${Number(this.activeName) - 1}`
    },
    next() {
      this.activeName = `${Number(this.activeName) + 1}`
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
</style>
