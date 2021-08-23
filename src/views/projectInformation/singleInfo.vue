<template>
  <div class="bgfff out_wrap">
    <div class="flex_between1">
      <el-form :inline="true" :model="form" size="small" label-suffix=":">
        <el-form-item label="单体名称">
          <el-input v-model="form.name" placeholder="请输入" @change="query" />
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
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
    <el-dialog :title="`${mode === 1 ? '新增' : '编辑'}单体信息`" :visible.sync="formVisible" width="650px" center>
      <el-form ref="addForm" :model="addForm" label-suffix=":" label-position="right" label-width="120px" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="单体名称" prop="name">
              <el-input v-model="addForm.name" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单体编号" prop="code">
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
            <el-form-item label="建筑面积(㎡)" prop="architectureArea">
              <el-input v-model="addForm.architectureArea" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="历史沿革" prop="history">
              <el-input v-model="addForm.history" autocomplete="off" type="textarea" :rows="4" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="历次修缮情况" prop="maintain">
              <el-input v-model="addForm.maintain" autocomplete="off" type="textarea" :rows="4" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="价值评估结论" prop="valueAssess">
              <el-input v-model="addForm.valueAssess" autocomplete="off" type="textarea" :rows="4" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <div slot="label">
                <Tips content="包括周边环境、屋面鸟瞰、各向立面、室内梁架、有价值的细部等照片。格式：jpg,png,jpeg" />现状照片
              </div>
              <upload v-model="addForm.photo" :limit="5" :type="['.jpg', '.png', '.jpeg']" :multiple="true" :is-tips="false" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <div slot="label">
                <Tips content="总平面图、各层平面图、屋顶平面图、各立面图、各剖面图、各细部图等。格式：dwg,pdf" />测绘图
              </div>
              <upload v-model="addForm.map" :limit="5" :type="['.dwg', '.pdf']" :multiple="true" :is-tips="false" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('addForm')">确 定</el-button>
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
import column from './columns/singleInfo'
import Tips from '@/components/tips.vue'
import { getProjectArchitectureList, saveArchitecture, updateArchitecture, deteleArchitectureById, getFiles } from '@/api/common'
import upload from '@/components/upload'
export default {
  name: 'SingleInfo',
  components: {
    ZfTable,
    upload,
    Tips
  },
  data() {
    return {
      form: {
        sonId: this.$route.query.sonId,
        name: ''
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
        id: '', // 单体id(用于编辑)
        sonId: this.$route.query.sonId,
        name: '', // 名称
        code: '', // 子项编号
        beginBuildTime: '', // 始建年代
        architectureArea: '', // 建筑面积
        history: '', // 历史沿革
        maintain: '', // 历次修缮情况
        valueAssess: '', // 价值评估结论
        map: [], // 测绘图（文件id，多个的情况下用“，”隔开，如：1,2,3）
        photo: [] // 周边现状（文件id，多个的情况下用“，”隔开，如：1,2,3）
      },
      rules: {
        name: [
          { required: true, message: '请输入单体名字', trigger: 'blur' }
        ]
      },
      dlfvisible: false,
      showFiles: []
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    async query() {
      const res = await getProjectArchitectureList({ ...this.form, ...this.pages })
      if (res.code === 0) {
        this.pages.total = res.data.architectureList.total
        this.tableList = res.data.architectureList.rows
      }
    },
    handlePageChange({ pageNum, pageSize, sorter: { prop, order }}) {
      this.pages.pageNum = pageNum
      this.pages.pageSize = pageSize
      this.query()
    },
    handleSubmit(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          if (this.mode === 1) {
            const res = await saveArchitecture({
              ...this.addForm,
              map: this.addForm.map.map(item => item.id).join(',') || '', // 测绘图
              photo: this.addForm.photo.map(item => item.id).join(',') || '' // 周边状况
            })
            if (res.code === 0) {
              this.formVisible = false
              this.$message.success('新增单体成功!')
              this.query()
            }
          } else {
            const res = await updateArchitecture({
              ...this.addForm,
              map: this.addForm.map.map(item => item.id).join(',') || '', // 测绘图
              photo: this.addForm.photo.map(item => item.id).join(',') || '' // 周边状况
            })
            if (res.code === 0) {
              this.formVisible = false
              this.$message.success('编辑单体成功!')
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
      this.addForm.history = row.history
      this.addForm.maintain = row.maintain
      this.addForm.valueAssess = row.valueAssess
      this.addForm.id = row.id
      // 通过ids获取文件
      this.addForm.map = await this.getFilesFn(row.map)
      this.addForm.photo = await this.getFilesFn(row.photo)
    },
    del(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await deteleArchitectureById({ architectureId: row.id })
        if (res.code === 0) {
          this.$message.success('删除单体成功!')
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
      this.addForm.history = ''
      this.addForm.maintain = ''
      this.addForm.valueAssess = ''
      this.addForm.id = ''
      // 通过ids获取文件
      this.addForm.map = []
      this.addForm.photo = []
    },
    goDetail(row) {
      this.$router.push(`/projectInformation/single-detail?id=${row.id}`)
    },
    async view(ids) {
      this.dlfvisible = true
      this.showFiles = []
      this.showFiles = await this.getFilesFn(ids)
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
    downLoad(id) {
      const link = document.createElement('a')
      link.href = `${process.env.VUE_APP_BASE_API}/file/download?id=${id}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-class{
  cursor: pointer;
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
