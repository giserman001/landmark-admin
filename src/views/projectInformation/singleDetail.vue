<template>
  <div class="bgfff out_wrap">
    <div class="detail-warper">
      <div class="swiper-box">
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="(item, index) in swiperArr" :key="index">
            <img class="img-item" :src="item.url" alt="">
          </swiper-slide>
          <div slot="pagination" class="swiper-pagination" />
        </swiper>
      </div>
      <div class="single-detail">
        <div class="flex mb20">
          <div class="label">单体名称：</div>
          <div>{{ detail.name }}</div>
        </div>
        <div class="flex mb20">
          <div class="label">单体编号：</div>
          <div>{{ detail.code }}</div>
        </div>
        <div class="flex mb20">
          <div class="label">始建年代：</div>
          <div>{{ detail.beginBuildTime }}</div>
        </div>
        <div class="flex mb20">
          <div class="label">历史沿革：</div>
          <div>{{ detail.history }}</div>
        </div>
        <div class="flex mb20">
          <div class="label">历史修缮情况：</div>
          <div>{{ detail.maintain }}</div>
        </div>
        <div class="flex mb20">
          <div class="label">价值评估结论：</div>
          <div>{{ detail.valueAssess }}</div>
        </div>
        <div class="flex mb20">
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
      </div>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { getArchitectureById, getFiles } from '@/api/common'
import downFile from '@/utils/downFile'
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
      downFile(id)
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
      flex-shrink: 0;
    }
  }
}
.file-con{
  display: flex;
  &>div{
    &:last-child{
      color: #3a8ee6;
      cursor: pointer;
      margin-left: 20px;
    }
  }
}
</style>
