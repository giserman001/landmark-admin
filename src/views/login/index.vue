<template>
  <div class="login wh100 flex_center hidden pr">
    <div class="wrap flex">
      <div class="login_left">
        <div class="img_warper">
          <img src="@/assets/login-img/A.jpg" alt="">
        </div>
        <div class="img_warper">
          <img src="@/assets/login-img/B.jpg" alt="">
        </div>
        <div class="img_warper">
          <img src="@/assets/login-img/C.jpg" alt="">
        </div>
        <div class="img_warper">
          <img src="@/assets/login-img/D.jpg" alt="">
        </div>
        <div class="img_warper">
          <img src="@/assets/login-img/E.jpg" alt="">
        </div>
        <div class="img_warper">
          <img src="@/assets/login-img/F.jpg" alt="">
        </div>
        <div class="img_warper">
          <img src="@/assets/login-img/G.jpg" alt="">
        </div>
        <div class="img_warper">
          <img src="@/assets/login-img/H.jpg" alt="">
        </div>
        <div class="img_warper">
          <img src="@/assets/login-img/I.jpg" alt="">
        </div>
      </div>
      <div class="login_right">
        <div class="bigTit">welcome~</div>
        <div class="subTit">文物建筑预防性保护项目检查评估工作平台</div>
        <el-form ref="form" :model="form" :rules="rules" class="login-form">
          <el-form-item prop="userName">
            <el-input v-model="form.userName" type="text" placeholder="请输入账号" clearable prefix-icon="el-icon-user" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input ref="password" v-model="form.password" type="password" placeholder="请输入密码" show-password prefix-icon="el-icon-lock" @keyup.native.13="submitForm('form')" />
          </el-form-item>
          <el-form-item prop="code" class="yzmCode">
            <el-input v-model="form.code" style="width:280px;" type="text" placeholder="请输入验证码(不区分大小写)" />
            <canvas id="canvas" class="canvasClass" width="100" height="50" @click="updateCode" />
          </el-form-item>
          <el-button type="primary" class="login_btn w100 fs18" round @click="submitForm('form')">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { encryption } from '@/utils/fn'
export default {
  data() {
    const validateCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入验证码'))
      } else if (value !== this.form.show_num.join('')) {
        callback(new Error('验证码不正确'))
      } else {
        callback()
      }
    }
    return {
      form: {
        userName: '',
        password: '',
        show_num: [], // 不用传送给后端
        code: '' // 不用传送给后端
      },
      rules: {
        userName: [{ required: true, message: '请输入账号', trigger: 'change' }],
        password: [{ required: true, message: '请输入密码', trigger: 'change' }],
        code: [{ required: true, validator: validateCode, trigger: 'change' }]
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.draw()
    })
  },
  methods: {
    ...mapActions('user', ['loginFn']),
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.loginFn({ userName: this.form.userName, password: encryption(this.form.password) })
          if (res.code === 0) {
            if (!res.data.codes.length) {
              this.$message.error('当前用户没有权限，请联系平台管理员')
              return
            }
            this.$router.replace('/projectInformation/list')
          }
        } else {
          return false
        }
      })
    },
    updateCode() {
      this.draw()
    },
    draw() {
      var canvas = document.getElementById('canvas')// 获取到canvas的对象
      var canvas_width = 100
      var canvas_height = 50
      var context = canvas.getContext('2d')// 获取到canvas画图的环境
      canvas.width = canvas_width
      canvas.height = canvas_height
      var sCode = 'A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0'
      var aCode = sCode.split(',')
      var aLength = aCode.length// 获取到数组的长度

      for (var i = 0; i <= 3; i++) {
        var j = Math.floor(Math.random() * aLength)// 获取到随机的索引值
        var deg = Math.random() * 30 * Math.PI / 180// 产生0~30之间的随机弧度
        var txt = aCode[j]// 得到随机的一个内容
        this.form.show_num[i] = txt.toLowerCase()
        var x = 10 + i * 20// 文字在canvas上的x坐标
        var y = 20 + Math.random() * 8// 文字在canvas上的y坐标
        context.font = 'bold 23px 微软雅黑'
        context.translate(x, y)
        context.rotate(deg)
        context.fillStyle = this.randomColor()
        context.fillText(txt, 0, 0)
        context.rotate(-deg)
        context.translate(-x, -y)
      }
      for (var n = 0; n <= 5; n++) { // 验证码上显示线条
        context.strokeStyle = this.randomColor()
        context.beginPath()
        context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height)
        context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height)
        context.stroke()
      }
      for (var m = 0; m <= 30; m++) { // 验证码上显示小点
        context.strokeStyle = this.randomColor()
        context.beginPath()
        var p = Math.random() * canvas_width
        var q = Math.random() * canvas_height
        context.moveTo(p, q)
        context.lineTo(p + 1, q + 1)
        context.stroke()
      }
    },
    randomColor() { // 得到随机的颜色值
      var r = Math.floor(Math.random() * 256)
      var g = Math.floor(Math.random() * 256)
      var b = Math.floor(Math.random() * 256)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    }
  }
}
</script>
<style lang="scss">
.login{
  min-width: 1260px;
  min-height: 600px;
  // background-image: linear-gradient(180deg,#63B8FF 0,#5CACEE 65%,#4876FF);
  // background-image: url('../../assets/login_bg.png');
  background-image: url('../../assets/bg_index.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  .wrap{
    align-items: center;
    .login_left{
      width: 455px;
      display: flex;
      flex-wrap: wrap;
      .img_warper{
        width: calc(calc(100% / 3) - 10px);
        margin:5px 0;
        display: flex;
        justify-content: center;
        img{
          width: 132px;
          height: 132px;
          border-radius: 4px;
        }
      }
    }
    .login_right{
      border-radius: 10px;
      padding: 30px 40px;
      width: 480px;
      background: rgba(255, 255, 255, 0.5);
      .login-form{
        .el-input--medium .el-input__inner{
          height: 50px;
          line-height: 50px;
          border: none;
          border-radius: 25px;
          border-bottom: 1px solid #e8e8e8;
        }
        .el-input--medium .el-input__icon{
          font-size: 17px;
          padding-top: 2px;
        }
        .login_btn{
          height: 46px;
          // margin-top: 35px;
        }
      }
      .bigTit{
        font-size: 60px;
        color: #fff;
      }
      .subTit{
        font-size: 20px;
        margin: 20px 0;
        color: #fff;
      }
    }
  }
}
.canvasClass{
  vertical-align:middle;
  cursor: pointer;
}
</style>
