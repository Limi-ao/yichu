<template>
    <div>
        <iframe :src="url" frameborder="0" width="100%" style="height:calc(100vh - 64px)"></iframe>
        <el-dialog class="dialogInfo" title="车道指示灯" :visible.sync="cdzsdVisible" width="500px">
            <el-form :model="cdzsdForm"  label-width="120px">
            <el-form-item label="设备名称">
                <el-input v-model="cdzsdForm.name" style="width:210px"></el-input>
            </el-form-item>
            <el-form-item label="设备状态">
                <el-radio-group v-model="cdzsdForm.state">
                    <el-radio-button label="2">↓ ×</el-radio-button>
                    <el-radio-button label="3">× ↓</el-radio-button>
                    <el-radio-button label="1">↓ ↓</el-radio-button>
                    <el-radio-button label="4">× ×</el-radio-button>
                </el-radio-group>
            </el-form-item>
            </el-form>
            <div class="center">
                <el-button type="primary" @click="editDevice('cdzsdForm')">确认修改</el-button>
            </div>
        </el-dialog>
        <el-dialog class="dialogInfo" title="四可变信号灯" :visible.sync="skbxhdVisible" width="500px">
            <el-form :model="skbxhdForm"  label-width="150px" >
                <el-form-item label="设备名称">
                    <el-input v-model="skbxhdForm.name" style="width:210px"></el-input>
                </el-form-item>
                <el-form-item label="设备左行">
                    <el-radio-group v-model="skbxhdForm.leftState">
                        <el-radio-button label="1">左转</el-radio-button>
                        <el-radio-button label="0">空</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="设备信号灯">
                    <el-checkbox-group v-model="skbxhdForm.state">
                        <el-checkbox-button label="1">绿灯</el-checkbox-button>
                        <el-checkbox-button label="2">黄灯</el-checkbox-button>
                        <el-checkbox-button label="3">红灯</el-checkbox-button>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div class="center"><el-button type="primary" @click="editDevice('skbxhdForm')">确认修改</el-button></div>
            
        </el-dialog>
    </div>
</template>

<script>
import baseAlert from '@/components/alert'
    export default {
        name:'Suidao',
        components:{baseAlert},
        data(){
            return {
                url:'/static/pages/shuidao.html',
                cdzsdVisible:false,
                skbxhdVisible:false,
                cameraName:"",
                cdzsdForm:{
                    name:"",
                    state:""
                },
                skbxhdForm:{
                    name:"",
                    state:[],
                    leftState:""
                }
            }
        },
        mounted(){
            window.selectDevice = this.selectDevice; 
        },
        methods:{
            selectDevice(name){
                let _this = this
                if(name.indexOf("CDZSD") !== -1){
                    this.cdzsdForm.name = name;
                    setTimeout(function() {
                        _this.cdzsdVisible = true
                    }, 200)
                }else if(name.indexOf('SKBXHD') !== -1){
                    this.skbxhdForm.name = name;
                    setTimeout(function() {
                        _this.skbxhdVisible = true
                    }, 200)
                }else if(name.indexOf('GDSXJ') !== -1){
                    this.$router.push({path:'/video',query:{deviceName:name}})
                }else if(name.indexOf('XBSQBB') !== -1){
                    this.$router.push({path:'/qbb',query:{deviceName:name}})
                }
            },
            editDevice(name){
                switch(name){
                    case 'cdzsdForm':
                        this.$message({
                            type:'success',
                            message:'修改成功'
                        });
                        this.cdzsdVisible = false
                        window.Object3D.modelBussiness.changeDevState(this.cdzsdForm.name,this.cdzsdForm.state);
                        break;
                    case 'skbxhdForm':
                        this.$message({
                            type:'success',
                            message:'修改成功'
                        });
                        let state="1";
                        state += this.skbxhdForm.leftState;
                        if(this.skbxhdForm.state.indexOf("1") !== -1){
                            state += "1"
                            if(this.skbxhdForm.state.indexOf("2") !== -1){
                                state +="1"
                                if(this.skbxhdForm.state.indexOf("3") !== -1){
                                    state += "1";
                                }else{
                                    state += "0";
                                }
                            }else{
                                state += "0"
                                if(this.skbxhdForm.state.indexOf("3") !== -1){
                                    state += "1";
                                }else{
                                    state += "0";
                                }
                            }
                        }else {
                            state += "0"
                            if(this.skbxhdForm.state.indexOf("2") !== -1){
                                state +="1"
                                if(this.skbxhdForm.state.indexOf("3") !== -1){
                                    state += "1";
                                }else{
                                    state += "0";
                                }
                            }else{
                                state += "0"
                                if(this.skbxhdForm.state.indexOf("3") !== -1){
                                    state += "1";
                                }else{
                                    state += "0";
                                }
                            }
                        }
                        this.skbxhdVisible = false
                        window.Object3D.modelBussiness.changeDevState(this.skbxhdForm.name,state);
                        break;
                    case 'xbsqbbForm':
                        break;
                    default:
                        
                }
            }
        },
    }
</script>

<style scoped>
.center{
    text-align: center
}
.dialogInfo >>> .el-dialog__headerbtn{
  right:-20px;
  top:0px;
  border: 1px solid #127AA5;
  border-radius: 16px;
  background: #127AA5;
}
.dialogInfo >>> .el-dialog__headerbtn i{
    color: #ffffff;
}
</style>