<template>
  <div class="login wh100 flex_center hidden pr">
    <div class="wrap white flex">
      <div class="login_left">
        <img src="@/assets/login_left.jpg" class="login_left_img">
      </div>
      <div class="login_right flex1">
        <div class="bigTit">welcome~</div>
        <div class="subTit">欢迎来到文物建筑防护性保护项目!</div>
        <el-form ref="form" :model="form" :rules="rules" class="login-form">
          <el-form-item prop="account">
            <el-input v-model="form.account" type="text" placeholder="请输入账号" clearable prefix-icon="el-icon-user" @keyup.native.13="next" />
          </el-form-item>
          <el-form-item prop="pass">
            <el-input ref="pass" v-model="form.pass" type="password" placeholder="请输入密码" show-password prefix-icon="el-icon-lock" @keyup.native.13="submitForm('form')" />
          </el-form-item>
          <el-button type="primary" class="login_btn w100 fs18" @click="submitForm('form')">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// import { get, set } from '@/utils/storage'
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
        account: '',
        pass: ''
      },
      rules: {
        account: [{ required: true, message: '请输入账号', trigger: 'change' }],
        pass: [{ required: true, message: '请输入密码', trigger: 'change' }]
      }
    }
  },
  methods: {
    next() {
      this.$refs.pass.focus()
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.$router.replace('/projectInformation/list')
          // const res = await this.loginFn(this.form)
          // if (res.code === 200) {
          //   if (this.timer) {
          //     clearInterval(this.timer)
          //   }
          //   this.login(res.data, 1)
          // }
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
  background-image: url('../../assets/login_bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .wrap{
    width: 900px;
    height: 480px;
    border-radius: 10px;
    box-shadow: 0 1px 14px 2px rgba(45, 140, 240, 0.09);
    .login_left{
      width: 420px;
      height: 480px;
    }
    .login_left_img{
      border-radius: 10px 0 0 10px;
      width: 100%;
    }
    .login_right{
      padding: 30px 50px;
      .login-form{
        .el-input--medium .el-input__inner{
          height: 66px;
          line-height: 66px;
          border: none;
          border-radius: 0;
          border-bottom: 1px solid #e8e8e8;
        }
        .el-input__prefix{
          left: -5px;
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
      }
      .subTit{
        font-size: 24px;
        margin: 20px 0;
      }
    }
  }
}
</style>
