<template>
    <div>
        <iframe :src="url" frameborder="0" width="100%" style="height:calc(100vh - 64px)"></iframe>
        <el-dialog class="jcqInfo" title="微波检测器" :visible.sync="wbjcyVisible" width="800px">
            <el-card >
                <div slot="header" class="clearfix">
                    <span style="color:#333">车检器信息</span>
                </div>
                <el-row >
                    <el-col :span="12"><span>名称 :</span>{{wbjcyForm.name}}</el-col>
                    <el-col :span="6"><span>资产编码 :</span>36001</el-col>
                    <el-col :span="6"><span>状态 :</span>离线</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6"><span>类型 :</span>微波检测器</el-col>
                    <el-col :span="6"><span>规格 :</span>VD</el-col>
                    <el-col :span="6"><span>厂商 :</span>浙大中控</el-col>
                    <el-col :span="6"><span>备注信息 :</span>无</el-col>
                </el-row>
            </el-card>
            <el-card style="margin-top:5px">
                <div slot="header" class="clearfix">
                    <span style="color:#333">实时数据</span>
                </div>
                <div style="height:300px">

                </div>
            </el-card>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name:'Guanshan',
        data(){
            return {
                url:'/static/pages/gsdq.html',
                wbjcyVisible:false,
                wbjcyForm:{
                    name:"",
                    info:""
                },
            }
        },
        mounted(){
            window.selectDevice = this.selectDevice
        },
        methods:{
            selectDevice(name){
                if(name.indexOf("GDSXJ") !== -1){
                    this.$router.push({path:'/video',query:{deviceName:name}})
                }else if(name.indexOf('YKSXJ') !== -1){
                    this.$router.push({path:'/video',query:{deviceName:name}})
                }else if(name.indexOf('WBJCY') !== -1){
                    this.wbjcyForm.name = name;
                    let _this =  this;
                    setTimeout(function(){
                        _this.wbjcyVisible = true
                    },200)
                }else if(name.indexOf('MJSQBB') !== -1){
                    this.$router.push({path:'/qbb',query:{deviceName:name}})
                }
            }
        }
    }
</script>

<style scoped>
.center{
    text-align: center
}
.jcqInfo div{
    font-size: 16px;
    line-height: 2em;
}
.jcqInfo span{
    color: #38a4ec;
    margin-right: 3px
}
.jcqInfo >>> .el-card__header{
    padding: 5px 20px
}
.jcqInfo >>> .el-dialog__header{
    padding: 12px 20px 0px
}
.jcqInfo >>> .el-dialog__headerbtn{
  right:-15px;
  top:15px;
  border: 1px solid #127AA5;
  border-radius: 16px;
  background: #127AA5;
}
.jcqInfo >>> .el-dialog__headerbtn i{
    color: #ffffff;
}
</style>