<template>
  <div class="bgfff out_wrap">
    <el-form ref="form" :model="form" label-width="115px" label-suffix=":">
      <div class="top-select">
        <el-form-item label="项目" label-width="50px">
          <el-select v-model="form.projectId" placeholder="请选择" class="ml10">
            <el-option v-for="item in optionArr" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="子项" label-width="60px">
          <el-select v-model="form.son" placeholder="请选择" class="ml10">
            <el-option v-for="item in optionArr" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="单体" label-width="60px">
          <el-select v-model="form.single" placeholder="请选择" class="ml10">
            <el-option v-for="item in optionArr" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <div class="ml20">
          <el-button type="primary" @click="add">添加</el-button>
        </div>
      </div>
      <div class="table-custom">
        <div class="head flex">
          <div class="th flex1">所属项目</div>
          <div class="th flex1">子项</div>
          <div class="th flex1">单体</div>
          <div class="th flex1">实施日期</div>
          <div class="th flex1">巡查及其延伸工作</div>
          <div class="th flex1">单体列表实施人员</div>
          <div class="th flex1">详情</div>
          <div class="th flex1">其他相关工作</div>
          <div class="th flex1">操作</div>
        </div>
        <div class="body">
          <template v-if="addForm.info.length">
            <div v-for="(item, index) in addForm.info" :key="item.key" class="tr flex">
              <div class="td flex1">{{ item.project }}</div>
              <div class="td flex1">{{ item.son }}</div>
              <div class="td flex1">{{ item.single }}</div>
              <div class="td flex1">
                <el-form-item label-width="0">
                  <el-input v-model="item.time" placeholder="请输入日期" style="width:120px;" />
                </el-form-item>
              </div>
              <div class="td flex1">
                <el-form-item label-width="0">
                  <el-select v-model="item.work" placeholder="请选择">
                    <el-option label="常规巡查" value="1" />
                    <el-option label="定期观测" value="2" />
                    <el-option label="专业检修" value="3" />
                    <el-option label="检修效果评估" value="4" />
                  </el-select>
                </el-form-item>
              </div>
              <div class="td flex1">{{ item.people }}</div>
              <div class="td flex1">
                <a class="active_color" @click="view(item, index)">查看</a>
              </div>
              <div class="td flex1">
                <el-form-item label-width="0">
                  <el-input v-model="item.otherWork" placeholder="请输入" style="width:120px;" />
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
      <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
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
      </el-tabs> -->
      <div class="center mt20">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="clear">清除</el-button>
      </div>
    </el-form>
    <!-- 详情弹框form表单 -->
    <el-dialog :title="title[1]" :visible.sync="detailVisible" width="800px" center>
      <el-form ref="addForm" :model="detailForm" label-suffix=":" label-position="right" label-width="120px">
        <div v-if="title[0] === '1'">
          <el-row>
            <el-col :span="12">
              <el-form-item label="巡查工具">
                <el-input v-model="detailForm.patrolTool" class="inputWith" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="巡查内容">
                <el-input v-model="detailForm.patrolContent" class="inputWith" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="档案留存">
                <el-radio-group v-model="detailForm.patrolRecord">
                  <el-radio :label="1">照片</el-radio>
                  <el-radio :label="2">图纸</el-radio>
                  <el-radio :label="3">文字</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="文件" prop="area">
                <upload v-model="detailForm.file" :limit="5" :type="['.png', '.jpg', '.jpeg', '.JPG']" :multiple="true" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="是否发现新病害">
                <el-radio-group v-model="detailForm.isVirus">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
                <el-button v-if="detailForm.isVirus === 1" class="ml20" type="primary" @click="addVirus">添加</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 病毒害动态新增 -->
          <div v-if="detailForm.isVirus === 1">
            <div v-for="(item, index) in detailForm.info" :key="index" class="dynamic-warper">
              <div class="head-tit flex_between mb10"><span class="left">病毒害{{ index + 1 }}</span> <span v-if="detailForm.info.length > 1" class="right del pointer" @click="delVirus(item)">删除</span></div>
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
                  <el-form-item label="照片">
                    <upload v-model="item.diseasePhotos" :limit="5" :type="['.png', '.jpg', '.jpeg', '.JPG']" :multiple="true" />
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
              <el-form-item label="照片">
                <upload v-model="detailForm.phone" :limit="5" :type="['.png', '.jpg', '.jpeg', '.JPG']" :multiple="true" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-if="title[0] === '3'">
          <el-row>
            <el-col :span="12">
              <el-form-item label="检修方案说明">
                <el-input v-model="detailForm.reconditionScheme" class="inputWith" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检修实施时间">
                <el-input v-model="detailForm.reconditionTime" class="inputWith" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="检修完成状况">
                <el-input v-model="detailForm.reconditionCondition" class="inputWith" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检修实施人员">
                <el-input v-model="detailForm.reconditionStaff" class="inputWith" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="照片">
                <upload v-model="detailForm.reconditionPhoto" :limit="5" :type="['.png', '.jpg', '.jpeg', '.JPG']" :multiple="true" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注">
                <el-input v-model="detailForm.note" class="inputWith" type="textarea" :rows="6" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-if="title[0] === '4'">
          <el-row>
            <el-col :span="12">
              <el-form-item label="检修后观测对比">
                <el-select v-model="detailForm.afterComparison" placeholder="请选择" class="inputWith">
                  <el-option label="效果良好" value="1" />
                  <el-option label="有一定效果" value="2" />
                  <el-option label="无效" value="3" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检修后评估结论">
                <el-select v-model="detailForm.afterVerdict" placeholder="请选择" class="inputWith">
                  <el-option label="持续巡查评估" value="1" />
                  <el-option label="再次检修" value="2" />
                  <el-option label="检测鉴定" value="3" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="观测图片">
                <upload v-model="detailForm.afterPhone" :limit="5" :type="['.png', '.jpg', '.jpeg', '.JPG']" :multiple="true" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="detailVisible = false">确定</el-button>
      </div>
    </el-dialog>
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
        // TODO
        son: '',
        single: '',
        // TODO
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
      },
      // TODO 2021-06-27修改
      addForm: {
        info: [{
          project: 'test1',
          son: 'test2',
          single: 'test3',
          time: '',
          work: '',
          people: '左千',
          otherWork: '',
          key: Date.now()
        }]
      },
      // 详情弹框form表单
      title: '查看',
      detailVisible: false,
      detailForm: {
        patrolTool: '', // 巡查工具
        patrolContent: '', // 巡查内容
        patrolRecord: '', // 档案留存
        isVirus: 1, // 是否病毒还
        file: [], // 文件
        info: [{
          diseasePart: '', // 病害部位
          diseaseType: '', // 病害类型
          diseaseTrait: '', // 病害表征
          diseaseCause: '', // 病害成因分析
          diseasePhotos: [], // 照片 => 需要处理
          diseaseIsStructure: '', // 是否结构性病害
          diseaseDegree: '', // 病害严重程度
          diseaseSpeed: '', // 病害发展速度
          diseaseSolveWay: ['1'] // 病毒处理方式 => 需要处理
        }],
        beforeComparison: '', // 观测对比
        beforeVerdict: '', // 评估结论
        phone: [], // 照片
        reconditionScheme: '', // 检修方案说明
        reconditionTime: '', // 检修实施时间
        reconditionPhoto: [], // 检修照片 => 需要处理
        reconditionCondition: '', // 检修完成情况
        reconditionStaff: '', // 检修实施人员
        note: '', // 备注
        afterComparison: '', // 检修后观测对比
        afterVerdict: '', // 检修后评估结论
        afterPhone: [] // 观测图片
      }
    }
  },
  mounted() {
    if (this.$route.query.id) {
      getWeekReportByIdDetail({ id: this.$route.query.id }).then(async(res) => {
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
    },
    add() {
      if (!this.form.projectId) {
        this.$message.error('请选择项目')
        return
      }
      if (!this.form.son) {
        this.$message.error('请选择子项')
        return
      }
      if (!this.form.single) {
        this.$message.error('请选择单体')
        return
      }
      this.addForm.info.push({
        project: 'test1',
        son: 'test2',
        single: 'test3',
        time: '',
        work: '',
        people: '左千',
        otherWork: '',
        key: Date.now()
      })
    },
    view(item, index) {
      if (!this.addForm.info[index].work) {
        this.$message.error('请选择巡查及其延伸工作')
        return
      }
      switch (this.addForm.info[index].work) {
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
      this.detailVisible = true
    },
    del(item) {
      var index = this.addForm.info.indexOf(item)
      if (index !== -1) {
        this.addForm.info.splice(index, 1)
      }
    },
    clear() {
      this.addForm.info = []
    },
    addVirus() {
      this.detailForm.info.push({
        diseasePart: '', // 病害部位
        diseaseType: '', // 病害类型
        diseaseTrait: '', // 病害表征
        diseaseCause: '', // 病害成因分析
        diseasePhotos: [], // 照片 => 需要处理
        diseaseIsStructure: '', // 是否结构性病害
        diseaseDegree: '', // 病害严重程度
        diseaseSpeed: '', // 病害发展速度
        diseaseSolveWay: ['1'] // 病毒处理方式 => 需要处理
      })
    },
    delVirus(item) {
      var index = this.detailForm.info.indexOf(item)
      if (index !== -1) {
        this.detailForm.info.splice(index, 1)
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
