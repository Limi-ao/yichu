<template>
  <el-container style="padding-top: 40px;height: 100%">
    <el-aside width="200px" class="aside">
      <el-menu
        router
        :default-active="$route.path"
        class="el-menu-vertical-demo"
      >
        <el-menu-item index="/info/basic" >
          <i class="el-icon-menu"></i>
          <span slot="title">基本信息</span>
        </el-menu-item>

        <el-menu-item index="/info/order">
          <i class="el-icon-document"></i>
          <span slot="title">订单信息</span>
        </el-menu-item>
        <el-menu-item index="/info/password">
          <i class="el-icon-goods"></i>
          <span slot="title">修改密码</span>
        </el-menu-item>
        <!--<el-menu-item index="3" disabled>-->
        <!--<i class="el-icon-document"></i>-->
        <!--<span slot="title">导航三</span>-->
        <!--</el-menu-item>-->
        <!--<el-menu-item index="4">-->
        <!--<i class="el-icon-setting"></i>-->
        <!--<span slot="title">导航四</span>-->
        <!--</el-menu-item>-->
      </el-menu>
    </el-aside>
    <el-main style="padding:100px">
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        activeP:'1'
      }
    },
    created() {

    },
    watch:{
      '$route.path'(v){
        if(v=='/info/password'){
          console.log(111)
          this.activeP = '3'
          // return
        }
      }
    },
    beforeRouteEnter(to, from, next){
     let isLogin =  sessionStorage.getItem('login')
      if(isLogin == '1'){
       next()
      }else {

        next(vm=>{
          vm.$message.info('请先登录')
          vm.$router.push('/l-r/login')
        })
      }
    }
  }
</script>

<style scoped>
  .el-menu{
    border-right: none !important;
  }
  .aside {
    padding-top: 100px;
    /*background: #8f999f;*/
    color: #fff;
    font-size: 14px;
    text-align: center;
    border-right: 1px solid #eaeaea;

  }
</style>
