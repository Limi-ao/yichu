<template>
    <div class="qbb-content">
       <div class="qbb-tool">
           <ul>
               <li><i class="el-icon-edit"></i><a @click="handlefs">信息发送</a></li>
               <li><i class="el-icon-document"></i><a @click="dialomenage">信息管理</a></li>
               <li><i class="el-icon-video-pause"></i><a @click="openTree">开启群发</a></li>
               <li><i class="el-icon-folder-delete" style="color:#cac6c6;"></i><a @click="closeTree">关闭群发</a></li>
           </ul>
       </div>
        <!-- 信息管理弹出框 -->
        <el-dialog title="信息管理" :close-on-click-modal="false" :visible.sync="dialogVisible" >
             <manage></manage> 
        </el-dialog>

       <div class="qbb-contianer">
            <!-- :gutter="10" -->
          <el-row>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <div class="grid-top">相同种类设备列表</div>
                    <div style="height:300px; background:#fff;">
                        <el-tree              
                            :data="dataTree"
                            show-checkbox
                            node-key="id"
                            default-expand-all
                            :current-node-key="[1]"
                            :props="defaultProps" >   
                            <span class="custom-tree-node" slot-scope="{ node,data }">
                                <img style="color:#09f;" src="../assets/img/F.png" v-if="data.subType=='门架式'">
                                <img src="../assets/img/T.png" v-else>
                                <span>{{ node.label }}</span>   
                                <!-- <span>{{ data.subType }}</span>  -->
                            </span>                       
                        </el-tree>
                    </div>
                    <div style="background:#fff; height:415px;"></div>
                </div>
            </el-col>

  
            <!--发送界面-->
            <el-col :span="19">
                <div class="grid-content bg-purple">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="发送界面" name="first">
                            <el-row>
                                <el-col :span="6">
                                <!--左边-->
                                    <div class="grid-fsleft">
                                        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="mini">
                                            <el-form-item label="信息查询:" prop="name" class="item item-fsleft">
                                                <el-input v-model="ruleForm.name" style="width:178px;"><el-button slot="append" icon="el-icon-search"></el-button></el-input>
                                            </el-form-item>
                                        
                                            <el-form-item label="信息类型:" class="item item-fsleft">
                                                <el-select v-model="value" placeholder="-请选择-" @change="currentSel()">
                                                    <el-option
                                                        v-for="item in options"
                                                        :key="item.value"
                                                        :label="item.content"
                                                        :value="item.typeId">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-form>
                                        <div class="grid-fsbottom">
                                            <ul class="grid-top" style=" height:595px;">
                                                <li style=" list-style-type:none; border-bottom:1px solid #BFBDBD;padding-left:10px;color:#4D4E52;cursor:pointer" @dblclick="tianbiao(itli)" v-for="itli in disli" :key="itli.infoId">{{itli.display}}</li>
                                            </ul>
                                        <!--  <div style="height:555px;">
                                            {{value}}
                                            </div> -->
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="16">
                                <!--右边-->
                                    <div class="grid-fsright">
                                        <!--内容显示-->
                                        <el-row>
                                            <el-col :span="24"><div class="grid-content bg-purple-dark">
                                                    <div class="grid-top">内容显示</div>
                                                    <div style="height:120px;"><div class="grid-fsright-qbb">dsfdsfdf</div> </div>
                                                    </div>
                                            </el-col>
                                        </el-row>
                                        <!--发送列表-->
                                        <el-row>
                                            <el-col :span="24"><div class="grid-content bg-purple-dark ">
                                                    <div class="grid-topo">发送列表
                                                        <span style="color:#09f;float:right;margin-right:5px;">
                                                            <i class="el-icon-top-left" style="cursor: pointer;" @click="toggleSelection(shijiTable)">移出队列</i>
                                                            <i class="el-icon-close" style="cursor: pointer;" @click="handqk">清空队列</i>
                                                        </span>
                                                    </div>
                                                    <div style="height:200px;"> 
                                                        <el-table @selection-change="handleSelectionChange" ref="multipleTable" :data="shijiTable" border :header-cell-style="tableHeaderColor"  highlight-current-row style="width:100%; border:1px solid #DDDDDD;">
                                                                <el-table-column type="selection" width="55">
                                                                </el-table-column>
                                                                <el-table-column prop="infoId" label="信息编号" width="100">
                                                                </el-table-column>
                                                                <el-table-column prop="display" label="发布内容" width="180">
                                                                </el-table-column>
                                                                <el-table-column prop="fontType" label="字体类型" width="100">
                                                                </el-table-column>
                                                                <el-table-column prop="fontColor" label="字体颜色" width="100">
                                                                </el-table-column>
                                                                <el-table-column prop="fontSize" label="字体大小" width="100">
                                                                </el-table-column>
                                                                <el-table-column prop="imageCode" label="发布图片" min-width="80" :filter-method="filterTag" >
                                                                     <template slot-scope="scope">
                                                                        <span v-if="scope.row.imageCode==='012'">是</span>
                                                                    </template>
                                                                </el-table-column>
                                                        </el-table>
                                                    </div>
                                                    </div>
                                            </el-col>
                                        </el-row>

                                        <el-row :span="24">
                                            <!--参数-->
                                            <el-col :span="8"><div class="grid-content bg-purple-dark">
                                                    <div class="grid-topo">参数</div>
                                                    <div style="height:226px;"> 
                                                        <el-form ref="form" :model="sizeForm" label-width="100px" size="mini">
                                                                <el-form-item label="显示方式:" class="item" style="margin-top:4px; margin-bottom:4px;width:88%;">
                                                                    <el-input v-model="sizeForm.xianshi" placeholder="立即显示"></el-input>
                                                                </el-form-item>
                                                                <el-form-item label="动作速度:" class="item" style="margin-bottom:4px;">
                                                                    <el-select v-model="sizeForm.sudu" placeholder="0">
                                                                        <el-option :label="value" :value="value" v-for='value in k2' :key="value"></el-option>
                                                                        <!-- <el-option label="1" value="1"></el-option> -->
                                                                    </el-select>
                                                                </el-form-item>
                                                                <span style="color:red;margin-left:36px;">(注:选择范围0~9,其中0表示最快)</span>
                                                                <el-form-item label="停留时间(秒):" class="item" style="margin-top:4px; margin-bottom:4px;">
                                                                    <el-select v-model="sizeForm.shijian" placeholder="5">
                                                                        <el-option label="2" value="2"></el-option>
                                                                        <el-option label="3" value="3"></el-option>
                                                                    </el-select>
                                                                </el-form-item>
                                                                <el-form-item label="发布人员:" class="item" style="margin-top:4px; margin-bottom:4px; width:70%;">
                                                                    <el-input v-model="sizeForm.renyuan" :disabled="disabled"></el-input> 
                                                                </el-form-item>
                                                                    <div style="float:right;margin-top:-30px;margin-right:36px;color:#09f;cursor: pointer;" ><i class="el-icon-edit-outline" @click="canshuxiugai">修改</i></div>
                                                                <el-form-item label="信息来源:" class="item">
                                                                    <el-select v-model="sizeForm.xinxi" placeholder="监控中心">
                                                                        <el-option label="监控中心" value="jiankongzhongxin"></el-option>
                                                                        <el-option label="中心下发" value="zhongxinxiafa"></el-option>
                                                                        <el-option label="交警代发" value="jiaojindaifa"></el-option>
                                                                    </el-select>
                                                                </el-form-item>
                                                                <el-form-item style="margin-top:-10px; ">
                                                                        <i class="el-icon-plus" style="color:#09f;margin-right:6px; cursor: pointer;" @click="handleaddt">添加</i>
                                                                        <i class="el-icon-document-add" style="color:#09f; margin-left:6px; cursor: pointer;" @click="handleaddp" >批次加</i>
                                                                </el-form-item>
                                                        </el-form>
                                                    </div>
                                            </div>
                                            </el-col>
                                            <!--发送结果-->
                                            <el-col :span="15" style="marginLeft:23px;float:right"><div class="grid-content bg-purple-dark na">
                                                    <div class="grid-topo">发送结果</div>
                                                    <div style="height:230px;"> 
                                                        <el-table :data="tableData" border :header-cell-style="tableH"  highlight-current-row  style=" border:1px solid #DDDDDD;">
                                                                <el-table-column prop="name" label="设备名称">
                                                                </el-table-column>
                                                                <el-table-column prop="sort" label="发布结果">
                                                                </el-table-column>
                                                                <el-table-column prop="zt" label="设备状态">
                                                                </el-table-column>
                                                        </el-table>
                                                    </div>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-tab-pane>

                        <!--编辑信息界面-->
                        <el-tab-pane label="编辑信息界面" name="second"><bian-ji></bian-ji></el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
        </el-row>
       </div>
    </div>
