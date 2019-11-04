<template>
    <div  class="bji-content">
        <!--情报板-->
        <el-row>
            <el-col :span="23">
               <div class="grid-content bg-purple-dark" style="height:180px;">
                  <p class="bji-top" :style="{color:color,width:width}">{{textarea}}</p>
                  <ul class="bji-top-i">
                    <li style="margin-right:10px;"> <i class="el-icon-edit-outline" style="color:#09f;margin-right:6px;"></i>新建信息</li>
                    <li><i class="el-icon-tickets" style="color:#09f;margin-right:4px;"></i>保存信息</li>
                  </ul>
               </div>
            </el-col>
        </el-row >

       <div style="border:1px solid #000;height:500px;margin-left:30px;margin-right:60px;">
           <!--左边-->
           <div class="grid-fsbottom">
              <div class="grid-top">
                  <span>信息类型选择</span>
              </div>
              <el-form size="mini">
              <el-form-item label="信息类型:" class="item item-fsleft">
                  <el-select v-model="value" placeholder="-请选择-" @change="currentSel" style="width:170px;">
                      <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.content"
                          :value="item.typeId">
                      </el-option>
                  </el-select>
              </el-form-item>
              </el-form>
              <div><li style="list-style-type:none;margin-left:10px;">sdsd</li></div>
          </div>
          
          <!--右边-->
           <div class="bjy">
             <!--图片编辑区-->
               <el-row style="margin-left:0px;margin-bottom:25px;">
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                      <div class="bj-top"><span>图片编辑区</span></div>

                      <div>
                         <div class="bj-img-top" >图片:</div>
                         <div class="bj-img" >

                         </div>
                         <span style="color:#ff0000;margin-left:10px;font-size:12px;">(注:双击图片取消选择)</span>
                      </div>
                      <div class="bj-img-right">
                        <el-checkbox v-model="checked">消息是否添加图片</el-checkbox>
                        <div class="bj-img-rbottom" >
                          <span  v-for="(gimg,index) in 63" :key="index" style="margin-left:10px;margin-right:5px;display:inline-block;">
                            <img v-if="index<10"  :src="require(`@/assets/img/qbbimg/00${gimg}.BMP`)">
                            <span style="display:block;">{{index}}</span>
                             <!-- <img v-if="`${gimg}>10`" :src="require(`@/assets/img/qbbimg/0${gimg}.BMP`)"> -->
                          </span>
                          
                          
                          <span v-for="(gimg,index) in 63" :key="index" style="margin-left:10px;margin-right:5px;display:inline-block;">
                            <img  :src="require(`@/assets/img/qbbimg/0${gimg}.BMP`)">
                            <span style="display:block;">{{index}}</span>
                             <!-- <img v-if="`${gimg}>10`" :src="require(`@/assets/img/qbbimg/0${gimg}.BMP`)"> -->
                          </span>
                          
                        </div>
                      </div>
                  </div></el-col>
              </el-row>

              <!--信息编辑区-->
              <el-row style="margin-left:0px;">
                    <el-col :span="24"><div class="grid-content bg-purple">
                      <div class="bj-top"><span>信息编辑区</span></div>
                          <el-form :inline="true" size="mini">
                             <el-form-item label="字体类型:" class="bj">
                                  <el-select v-model="ziti.lx" placeholder="-请选择-" class="select">
                                      <el-option label="黑体" value="ht"></el-option>
                                      <el-option label="宋体" value="st"></el-option>
                                      <el-option label="楷体" value="kt"></el-option>
                                  </el-select>
                              </el-form-item>
                              <el-form-item label="字体大小:" class="bj">
                                  <el-select v-model="ziti.size" placeholder="-请选择-" class="select">
                                      <el-option label="16" value="1"></el-option>
                                      <el-option label="24" value="2"></el-option>
                                      <el-option label="32" value="3"></el-option>
                                      <el-option label="48" value="4"></el-option>
                                  </el-select>
                              </el-form-item>
                              <el-form-item label="字体颜色:" class="bj">
                                  <el-select v-model="ziti.cl" placeholder="-请选择-" class="select">
                                      <el-option label="红色" value="hs"></el-option>
                                      <el-option label="黄色" value="hs"></el-option>
                                      <el-option label="绿色" value="ls"></el-option>
                                  </el-select>
                              </el-form-item>
                          </el-form>

                          <div class="zifu">字符区域编辑</div>
                          <el-input
                              type="textarea"
                              :rows="4"
                              placeholder="请输入内容"
                              v-model="textarea" class="text">
                          </el-input>

                          <div style="float:right; margin-top:20px;margin-right:170px;">
                             <span>情报板规格:</span>
                             
                          </div>
                      </div></el-col>
              </el-row>
           </div>
       </div>

      
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data(){
          return{
            
            color:'#fff',
             options:[],
             value:'',
             checked: true,
             textarea:'',
             width:'10px',
             ziti:{
               lx:'',
               size:'',
               cl:''
             },

          }
        },
        methods:{
          handlebj(){
            //  axios.get('http://127.0.0.1:8080/static/mock/data.json').then(res=>{
            //         console.log(res.data.data1)
            //         this.options=res.data.data1
            //     })
          },
          currentSel(){},
        },
        mounted(){
          this.handlebj();
        },
    }
</script>

<style scoped>
 .bji-content{
     height: 700px;
     border:1px solid #BFBDBD;
     margin-left:10px;
     margin-right: 10px;
 }
 
 .bji-top{
   background:#000;
   width:100px;
   height:100px;
   color:#fff;
   line-height: 100px;
   text-align: center;
   position: relative;
   left:200px;
   top:30px;
  
 }
 .bji-top-i{
   position: relative;
   top:-90px;
   right: -1100px;
 }
 .bji-top-i li{
   float: left;
   cursor: pointer;
 }
 .item{
   margin-left:10px;
   margin-top:10px;
 }
 .grid-top{
      line-height: 40px;
      padding-left: 10px;
      height: 40px;
      border-bottom: 1px solid #828181;
  }
  .grid-fsbottom{
     border: 1px solid #000;
     border: 1px solid #BFBDBD;
     margin-right: 10px;
     border-radius: 4px;
     width:270px;
     height:490px;
 }
.bjy{
  float:right;
  width:79%;
  height:490px;
  border:1px solid #000;
  margin-top:-490px;
}
.bj-top{
  height: 30px;
  line-height: 30px;
  padding-left:10px;
  border-bottom:1px solid #BFBDBD;
}
.bj-img-top{
  margin-left:10px;
  padding-top:20px;
}
.bj-img{
  width:80px; 
  height:80px;
  border:1px solid #FF0000;
  margin-top:20px;
  margin-left:10px;
}
.bj-img-right{
  float:right;
  width:80%;
  margin-top:-140px;
  }
  .bj-img-rbottom{
    width:100%;
    height:120px;
    border:1px solid #BFBDBD;
    margin-top:10px;
    overflow-x:auto
    }
    .bj{
      margin-left:10px;
      margin-top:10px;
    }
    .zifu{
      margin-left: 10px;
      font-size: 12px;
    }
 .el-row {
    margin-bottom: 10px;
    margin-left:30px;
  }
  .select{
    width:170px;
  }
  .text{
    margin-left:10px;
    width: 750px;
    margin-top:20px;
  }
  .el-col {
    border-radius: 4px;
    border: 1px solid #BFBDBD;
  }
  .bg-purple-dark {
    background: #fff;
  }
  .bjy .bg-purple {
    background: #fff;
    height: 230px;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

<style>
.bj .el-form-item__label {
    color:#000;
    font-size: 12px;
}
</style>
