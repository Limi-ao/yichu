<template >
    <div class="top" >
      <el-row>
        <el-col :span="5"><div style="margin-left:20px;cursor:pointer;line-height:60px;font-size:24px" @click="returnIndex"><img style="display:inline-block;vertical-align:middle;width:80px;" src="@/assets/logo.png"/> 智能桥隧监控系统</div></el-col>
        <el-col :span="15">
          <el-menu
          :default-active="$route.path"
          router
          class="navTop"
          mode="horizontal"
          background-color="#000000"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="/home">系统首页</el-menu-item>
          <el-menu-item index="/guanshan">官山大桥</el-menu-item>
          <el-menu-item index="/suidao">炮台山隧道</el-menu-item>
          <el-menu-item index="/xiushan">秀山大桥</el-menu-item>
          <el-menu-item index="/video">视频监控</el-menu-item>
          <el-menu-item index="/qbb">情报板管理</el-menu-item>
          <el-menu-item index="/baobiao">报表管理</el-menu-item>
          <el-menu-item>报警管理</el-menu-item>
          <el-menu-item index="/system">用户管理</el-menu-item>
        </el-menu>
        </el-col>
        <el-col :span="4">
          <div style="display:inline-block">
            <span class="time">
              {{time}}
            </span>
            <span class="today">
              <div>{{day}}</div>
              <div>{{today}}</div>
            </span>
        </div>
        <div style="float:right;overflow:hidden;">
          <el-dropdown trigger="click" style="height:60px;line-height:60px;font-size:24px;cursor:pointer">
              <span class="el-dropdown-link" style="color:#0099ff;"><i class="el-icon-user"></i>{{username}}<i class="el-icon-arrow-down el-icon--right"></i></span>
              <el-dropdown-menu slot="dropdown" style="margin-top:0px">
                <el-dropdown-item><span @click="showEditPass">修改密码</span></el-dropdown-item>
                <el-dropdown-item><span @click="loginOut">退出</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </div>
        </el-col>
      </el-row>
      <el-dialog
        class="editPass"
        title="修改密码"
        :visible.sync="editPassVisible"
        width="30%"
        :modal-append-to-body="false" :append-to-body="true">
        <el-form  ref="ruleForm" status-icon :model="ruleForm" :rules="rules">
          <el-form-item label-width="150px" label="原密码" prop="oldPassword">
            <el-input type="password" placeholder="请输入原密码" v-model="ruleForm.oldPassword" style="width:240px"></el-input>
          </el-form-item>
          <el-form-item label-width="150px" label="密码" prop="newPassword">
            <el-input type="password" placeholder="请输入密码" style="width:240px" v-model="ruleForm.newPassword"></el-input>
          </el-form-item>
          <el-form-item label-width="150px" label="确认密码" prop="confirmPassword">
            <el-input type="password" placeholder="请输入确认密码" style="width:240px" v-model="ruleForm.confirmPassword"></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align:center">
          <el-button type="primary" @click="editPass">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            var validateConfirmPassword = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入确认密码'));
              } else if (value !== this.ruleForm.newPassword) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            };
            return {
              route:'',
              login:'',
              ruleForm:{
                oldPassword:"",
                newPassword:"",
                confirmPassword:""
              },
              rules:{
                oldPassword:[
                  {required:true,message:'请输入原密码',trigger:'blur'},
                  {min:6,max:18,message:'请输入长度为6-18位之间的密码',trigger:'blur'}
                ],
                newPassword:[
                  {required:true,message:'请输入密码',trigger:'blur'},
                  {min:6,max:18,message:'请输入长度为6-18位之间的密码',trigger:'blur'}
                ],
                confirmPassword:[
                  {required:true,validator:validateConfirmPassword,trigger:'blur'}
                ]
              },
              username:'',
              editPassVisible:false,
              time:"",
              pid:null,
              day:"",
              today:"",
              week:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
            }
        },
      watch:{
        '$route':function(){
          return this.$route
          }
      },
      mounted(){
        this.username=sessionStorage.getItem('token')
        let _this = this
        this.pid = setInterval(function(){
          _this.initTime()
        },1000)
      },
      beforeDestroy(){
        this.pid = null
      },
      methods:{
        returnIndex(){
          this.$router.push('/home')
        },
         loginOut(){
           sessionStorage.removeItem('login');
           this.login = null
           this.$router.push('/login');
         },
        //  修改密码
         showEditPass(){
           this.editPassVisible = true
         },
        //  确认修改密码
         editPass(){
           //修改密码
           this.$refs.ruleForm.validate((valid)=>{
             if(valid){
               
             }
           }) 
         },
        //  初始化时间
         initTime(){
           let date = new Date();
           let year = date.getFullYear()
           let month = date.getMonth()+1
           let ri = date.getDate()
           let hour = date.getHours() > 9 ? date.getHours() : "0"+ date.getHours()
           let min = date.getMinutes() > 9 ? date.getMinutes() : "0"+date.getMinutes()
           this.time = hour + ":" + min;
           this.day = this.week[date.getDay()]
           this.today = year+"年"+month+"月"+ri+"日"
         }
      },
    }
</script>

<style scoped>
.top{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #000000;
  color: #fff;
  z-index: 999;
  overflow: hidden;
}
  .route{
    margin-right: 20px;
  }
  .navTop{
    display: inline-block;
    height: 60px;
    border-bottom: none
  }
  .navTop li{
    font-size: 16px
  }
  .time{
    font-size: 30px;
    line-height: 60px;
    font-family: '微软雅黑'
  }
  .today{
    display: inline-block;
  }
  .el-dropdown-menu{
    padding: 0px
  }
  .editPass >>> .el-dialog__headerbtn{
  right:-15px;
  top:0px;
  border: 1px solid #127AA5;
  border-radius: 16px;
  background: #127AA5;
}
.editPass >>> .el-dialog__headerbtn i{
    color: #ffffff;
}
</style>
