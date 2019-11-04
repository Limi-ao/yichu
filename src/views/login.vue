<template>
  <div class="login">
     <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
       <div class="title-top">智能桥隧监控系统</div>
        <div class="logo-img">
          <img src="../assets/logo.png">
        </div>
        <h3 class="title">T-SICS</h3>
        <!--username-->
        <el-form-item prop="username">
          <el-input type="text" ref="username" v-model="loginForm.username" autocomplete="off" placeholder="用户名">
            <i slot="prefix" class="el-icon-s-custom" style="color:#09f"></i>
          </el-input>
        </el-form-item>
        <!--password-->
         <el-form-item prop="password">
          <el-input type="password"  ref="password" v-model="loginForm.password" autocomplete="off" placeholder="请输入密码" @keyup.enter.native="handelLogin" >
           <i slot="prefix" class="el-icon-lock" style="color:#09f"></i>
          </el-input>
        </el-form-item>
       
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%" @click.native.prevent="handelLogin" :loading="logining" >登录</el-button>
        </el-form-item>

  </el-form>
  

  </div>

</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        logining:false,
        loginForm:{
          username:'',
          password:''
        },
        loginRules:{
           password: [{ required: true, message: '请输入密码', trigger: 'blur'  }]
        },
        
      }
    },
    mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
    methods:{
      handelLogin(){
         this.$refs.loginForm.validate(valid => {
         if (valid) {
          this.logining=true
          // axios.post('http://127.0.0.1:8888/tunnelMonitor/login.htm',{username:this.loginForm.username,password:this.loginForm.password,withCredentials : true}).then(res=>{

          // })
         if(this.loginForm.username=='admin' && this.loginForm.password=='123456'){
           sessionStorage.setItem('login',1);
           sessionStorage.setItem('token','admin')
           this.$router.push("/home")
         }
        } 
      })
      },
        },
  
  }
  //const querystring = require('querystring');
//axios.post('http://something.com/', querystring.stringify({ foo: 'bar' }));

</script>


<style scoped >
.login{
  position: relative;
}
.login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    }
.title-top{
  position: absolute;
  /* top: 155px;
  left: 820px; */
  margin-left: 1px;
  margin-top:-125px;
  font-size: 36px;
  color: #fff;
}
.title {
    font-size: 34px;
    margin: -48px auto 40px 90px;
    text-align: center;
    color: #fff;
    }
i{
    font-size: 14px;
    margin-left: 8px;
    }
.remember {
    margin: 0px 0px 35px 0px;
    }
.logo-img{
      margin-left:20px;
      margin-bottom: -35px
    }
  
</style>