</template>

<script>
import manage from './manage.vue'
import BianJi from './bianji.vue'
import axios from 'axios'
    export default {
       components:{manage,BianJi},
        data(){
            return{
                k2:["0","1","2","3",'4'],
                isDisabled:true,   //tree树结构，是否可以操纵
                dialogVisible: false,//信息管理
                activeName: 'first',
                ruleForm: {
                    name:'',
                },
                sizeForm: {
                    xianshi: '',
                    sudu: '',
                    shijian:'',
                    renyuan:'1111',
                    xinxi:''
                },
                // filters:{//弹出框查询
                //     shebei:'',
                //     yangshi:''
                // },
               // newItem:[],
                tableData:[],     //右侧的table的所有数据
                shijiTable:[],    //右侧的table的实际数据
                dataTree: [],
                defaultProps: {
                children: 'children',
                label: 'name'
                },
                options: [//选择
                    ],
                value: '',
                disli:[],
                infoId:0,
                disabled:true,
                multipleSelection: []//移出队列标识
            // selVal : ''
                }
        },
        watch:{
           dataTree: {
        　　　　handler(newValue, oldValue){
                 // console.log("111111",this.newItem)
        // 　　　　　　for (let i = 0; i < newValue.length; i++) {
        // 　　　　　　　　if (oldValue[i] != newValue[i]) {
        // 　　　　　　　　　　console.log(newValue)
        // 　　　　　　　　}
        // 　　　　　　}
        　　　　},
               deep: true,
               immediate:true
　　        }
        },
        methods:{
            //可以操控tree树结构
            openTree(){
                this.isTreeDisable(false)
                // this.dataTree.map(value=>{
                //     value.disabled=false
                //     value.children.map(item=>{
                //         item.disabled=false
                //     })
                //     return value
                // })
            },
            //不可以操控tree树结构
            closeTree(){
                this.isTreeDisable(true)
                // this.dataTree.map(value=>{
                //     value.disabled=true
                //     value.children.map(item=>{
                //         item.disabled=true
                //     })
                //     return value
                // })
            },
            isTreeDisable(tree){
                this.dataTree.map(value=>{
                    value.disabled=tree
                    value.children.map(item=>{
                        item.disabled=tree
                    })
                    return value
                })
            },
            //进入页面 获取左侧
            handlejinru(){
                
            },
            //查询类型显示
            handleleixin(){
                axios.get('http://127.0.0.1:8080/static/mock/data.json').then(res=>{
                    console.log('leixin',res.data.leixinxianshi)
                    this.options=res.data.leixinxianshi;
                    this.tableData=res.data.xinxileixin;
                    this.dataTree=res.data.data.map(value=>{
                        value.disabled=this.isDisabled
                        value.children.map(item=>{
                            item.disabled=this.isDisabled
                        })
                        return value
                    })
                })
            },
            handleClick(){},
            tableHeaderColor({ row, column, rowIndex, columnIndex }) {
                if (rowIndex === 0) {
                    return 'background-color: #F9F9F9;font-weight:600;font-size:14px;text-align:center; color:#000;'
                }
            },
            tableH({ row, column, rowIndex, columnIndex }){
                if (rowIndex === 0) {
                    return 'background-color: #DAE6F4;font-weight:600;font-size:14px;text-align:center; color:#000;'
                }
            },
             //弹出框
            dialomenage(){
              this.dialogVisible = true;
            },
            //信息查询
            handleso(){},
            //信息类型查询
            currentSel(value){
                console.log(value)
                axios.get('http://127.0.0.1:8080/static/mock/data.json').then(res=>{
                    console.log(res.data.xinxileixin)
                    this.disli=res.data.xinxileixin
                    this.tableData=res.data.xinxileixin
                })
            }, 
           //双击事件
           tianbiao(itli){
                this.infoId=itli.infoId
                this.tableData.map(value=>{
                    if(value.infoId===this.infoId){
                        if(this.shijiTable.indexOf(value)===-1){
                           this.shijiTable.push(value)                        
                        }
                    }
                })
           }, 
           //右侧table中根据发布图片返回的数据过滤
           filterTag(value, row) {
               console.log("img",value)
               if(value=='012'){
                   return "是"
               }
                return row.tag === value;
            },    
           //添加
           handleaddt(){
                
           },
           //批次添加  
           handleaddp(){
              this.shijiTable=this.tableData;
           },
           //信息发送
           handlefs(){},
           //参数修改
           canshuxiugai(){
               console.log("jing",this.disabled)
               this.disabled=false;
           },
           //移出队列
           toggleSelection(multipleSelection) {
                console.log('移出',this.multipleSelection)
                this.shijiTable.remove(this.multipleSelection)
            },
           //清空队列
           handqk(shijiTable){
              console.log('sj',this.shijiTable)
              this.shijiTable=''
           },  
           handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log('val',val)
           }      
        },
        mounted(){
           this.handlejinru();
           this.handleleixin();
        },
    }
