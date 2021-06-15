<template>
  <div class="login wh100 flex_center hidden pr">
    <div class="wrap flex">
      <div class="login_left">
        <!-- <img src="@/assets/login_left.jpg" class="login_left_img"> -->
        <div class="img_warper">
          <img src="@/assets/login-img/A.jpg" alt="">
          <!-- <span></span> -->
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
          <el-button type="primary" class="login_btn w100 fs18" round @click="submitForm('form')">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    // const validateMobile = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error('请输入手机号'))
    //   } else {
    //     if (!/^1[3456789]\d{9}$/.test(value)) {
    //       callback(new Error('请输入正确的手机号'))
    //     } else {
    //       callback()
    //     }
    //   }
    // }
    return {
      form: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [{ required: true, message: '请输入账号', trigger: 'change' }],
        password: [{ required: true, message: '请输入密码', trigger: 'change' }]
      }
    }
  },
  methods: {
    ...mapActions('user', ['loginFn']),
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.loginFn(this.form)
          if (res.code === 0) {
            if (!res.data.codes.length) {
              this.$message.error('当前用户没有权限，请联系平台管理员')
              return
            }
            this.$router.replace('/projectInformation/list')
            // this.$router.replace('/transfer')
          }
        } else {
          return false
        }
      })
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
      width: 630px;
      display: flex;
      flex-wrap: wrap;
      .img_warper{
        width: calc(calc(100% / 3) - 10px);
        margin:5px;
        display: flex;
        justify-content: center;
        img{
          width: 200px;
          height: 200px;
          border-radius: 4px;
        }
      }
    }
    .login_right{
      border-radius: 10px;
      padding: 30px 50px;
      margin-left: 20px;
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
          margin-top: 35px;
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
</style>
