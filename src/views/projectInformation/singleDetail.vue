<template>
  <div class="bgfff out_wrap">
    <div class="detail-warper">
      <div class="swiper-box">
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="(item, index) in swiperArr" :key="index">
            <img class="img-item" :src="item.url" alt="">
          </swiper-slide>
          <!-- <swiper-slide>
            <img class="img-item" src="@/assets/test/2.jpg" alt="">
          </swiper-slide>
          <swiper-slide>
            <img class="img-item" src="@/assets/test/3.jpg" alt="">
          </swiper-slide> -->
          <div slot="pagination" class="swiper-pagination" />
        </swiper>
      </div>
      <div class="single-detail">
        <el-row class="mb20">
          <el-col :span="12">
            <span class="label">单体名称：</span>
            <span>{{ detail.name }}</span>
          </el-col>
          <el-col :span="12">
            <span class="label">单体编号：</span>
            <span>{{ detail.code }}</span>
          </el-col>
        </el-row>
        <el-row class="mb20">
          <el-col :span="12">
            <span class="label">始建年代：</span>
            <span>{{ detail.beginBuildTime }}</span>
          </el-col>
          <el-col :span="12">
            <span class="label">历史沿革：</span>
            <span>{{ detail.history }}</span>
          </el-col>
        </el-row>
        <el-row class="mb20">
          <el-col :span="12">
            <span class="label">历史修缮情况：</span>
            <span>{{ detail.maintain }}</span>
          </el-col>
          <el-col :span="12">
            <span class="label">价值评估结论：</span>
            <span>{{ detail.valueAssess }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="flex">
              <span class="label">测绘图附件：</span>
              <div style="flex:1;">
                <template v-if="filesArr.length">
                  <div v-for="(item, index) in filesArr" :key="index" :class="['file-con', (filesArr.length - 1) === index ? '' : 'mb10']">
                    <div>{{ item.name }}</div>
                    <div @click="downLoad(item.id)">下载</div>
                  </div>
                </template>
                <div v-else>暂无数据</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { getArchitectureById, getFiles } from '@/api/common'
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 显示分页
        pagination: {
          el: '.swiper-pagination',
          clickable: true // 允许分页点击跳转
        },
        // 设置点击箭头
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      swiperArr: [],
      filesArr: [],
      detail: {}
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const res = await getArchitectureById({ id: this.$route.query.id })
      if (res.code === 0) {
        // 通过ids获取文件
        if (res.data && res.data.architecture.map) {
          this.filesArr = await this.getFilesFn(res.data.architecture.map)
        }
        if (res.data && res.data.architecture.photo) {
          this.swiperArr = await this.getFilesFn(res.data.architecture.photo)
        }
        this.detail = res.data.architecture
      }
    },
    getFilesFn(ids) {
      return new Promise((resolve, reject) => {
        getFiles({ ids }).then(res => {
          let arr = []
          if (res.code === 0 && res.data) {
            arr = res.data.files.map(item => {
              return {
                name: item.name,
                id: item.id,
                url: item.url2
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
.detail-warper{
  display: flex;
  .swiper-box{
    width: 500px;
    height: 350px;
    .swiper{
      width: 100%;
      height: 100%;
    }
    .img-item{
      width: 100%;
      height: 100%;
    }
  }
  .single-detail{
    flex: 1;
    padding-left: 20px;
    box-sizing: border-box;
    .label{
      width: 100px;
      display: inline-block;
      text-align: right;
      font-weight: bold;
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
