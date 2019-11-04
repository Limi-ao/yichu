function ModelBussiness() {
    this.currentAnimationState = 0;
}
ModelBussiness.prototype.init = function (roomName) {
    //悬停回调
    WT3DObj.mouseOverCallBack = this.mouseOverCallBack;
    //进入回调
    WT3DObj.mouseOverInCallBack = this.mouseOverInCallBack;
    //离开回调
    WT3DObj.mouseOverLeaveCallBack = this.mouseOverLeaveCallBack;
    //悬停触发时间长度
    WT3DObj.mouseOverTimeLong = 1000;
}

//单击选中
ModelBussiness.prototype.clickSelectCabinet = function (_obj, _face) {
}
ModelBussiness.prototype.currentShowCabinet = null;
ModelBussiness.prototype.currentState = 0;

//双击选中
ModelBussiness.prototype.dbClickSelectCabinet = function (_obj, _face) {
    if (!_obj.visible) {
        return;
    }

    if (_obj.name.indexOf("cube2_612") >= 0
      ) {
        modelBussiness.clickBuildAnimation();
    } else if (_obj.name.indexOf("b1_floor_") >= 0
      ) {
        //显示楼层
        modelBussiness.clickFloorAnimation(_obj);
    } else if (_obj.name.indexOf("floor_room_zt") >= 0
      ) {
        //显示楼层
        modelBussiness.clickRoomAnimation(_obj);
        
    } else if (_obj.name.indexOf("b3_tv_2") >= 0 || _obj.name.indexOf("messagePanel_2") >= 0) {
        modelBussiness.resetBuild();
    }
    //双击摄像机
    else if (_obj.name.indexOf("camera") >= 0) { 
    }
}

//悬停
ModelBussiness.prototype.mouseOverCallBack = function (_obj, face) {
}
ModelBussiness.prototype.mouseInCurrentObj = null;
ModelBussiness.prototype.lastMouseInCurrentObj = null;
ModelBussiness.prototype.mouseOverInCallBack = function (_obj, face) {
    var _this = this;
    var color = 0xbfffea;
    modelBussiness.lastMouseInCurrentObj = _obj;
    modelBussiness.mouseInCurrentObj = _obj;
    if (_obj.name.indexOf("dev_") >= 0) {
        var _sobj = _obj;
        if (_obj.name.indexOf("OBJCREN") > 0) {
            _sobj = _obj.parent;
        }
        modelBussiness.mouseInCurrentObj = _sobj;
        WT3DObj.commonFunc.setSkinColorByObj(_sobj, 0x00ffff);
    } 
}
ModelBussiness.prototype.mouseOverLeaveCallBack = function (_obj, face, nowobj) {
    var _this = this;
    var color = 0x000000;
    if (_obj.name.indexOf("dev_") >= 0) {
        var _sobj = _obj;
        if (_obj.name.indexOf("OBJCREN") > 0) {
            _sobj = _obj.parent;
        }
        WT3DObj.commonFunc.setSkinColorByObj(_sobj, 0x000000);
    }

}
 
var modelBussiness = new ModelBussiness();