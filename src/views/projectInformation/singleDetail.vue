<template>
  <div class="bgfff out_wrap">
    <div class="detail-warper">
      <div class="swiper-box">
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide>
            <img class="img-item" src="@/assets/test/1.jpg" alt="">
          </swiper-slide>
          <swiper-slide>
            <img class="img-item" src="@/assets/test/2.jpg" alt="">
          </swiper-slide>
          <swiper-slide>
            <img class="img-item" src="@/assets/test/3.jpg" alt="">
          </swiper-slide>
          <div slot="pagination" class="swiper-pagination" />
        </swiper>
      </div>
      <div class="single-detail">
        <el-row class="mb20">
          <el-col :span="12">
            <span class="label">单体编号：</span>
            <span>hsaksajajkh</span>
          </el-col>
          <el-col :span="12">
            <span class="label">单体名称：</span>
            <span>睡觉睡觉</span>
          </el-col>
        </el-row>
        <el-row class="mb20">
          <el-col :span="12">
            <span class="label">始建年代：</span>
            <span>1900-12-09</span>
          </el-col>
          <el-col :span="12">
            <span class="label">历史沿革：</span>
            <span>睡觉睡觉</span>
          </el-col>
        </el-row>
        <el-row class="mb20">
          <el-col :span="12">
            <span class="label">历史修缮情况：</span>
            <span>hsaksajajkh</span>
          </el-col>
          <el-col :span="12">
            <span class="label">价值评估结论：</span>
            <span>睡觉睡觉</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="flex">
              <span class="label">测绘图附件：</span>
              <div style="flex:1;">
                <div class="file-con mb10">
                  <div>ghaj.jpg</div>
                  <div>下载</div>
                </div>
                <div class="file-con">
                  <div>ghaj1.jpg</div>
                  <div>下载</div>
                </div>
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
      }
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
