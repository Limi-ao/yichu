<template>
    <div>
        <el-row>
            <el-col :span="4" style="padding:0 20px;min-width:200px;background:#ffffff">
                    <h3 style="text-align:center;margin:20px 0;">摄像机资源列表</h3>
                    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
                    <el-tabs v-model="activeName" type="card" stretch @tab-click="handleTabClick">
                        <el-tab-pane label="默认资源树" name="first">
                            <el-tree
                                style="height:400px;"
                                ref="tree"
                                class="tree"
                                highlight-current
                                :data="cameraLists"
                                :props="defaultProps"
                                default-expand-all
                                :filter-node-method="filterNode">
                                <span @click="selectCamera(data)" class="custom-tree-node" slot-scope="{ node, data }">
                                <i class="el-icon-video-camera" v-if="!data.children"></i>
                                <span>{{ node.label }}</span>
                                <span>
                                <el-button
                                    v-if="!data.children"
                                    type="text"
                                    style="color:#606060"
                                    icon="el-icon-plus"
                                    @click.stop="() => appendMyLists(data)">
                                </el-button>
                                </span>
                            </span>
                            </el-tree>
                        </el-tab-pane>
                        <el-tab-pane label="我的资源树" name="second">
                            <el-tree
                                class="tree"
                                style="height:400px;"
                                ref="treeTwo"
                                :data="myCameraLists"
                                :props="defaultProps"
                                default-expand-all
                                :filter-node-method="filterNode">
                                <span class="custom-tree-node" slot-scope="{ node, data }">
                                <i class="el-icon-video-camera" v-if="!data.children"></i>
                                <span>{{ node.label }}</span>
                                <span>
                                <el-button
                                    v-if="!data.children"
                                    style="color:#606060"
                                    type="text"
                                    icon="el-icon-minus"
                                    @click.stop="() => delMyLists(data)">
                                </el-button>
                                </span>
                            </span>
                            </el-tree>
                        </el-tab-pane>
                    </el-tabs>
                    
                    <div style="background:#ffffff;border:2px solid #fcfcfc">
                        <h3 style="text-align:center">云台控制</h3> 
                    <el-row>
                        <el-col :span="24" style="min-width:150px;">
                            <el-row style="margin-top:10px">
                                <el-button type="primary" @mousedown.native="changeCameraDown('leftTop')" @mouseup.native="changeCameraUp('leftTop')" circle icon="el-icon-top-left"></el-button>
                                <el-button type="primary" @mousedown.native="changeCameraDown('centerTop')" @mouseup.native="changeCameraUp('centerTop')" circle icon="el-icon-top"></el-button>
                                <el-button type="primary" @mousedown.native="changeCameraDown('rightTop')" @mouseup.native="changeCameraUp('rightTop')" circle icon="el-icon-top-right"></el-button>
                            </el-row>
                            <el-row  style="margin-top:10px">
                                <el-button type="primary" @mousedown.native="changeCameraDown('leftMiddle')" @mouseup.native="changeCameraUp('leftMiddle')" circle icon="el-icon-back"></el-button>
                                <el-button type="primary" @click="changeYunCamera" circle :icon="cameraFlag === false? 'el-icon-video-play':'el-icon-video-pause'"></el-button>
                                <el-button type="primary" @mousedown.native="changeCameraDown('rightMiddle')" @mouseup.native="changeCameraUp('rightMiddle')" circle icon="el-icon-right"></el-button>
                            </el-row>
                            <el-row style="margin-top:10px">
                                <el-button type="primary" @mousedown.native="changeCameraDown('leftBottom')" @mouseup.native="changeCameraUp('leftBottom')" circle  icon="el-icon-bottom-left"></el-button>
                                <el-button type="primary" @mousedown.native="changeCameraDown('centerBottom')" @mouseup.native="changeCameraUp('centerBottom')" circle icon="el-icon-bottom"></el-button>
                                <el-button type="primary" @mousedown.native="changeCameraDown('rightBottom')" @mouseup.native="changeCameraUp('rightBottom')" circle icon="el-icon-bottom-right"></el-button>
                            </el-row>
                        </el-col>
                        <!-- <el-col :span="10" style="text-align:center">
                            <el-button type="primary" style="margin-top:5px" size="small" plain>预置点1</el-button><br/>
                            <el-button type="primary" style="margin-top:5px" size="small" plain>预置点2</el-button><br/>
                            <el-button type="primary" style="margin-top:5px" size="small" plain>预置点3</el-button><br/>
                            <el-button type="primary" style="margin-top:5px" size="small" plain>预置点4</el-button>
                        </el-col> -->
                    </el-row>
                    <el-row style="margin-top:10px;min-width:200px;">
                        <span class="btnSpec">光圈</span>
                        <el-button type="primary" class="btnSpec" size="small" circle  icon="el-icon-plus"
                         @mousedown.native="handleGuangQuan(1,false)" @mouseup.native="handleGuangQuan(1,true)"></el-button>
                        <el-button type="primary" class="btnSpec" size="small" circle  icon="el-icon-minus"
                         @mousedown.native="handleGuangQuan(0,false)" @mouseup.native="handleGuangQuan(0,true)"></el-button><br/>
                        <span class="btnSpec">变焦</span>
                        <el-button type="primary" class="btnSpec" size="small" circle  icon="el-icon-plus" 
                         @mousedown.native="handleBianJiao(1,false)" @mouseup.native="handleBianJiao(1,true)"></el-button>
                        <el-button type="primary" class="btnSpec" size="small" circle  icon="el-icon-minus"
                         @mousedown.native="handleBianJiao(0,false)" @mouseup.native="handleBianJiao(0,true)"></el-button><br/>
                        <span class="btnSpec">变倍</span>
                        <el-button type="primary" class="btnSpec" size="small" circle  icon="el-icon-plus"
                         @mousedown.native="handleBianBei(1,false)" @mouseup.native="handleBianBei(1,true)"></el-button>
                        <el-button type="primary" class="btnSpec" size="small" circle  icon="el-icon-minus"
                         @mousedown.native="handleBianBei(0,false)" @mouseup.native="handleBianBei(0,true)"></el-button>
                    </el-row>
                    </div>
           </el-col>
            <el-col :span="20">
                <el-row style="height:50px;line-height:50px">
                    <el-col :span="12" style="height:50px;padding-top:5px">
                        <i class="el-icon-refresh-right" title="刷新" @click="handleCameraFresh" style="font-size:20px"></i>
                        <i class="el-icon-camera-solid" @click="capturePic" title="抓拍" style="font-size:20px"></i>
                        <i  :class="previewFlag === false? 'el-icon-video-play':'el-icon-video-pause'"
                            :title="previewFlag === false? '开始录像':'停止录像'"
                         @click="changePreCamera"></i>
                        <i class="el-icon-close" @click="handleCameraClose" title="关闭" style="font-size20px"></i>
                    </el-col>
                    <el-col :span="12" style="text-align:right;padding-right:20px;font-size:20px;">
                        <svg-icon icon-class="screen-1" @click="changeNum(1)" title="单屏" style="cursor:pointer;margin-right:10px;"></svg-icon>
                        <svg-icon icon-class="screen-4" @click="changeNum(2)" title="四屏" style="cursor:pointer;margin-right:10px;"></svg-icon>
                        <svg-icon icon-class="screen-9" @click="changeNum(3)" title="九屏" style="cursor:pointer;margin-right:10px;"></svg-icon>
                        <svg-icon icon-class="screen-16" @click="changeNum(4)" title="十六屏" style="cursor:pointer;margin-right:10px"></svg-icon>
                        <svg-icon icon-class="fullScreen" @click="changeFullScreen" title="全屏" style="cursor:pointer;margin-right:10px"></svg-icon>
                    </el-col>
                </el-row>
                <el-row>
                    <div id="divPlugin" style="width:100%;height:calc(100vh - 124px)"></div>
                    <video-info style="display:none"/>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import videoInfo from '@/views/videoinfo'
    export default {
        name:'Video',
        components:{videoInfo},
        data(){
            return {
                activeName:'first',
                filterText: '',
                deviceName:"",
                cameraFlag:false,
                previewFlag:false,
                defaultProps:{
                    children:'children',
                    label:'label'
                },
                myCameraLists:[
                    {label:'官山大桥',children:[{label:'k1+100',state:"0"},{label:'k1+200',state:"0"},{label:'k1+300',state:"1"}]}
                ],
                cameraLists:[
                    {label:'官山大桥',children:[{label:'k1+100',state:"0"},{label:'k1+200',state:"0"},{label:'k1+300',state:"1"}]},
                    {label:'炮台山隧道',children:[{label:'k2+100',state:"1"},{label:'k2+200',state:"0"},{label:'k2+300',state:"0"}]},
                    {label:'秀山大桥',children:[{label:'k3+100',state:"0"},{label:'k3+200',state:"1"},{label:'k3+300',state:"0"}]}
                ]
            }
        },
        mounted(){
            initDahua()
            this.deviceName  = this.$route.query.deviceName
            console.log("deviceName",this.deviceName);
        },
         watch: {
            filterText(val) {
                if(this.activeName === 'first'){
                    this.$refs.tree.filter(val);
                }else{
                    this.$refs.treeTwo.filter(val);
                }
            },
        },
        methods:{
            //筛选节点信息
            filterNode(value,data){
                if(!value){
                    return true
                }
                return data.label.indexOf(value) !== -1
            },
            handleTabClick(tab){
                this.filterText=""
                if(tab.name==="first"){
                    console.log(111)
                    //请求默认资源树数据
                    this.$refs.tree.filter();
                }else{
                    //请求我的资源树数据
                    console.log(222)
                    this.$refs.treeTwo.filter();
                }
            },
            // 获取所有摄像机
            getAllCameras(){
                this.$postJson('/vedioManager/selectAllVedio.htm').then(res=>{
                    if(res.success === true){
                        this.cameraLists = res.data
                    }else{
                        this.$message({
                            type:'error',
                            message:res.msg
                        })
                    }
                })
            },
            // 获取我的摄像机资源
            getMyCameras(){
                this.$$postJson('/vedioManager/selectUserResources.htm').then(res=>{
                    if(res.success === true){
                        this.myCameraLists = res.data
                    }else{
                        this.$message({
                            type:'error',
                            message:res.msg
                        })
                    }
                })
            },
            // 点击列表项加载改摄像机
            selectCamera(data){
                if(!data.children){
                    console.log(data);
                    // JQuery('#loginip').val(data.devIp)
                    // JQuery('#port').val(data.devPort)
                    // JQuery('#username').val(data.cctvUsername)
                    // JQuery('#password').val(data.cctvPassword)
                    // JQuery('#rtspport').val(data.rtspport)
                    // JQuery('#protocolType').val(data.commProtocol)
                    // window.clickLogin()
                }
            },
            // 添加摄像头到我的资源里
            appendMyLists(data){
                console.log(data)
                this.$postJson('/vedioManager/addUserResources.htm',{devId:data.devId}).then(res=>{
                    if(res.success === true){

                    }else{
                        this.$message({
                            type:'error',
                            message:res.msg
                        })
                    }
                });
            },
            // 从我的资源里删除摄像头
            delMyLists(data){
                console.log(data)
                this.$postJson('/vedioManager/removeUserResources.htm',{devId:data.devId}).then(res=>{
                    if(res.success === true){

                    }else{
                        this.$message({
                            type:'error',
                            message:res.msg
                        })
                    }
                });
            },
            //切换摄像头屏幕
            changeNum(num){
                document.getElementById('wndNum').value = num
                window.changeWndNum(num)
            },
            //设置全屏
            changeFullScreen(){
                window.clickFullScreen()
            },
            //设置点击云台按钮 按下
            changeCameraDown(type){
                switch(type){
                    case 'leftTop':
                    window.mouseUPLeftPTZControl(false);
                    break;
                    case 'centerTop':
                    window.mouseUpPTZControl(false);
                    break;
                    case 'rightTop':
                    window.mouseUPRightPTZControl(false);
                    break;
                    case 'leftMiddle':
                    window.mouseLefPTZControl(false);
                    break;
                    case 'rightMiddle':
                    window.mouseRightPTZControl(false);
                    break;
                    case 'leftBottom':
                    window.mouseDownLeftPTZControl(false)
                    break;
                    case 'centerBottom':
                    window.mouseDownPTZControl(false)
                    break;
                    case 'rightBottom':
                    window.mouseDownRightPTZControl(false);
                    break;
                    default:
                }
            },
            // 设置点击云台按钮 抬起
            changeCameraUp(type){
                switch(type){
                    case 'leftTop':
                    window.mouseUPLeftPTZControl(true);
                    break;
                    case 'centerTop':
                    window.mouseUpPTZControl(true);
                    break;
                    case 'rightTop':
                    window.mouseUPRightPTZControl(true);
                    break;
                    case 'leftMiddle':
                    window.mouseLefPTZControl(true);
                    break;
                    case 'rightMiddle':
                    window.mouseRightPTZControl(true);
                    break;
                    case 'leftBottom':
                    window.mouseDownLeftPTZControl(true)
                    break;
                    case 'centerBottom':
                    window.mouseDownPTZControl(true)
                    break;
                    case 'rightBottom':
                    window.mouseDownRightPTZControl(true);
                    break;
                    default:
                }
            },
            // 控制云平台中间按钮
            changeYunCamera(){
                if(this.cameraFlag){
                    window.openPtzLocate();
                }else{
                    window.closePtzLocate();
                }
                this.cameraFlag = !this.cameraFlag
            },
            // 抓图
            capturePic(){
                window.clickCapturePic()
            },
            //控制摄像机录像
            changePreCamera(){
                if(this.previewFlag){
                    window.clickStartRecord();
                }else{
                    window.clickStopRecord()
                }
                this.previewFlag = !this.previewFlag
            },
            //开始预览视频
            handleCameraFresh(){
                window.clickStartRealPlay()
            },
            //关闭视频
            handleCameraClose(){
                window.clickStopRealPlay();
            },
            //控制光圈
            handleGuangQuan(type,flag){
                if(type === 1){
                    window.PTZZoomIn(flag)
                }else{
                    window.PTZZoomout(flag)
                }
            },
            //控制变焦
            handleBianJiao(type,flag){
                if(type === 1){
                    window.PTZFocusIn(flag)
                }else{
                    window.PTZFoucusOut(flag)
                }
            },
            // 控制变倍
            handleBianBei(type,flag){
                if(type === 1){
                    window.PTZIrisIn(flag)
                }else{
                    window.PTZIrisOut(flag)
                }
            }
        }
    }
</script>

<style scoped>
.btnSpec{
    margin-left:20px;
    margin-top:10px;
}
i{
    font-size: 24px;
    margin-left:10px;
    margin-top:10px;
    cursor: pointer
}
i:hover{
    color: #0099ff;
}
.tree i:hover{
    color: #606266
}
</style>