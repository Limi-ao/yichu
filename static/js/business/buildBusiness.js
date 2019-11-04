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
    if (_obj.name.indexOf("light_ptssd") >= 0
        || _obj.name.indexOf("makeTextSprite_2") >= 0
        || _obj.name.indexOf("road_suidao_1") >= 0
        || _obj.name.indexOf("road_suidao_2") >= 0) {
        parent.selectMap('shuidao');
    }else if (_obj.name.indexOf("light_xsdq") >= 0
        || _obj.name.indexOf("road_xsdq") >= 0
            || _obj.name.indexOf("0makeTextSprite_82") >= 0
    ) {
        parent.selectMap('xsdq');
    } else if (_obj.name.indexOf("light_gsdq") >= 0
        || _obj.name.indexOf("road_gsdq_") >= 0
        || _obj.name.indexOf("makeTextSprite_3") >= 0
    ){
        parent.selectMap('gsdq');
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

    console.log(_obj.name);
    modelBussiness.lastMouseInCurrentObj = _obj;
    modelBussiness.mouseInCurrentObj = _obj;
    if (_obj.name.indexOf("light_") >= 0 ) {
        var _sobj = _obj;
        if (_obj.name.indexOf("OBJCREN") > 0) {
            _sobj = _obj.parent;
        }
        modelBussiness.mouseInCurrentObj = _sobj;
        WT3DObj.commonFunc.setSkinColorByObj(_sobj, 0x00ff00);
    }
    
}
ModelBussiness.prototype.mouseOverLeaveCallBack = function (_obj, face, nowobj) {
    var _this = this;
    var color = 0x000000;
    if (_obj.name.indexOf("light_") >= 0 ) {
        var _sobj = _obj;
        if (_obj.name.indexOf("OBJCREN") > 0) {
            _sobj = _obj.parent;
        }
        WT3DObj.commonFunc.setSkinColorByObj(_sobj, 0x000000);
    } 
}
 
var modelBussiness = new ModelBussiness();