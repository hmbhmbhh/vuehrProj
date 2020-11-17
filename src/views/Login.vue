<template>
  <div>
    <el-form ref="loginRef" :rules="rules" :model="loginForm" class="loginContainer">
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-checkbox class="loginRemember" v-model="checked"></el-checkbox>
      <el-button type="primary" style="width: 100%" @click="submitLogin">登陆</el-button>
    </el-form>

  </div>
</template>

<script>
// 每次调用postKeyValueRequest等方法都太麻烦，把方法引用做一个插件，可以直接用this获取，首先去main.js配置
// 这样以下方式可以不用了，直接this.方法名就可以

// import {postKeyValueRequest} from "@/utils/api";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123"
      },
      checked: true,
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    submitLogin() {
      this.$refs.loginRef.validate((valid) => {
        if (valid) {
          //下面这种方式需要每次引入
          // postKeyValueRequest('doLogin', this.loginForm).then(resp => {
          //这个把方法弄成插件，直接this调用，哪里都可以，详见main.js配置
          this.postKeyValueRequest('doLogin', this.loginForm).then(resp => {
            if (resp) {
              alert(JSON.stringify(resp))
              //  把用户的数据保存下来，保存到sessionstorage,这个关闭页面数据就没有了
              //  语法：key:value  都是字符串
              window.sessionStorage.setItem("user", JSON.stringify(resp.obj));
              //进行跳转页面，获取当前vue对象的router 对象
              //跳转有两个方法，push方法（页面右箭头可以回退，不合适）与replace方法（没有回退箭头）
              this.$router.replace('/home')
            }
          })
          // alert('submit!');
        } else {
          this.$message.error('请输入必填项');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.loginTitle {
  margin: 15px auto 20px auto;
  text-align: center;
  color: gainsboro;
}

.loginRemember {
  text-align: left;
  margin: 0px 0px 15px 0px;
}
</style>