</script>

<style scoped>
 .qbb-content{
      color: initial;
      height: 850px;
      border: 1px solid #DDDDDD;
      margin: auto 15px;
   }
   .qbb-tool{
       height: 60px;
       border: 1px solid #DDDDDD;
       box-shadow: 0 0 25px #cac6c6;
       background: rgb(255, 255, 255);
       margin-bottom:20px;
       font-size: 16px;
   }
   .qbb-contianer{
       background: #fff;
       height: 780px;
   }
     .qbb-tool ul li{
         float: left;
         margin-left:30px;
         line-height: 60px;
     }
       .qbb-tool ul li i{
          color: #09f;
          margin-right:10px;
       }
       .qbb-tool ul li a{
           cursor: pointer;
           color: #565A5D;
       }
  
  .grid-top{
      line-height: 40px;
      padding-left:10px;
      height: 40px;
      border-bottom: 1px solid #828181;
  }
    .grid-topo{
      line-height: 30px;
      padding-left: 10px;
      height: 30px;
      border-bottom: 1px solid #828181;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
    margin-top: 20px;
    margin-left: 25px;
  }
  .bg-purple-dark {
    background: #fff;
    margin-right:10px;
  }
  .na{
      margin-right: 0px;
  }
  .bg-purple {
    background: #F6F6F6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    border: 1px solid #BFBDBD;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .grid-fsleft{
      float: left;
      width: 300px;
      height: 680px;
     /* border: 1px solid #000; */
  }
 .grid-fsright{
     height: 700px;
     /* border: 1px solid #000; */
     width: 100%;
     /* margin-left: 310px; */
     
    
 }
 .grid-fsbottom{
     /* border: 1px solid #000; */
     border: 1px solid #BFBDBD;
     margin-left: 10px;
     margin-right: 10px;
     border-radius: 4px;
 }
 .grid-fsright .el-row{
     height: 100px;
 }
 .grid-fsright .el-col{
     margin-left: 10px;
     margin-top: 0px;
     margin-bottom: 8px;
    
 }
 /* .sj-grid{
     /* width: 768px; 
 } */
