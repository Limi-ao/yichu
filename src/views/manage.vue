<template>
    <div class="dialog-content co">
          
          <el-form :inline="true" size="mini">
             <el-form-item label="选择设备类型:">
                       <el-select v-model="value" placeholder="-请选择-">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.content"
                                :value="item.typeId">
                            </el-option>
                        </el-select>
             </el-form-item>
             <el-form-item label="选择信息类型:">
                        <el-select v-model="value" placeholder="-请选择-">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.content"
                                :value="item.typeId">
                            </el-option>
                        </el-select>
             </el-form-item>
             <el-form-item>
                        <el-button type="primary" v-on:click="getdata" style=" height: 28px; line-height:0;">查询</el-button>
                    </el-form-item>
           </el-form>
           <p style="textAlign:right">
            <i class="el-icon-close" style="color:#09f;marginRight:10px" @click="handleDel">删除</i>
            <i class="el-icon-delete" style="color:#09f;" @click="handleXg">类别修改</i>
           </p>
          <el-table :data="leixin"   border  highlight-current-row style="width:100%; margin-bottom:20px; margin-top:5px;">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="infoType" label="信息类型" width="80">
                    </el-table-column>
                    <el-table-column prop="display" label="内容" width="220">
                    </el-table-column>
                    <el-table-column prop="name" label="字体类型" width="80">
                    </el-table-column>
                    <el-table-column prop="fontType" label="字体颜色" width="80">
                    </el-table-column>
                    <el-table-column prop="fontSize" label="字体大小" width="80" >
                    </el-table-column>
                    <el-table-column prop="imageCode" label="是否图片" width="80">
                    </el-table-column>
                    <el-table-column label="操作" min-width="80">
                </el-table-column>
       </el-table>
        <!--分页-->
        <div class="block">
            <span class="demonstration">显示第{{currentPage1}}到第{{size}}条记录,总共{{total}}条记录</span>
            <el-pagination layout="total, prev, pager, next" style="marginRight:10px;margin-top:10px;float:right"
            v-show="pge"
            :total="total"
            :current-page.sync="currentPage1"
            :page-size="size">
            </el-pagination>
        </div>

       <h4 class="table-gbottom">信息类别管理</h4>
          <p style="textAlign:right">
            <i class="el-icon-close" style="color:#09f;" @click="handleDel">删除</i>
            <i class="el-icon-edit-outline" style="color:#09f;" @click="handleXg">类别修改</i>
            <i class="el-icon-plus" style="color:#09f;" @click="innerVisible = true">新增</i>
            <i class="el-icon-refresh" style="color:#09f;marginRight:10px" @click="handleref">刷新</i>
          </p>
       <el-table :data="leibie" border  highlight-current-row style="width:100%;margin-top:5px;margin-bottom:15px;">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="typeId" label="类别编号" width="300">
                    </el-table-column>
                    <el-table-column prop="content" label="类别描述" width="240">
                    </el-table-column>
                    <el-table-column label="操作">
                </el-table-column>
       </el-table>
       <!--分页-->
        <div class="block">
            <span class="demonstration">显示第{{currentPage1}}到第{{size}}条记录</span>
            <el-pagination layout="total, prev, pager, next" style="marginRight:10px;margin-top:10px;float:right"
            v-show="pge"
            :total="total"
            :current-page.sync="currentPage1"
            :page-size="size">
            </el-pagination>
        </div>
       
       <!--新增-->
       <el-dialog
            center
            width="20%"
            :visible.sync="innerVisible"
            append-to-body>
             <el-form :model="form">
                <el-form-item label="新类型:">
                  <el-input v-model="form.leixin" autocomplete="off" style="width:200px;"></el-input>
               </el-form-item>
             </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="innerVisible = false">取 消</el-button>
                <el-button type="primary" @click="innerVisible = false">确 定</el-button>
            </span>
                </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data(){
            return{
              form:{
                leixin:''
              },
              options:[],
              value:'',
              leixin:[],
              leibie:[],
              total:5,
              currentPage1:1,
              size:4,
              pge:true,
              innerVisible:false
            }
        },
        methods:{
            //进入页面
            //类型数据
            handletc(){
                axios.get('http://127.0.0.1:8080/static/mock/data.json').then(res=>{
                    console.log('leixin',res.data.leixinxianshi)
                    this.options=res.data.leixinxianshi
                })
            },
            //信息类型列表
            getdatax(){
               axios.get('http://127.0.0.1:8080/static/mock/data.json').then(res=>{
                    console.log('leibie',res.data.xinxileixin)
                    this.leixin=res.data.xinxileixin;
                    
                })
            },
            //信息类别列表
            getdatab(){
               axios.get('http://127.0.0.1:8080/static/mock/data.json').then(res=>{
                    console.log('leibie',res.data.xinxileibie)
                    this.leibie=res.data.xinxileibie;
                    
                })
            },
            //刷新
            handleref(){
                this.getdatab();
            },
            //新增
            dialogVisible(){
                
            },
            handleDel(){
                //类型删除
                
            },
            handleXg(){},
            handleDell(){
                //信息类别删除
                
            },
            handleXgg(){},
        },
    mounted(){
        this.handletc();
        this.getdatax();
        this.getdatab();
    },
    }
</script>

<style scoped>
  .block{
      margin-bottom:15px;
      overflow: hidden;
  }
  .dialog-content .el-dialog__body{
      margin-left:20px;
  }
  .table-gbottom{
      font-size: 18px;
  }
</style>

<style>
 .dialog-content   .el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
  border-color: #CFD1D3;
  border-radius: 3px;
}
.dialog-content .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 35px;
    border-color: #CFD1D3; 
}
.co .el-table::before {
    content: '';
    position: absolute;
    background-color: #CFD1D3;
    z-index: 1;
    }
   .co  .el-dialog__body{
      margin-left:30px;
      margin-right: 30px;
      }   
  .el-dialog__wrapper .el-dialog{
  color: #000;
  background: #fff;
  background-size: 100% 100%  ;
  background-image:none;
}
 .co .el-dialog__wrapper .el-dialog__header{
  /* text-align: center;
  padding: 0px 20px 10px; */
  background: #3398CC;
  text-align: left;
  height: 50px;
  line-height: 50px;
}
  .el-form-item__label {
    color:#000;
    font-size: 14px;
}
</style>