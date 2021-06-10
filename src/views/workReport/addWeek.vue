<template>
  <div class="bgfff out_wrap">
    <div class="top-select mb20">
      <span>项目:</span>
      <el-select v-model="project" placeholder="请选择" class="ml10">
        <el-option label="项目一" value="shanghai" />
        <el-option label="项目二" value="beijing" />
      </el-select>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="本周巡查" name="1">
        <div class="form-warper">
          <el-form ref="form" :model="form" label-width="80px" label-suffix=":">
            <el-row>
              <el-col :span="12">
                <el-form-item label="巡查对象">
                  <el-select v-model="form.region" placeholder="请选择" class="inputWith">
                    <el-option label="test1" value="shanghai" />
                    <el-option label="test2" value="beijing" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="巡查人员">
                  <el-select v-model="form.region" placeholder="请选择" class="inputWith">
                    <el-option label="李磊" value="shanghai" />
                    <el-option label="左千" value="beijing" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="主要工具">
                  <el-input v-model="form.name" class="inputWith" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="档案留存">
                  <el-checkbox-group v-model="form.type">
                    <el-checkbox label="1" name="type">照片</el-checkbox>
                    <el-checkbox label="2" name="type">图纸</el-checkbox>
                    <el-checkbox label="3" name="type">文字</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="巡查内容">
                  <el-input v-model="form.desc" class="inputWith" type="textarea" :rows="6" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="巡查发现新病害及其评估" name="2">
        <div class="form-warper">
          <el-form ref="form" :model="form1" label-width="110px" label-suffix=":">
            <div class="head-tit mb10">第一层级: 子项选择</div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="子项">
                  <el-select v-model="form.region" placeholder="请选择" class="inputWith">
                    <el-option label="李磊" value="shanghai" />
                    <el-option label="左千" value="beijing" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="head-tit mb10">第二层级: 病害表征和成因</div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="病害部位">
                  <el-input v-model="form1.name" class="inputWith" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="病害类型">
                  <el-input v-model="form1.name" class="inputWith" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="病害表征">
                  <el-input v-model="form1.name" class="inputWith" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="成因分析">
                  <el-input v-model="form1.name" class="inputWith" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="照片">
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
            <div class="head-tit mb10">第三层级: 病害表严重性评估</div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="结构性病害">
                  <el-select v-model="form1.region" placeholder="请选择" class="inputWith">
                    <el-option label="李磊" value="shanghai" />
                    <el-option label="左千" value="beijing" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="病害严重程度">
                  <el-select v-model="form1.region" placeholder="请选择" class="inputWith">
                    <el-option label="李磊" value="shanghai" />
                    <el-option label="左千" value="beijing" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="疾病发展速度">
                  <el-select v-model="form1.region" placeholder="请选择" class="inputWith">
                    <el-option label="李磊" value="shanghai" />
                    <el-option label="左千" value="beijing" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="head-tit mb10">第四层级: 处理方式(多选)</div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="处理方式">
                  <el-checkbox-group v-model="form1.type">
                    <el-checkbox label="1" name="type">无需任何处理</el-checkbox>
                    <el-checkbox label="2" name="type">检修鉴定</el-checkbox>
                    <el-checkbox label="3" name="type">修缮工程</el-checkbox>
                    <el-checkbox label="4" name="type">顶秀巡查观测</el-checkbox>
                    <el-checkbox label="5" name="type">专项监测</el-checkbox>
                    <el-checkbox label="6" name="type">专业检修</el-checkbox>
                    <el-checkbox label="7" name="type">抢险支护</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="新开展专业检修项目" name="3">
        <div class="form-warper">
          <el-form ref="form" :model="form2" label-width="120px" label-suffix=":">
            <el-row>
              <el-col :span="12">
                <el-form-item label="检修方案说明">
                  <el-input v-model="form2.name" class="inputWith" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="检修实施时间">
                  <el-date-picker v-model="form2.time" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" :editable="false" :value-format="'yyyy-MM-dd'" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="检修完成状况">
                  <el-input v-model="form2.name" class="inputWith" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="检修实施人员">
                  暂无
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="照片">
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
        </div>
      </el-tab-pane>
      <el-tab-pane label="前期巡查既有疾病定期评估" name="4">
        <div class="form-warper">
          <el-form ref="form" :model="form3" label-width="80px" label-suffix=":">
            <el-row>
              <el-col :span="12">
                <el-form-item label="观测对比">
                  <el-select v-model="form3.region" placeholder="请选择" class="inputWith">
                    <el-option label="test1" value="shanghai" />
                    <el-option label="test2" value="beijing" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="评估结论">
                  <el-select v-model="form3.region" placeholder="请选择" class="inputWith">
                    <el-option label="李磊" value="shanghai" />
                    <el-option label="左千" value="beijing" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="前期专业检修后续效果评估" name="5">
        <div class="form-warper">
          <el-form ref="form" :model="form4" label-width="80px" label-suffix=":">
            <el-row>
              <el-col :span="12">
                <el-form-item label="观测对比">
                  <el-select v-model="form4.region" placeholder="请选择" class="inputWith">
                    <el-option label="test1" value="shanghai" />
                    <el-option label="test2" value="beijing" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="评估结论">
                  <el-select v-model="form4.region" placeholder="请选择" class="inputWith">
                    <el-option label="李磊" value="shanghai" />
                    <el-option label="左千" value="beijing" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="center">
      <el-button type="primary">提交</el-button>
      <el-button>取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      project: '',
      activeName: '1',
      form: {
        type: ['1']
      },
      form1: {
        type: ['1', '2']
      },
      form2: {},
      form3: {},
      form4: {},
      fileList: [
        { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
      ]
    }
  },
  methods: {
    handleClick() {},
    // 文件上传
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
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
