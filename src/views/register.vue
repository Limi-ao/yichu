<template>
  <div>
    <div class="login-box flex-column flex-center">
      <div class="login-icon">注册</div>
      <div class="flex">
        <div class="flex-center icon"><i class="iconfont icon-yonghuming"></i></div>
        <input type="text" placeholder="输入手机号" v-model="username">
      </div>
      <div class="flex">
        <div class="flex-center icon"><i class="iconfont icon-icon2"></i></div>
        <input type="password" placeholder="输入密码" v-model="password1">
      </div>
      <div class="flex">
        <div class="flex-center icon"><i class="iconfont icon-icon2"></i></div>
        <input type="password" placeholder="再次输入密码" v-model="password2">
      </div>
      <button @click="register">注册</button>
      <div class="flex-end forget">
          <span class="forgetPassword">
            <router-link to="/l-r/login"> 已有账号去登录</router-link>
          </span>
      </div>
    </div>
  </div>
</template>

<script>
  import CryptoJS from 'crypto-js'
  export default {
    data() {
      return {
        username: '',
        password1: '',
        password2: ''
      }
    },
    methods: {
      //3DES加密 Pkcs7填充方式
      encryptByDES(message, key){
        const keyHex = CryptoJS.enc.Utf8.parse(key);
        const encrypted = CryptoJS.TripleDES.encrypt(message, keyHex, { 
        iv:CryptoJS.enc.Utf8.parse('01234567'), 
        mode: CryptoJS.mode.CBC, 
        padding: CryptoJS.pad.Pkcs7});
        return encrypted.toString();
      },

      register(){
        if(this.username.trim().length===0){
          this.$message.error('请输入用户名！')
          return 
        }
        if(this.password1.trim().length>0&&this.password1!=this.password2){
          this.$message.error('2次密码不一致！')
          return
        }
        const _key = 'tyboot' + this.username.trim() + this.username.trim()
        const _password = this.password1.trim()
        this.$post(this.$api.register,{
          mobile:this.username,
          password:this.encryptByDES(_password,_key),
        }).then(res=>{
          console.log(res)
          if(res.code == 0){
            localStorage.setItem('user', JSON.stringify(res.data));
            // localStorage.setItem('token',res.data.token);
            // sessionStorage.setItem('token', res.data.token);
            this.$message.success('注册成功！');
            setTimeout(()=>{
              this.$router.push('/');
            },2000)
          }else{
            this.$message.error(res.msg);
          }
        })
      }
    },
    created() {

    }
  }
</script>

<style scoped>

  .login-box {
    position: absolute;
    right: 50%;
    top: 50%;
    margin-top: 150px;
    width: 500px;
    height: 400px;
    background: rgba(255, 255, 255, 0.4);
  }

  input {
    border: 1px solid #eaeaea;
    width: 300px;
    height: 40px;
    background: #fff;
    border-left: none;

  }

  .icon {
    width: 40px;
    height: 40px;
    border: 1px solid #eaeaea;
    border-right: none;
    background: #fff;
  }

  .flex {
    margin-bottom: 20px;
  }

  .circle {
    /*width: 5px;*/
    /*height: 5px;*/
    height: 20px;
    font-size: 12px;
    width: 80px;
    line-height: 20px;
    /*border-radius: 50%;*/
    /*background: #fff;*/
    position: relative;
    color: #fff;
  }

  .circle:before {
    position: absolute;
    content: '';
    display: block;
    width: 100px;
    height: 2px;
    background: linear-gradient(right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
    left: -120px;
    top: 9px;
  }

  .circle:after {
    position: absolute;
    content: '';
    display: block;
    width: 100px;
    height: 2px;
    background: linear-gradient(left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
    right: -120px;
    top: 9px;
  }

  .login-icon {
    font-size: 30px;
    padding: 0px 0 30px;
    color: #3d4749;
  }

  button {
    width: 340px;
    height: 40px;
    border: none;
    background: #3d4749;
    color: #fff;
    margin-bottom: 10px;
  }

  .other .iconfont {
    font-size: 40px;
    color: #fff;
    padding: 10px 20px;
    cursor: pointer;
  }

  .other .icon-yanzhengma, .other .icon-icon2 {
    color: #3d4749;
  }

  .other .icon-weixin {
    color: #8ee615;
  }

  .other .icon-icon2 {
    color: #eaeaea;
  }

  .forget {
    color: #fff;
    width: 340px;
  }

  .forgetPassword {
    cursor: pointer;
  }
</style>