.item-fsleft{
    margin-left:-20px;
}
.grid-fsright-qbb{
   background:#000;
   width:100px;
   height:100px;
   color:#fff;
   line-height: 100px;
   text-align: center;
   margin-left: 500px;
   margin-top: 20px;
}
</style>

<style>
.qbb-content .item .el-form-item__label {
    color:#000;
    font-size: 12px;
}
.qbb-content .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 35px;
    border-color: #CFD1D3; 
}
.qbb-content .el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 35px;
    border-color: #CFD1D3; 
}
.qbb-content .el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
  border-color: #CFD1D3; 
}
.sj-grid .el-table__header tr{
    
    background: #09f;
}
/* 图表内容居中 */
.el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
  
    text-align: center;
}
.qbb-content .el-dialog__wrapper .el-dialog__header{
  /* text-align: center;
  padding: 0px 20px 10px; */
  background: #3398CC;
  text-align: left;
  height: 50px;
  line-height: 50px;
}
.qbb-content .el-dialog__close.el-icon.el-icon-close{
    margin-top:-20px;
    padding-top: -10px;
}
.qbb-content .el-dialog__body{
      margin-left:30px;
      margin-right: 30px;}
 .qbb-content .el-dialog__wrapper .el-dialog{
  color: #ffffff;
  background: #fff;
  background-size: 100% 100%  ;
}
</style>