/**
 * Created by gecheng on 2016/8/1.
 */


var httpInvoke = function (url, type, data, successCb, failedCb, userData, async) {

    return $.ajax({
        url: url,
        type: type,
        data: data,
        async: async,
        times: 0,
        beforeSend: function (request) { },
        success: function (response, status, hreq) {
            if (successCb != null) {
                successCb(response, status, userData);
            }
        },
        error: function (err) {
            console.log(err);
            if (failedCb != null) {
                failedCb(err.statusCode(), userData);
            }
        }

    })
}

var httpPost = function (url, data, successCb, failedCb, userData) {
    return httpInvoke(url, "POST", data, successCb, failedCb, userData, true);
}
var httpPostSyn = function (url, data, successCb, failedCb, userData) {
    return httpInvoke(url, "POST", data, successCb, failedCb, userData, false);
}

var httpGet = function (url, successCb, failedCb, userData) {
    return httpInvoke(url, "GET", null, successCb, failedCb, userData, true);
}


var httpPut = function (url, data, successCb, failedCb, userData) {
    return httpInvoke(url, "PUT", data, successCb, failedCb, userData, true);
}
var httpPutSyn = function (url, data, successCb, failedCb, userData) {
    return httpInvoke(url, "PUT", data, successCb, failedCb, userData, false);
}

var httpGetSyn = function (url, successCb, failedCb, userData) {
    return httpInvoke(url, "GET", null, successCb, failedCb, userData, false);
}

var httpDelete = function (url, successCb, failedCb, userData) {
    return httpInvoke(url, "DELETE", null, successCb, failedCb, userData, true);
}
var httpDeleteSyn = function (url, successCb, failedCb, userData) {
    return httpInvoke(url, "DELETE", null, successCb, failedCb, userData, false);
}
var httpDeleteByDataSyn = function (url, data, successCb, failedCb, userData) {
    return httpInvoke(url, "DELETE", data, successCb, failedCb, userData, false);
}
/**
 * 获取请求URL的参数信息，返回参数Map，可直接通过名称获取参数的值
 */
function getRequestParams() {
    // 获取url中"?"符后的字串
    var url = window.location.search;
    if (url == "") {
        url = "?"+window.location.hash.split("?")[1];
    }
    var requestParams = new Object();
    if (url.indexOf("?") != -1) {
        var strs = url.substr(1).split("&");
        for (var i = 0; i < strs.length; i++) {
            requestParams[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return requestParams;
};

/**
 * 获取请求URL的某个参数的值
 *
 * @paramName：参数名称
 */
function getQueryString(paramName) {
    var reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)", "i");
    var url = window.location.search;
    if (url == "") {
        url = "?" + window.location.hash.split("?")[1];
    }
    var value = url.substr(1).match(reg);
    if (value != null) {
        return unescape(value[2]);
    } else {
        return null
    }
    ;
};

/*
 * forDecimal(decimalValue,decimals):数值格式化函数，decimals要 格式化的 数字，How要保留的小数位数。
 */
function forDecimal(decimalValue, decimals) {
    Dight = Math.round(decimalValue * Math.pow(10, decimals))
        / Math.pow(10, decimals);
    return Dight;
}

/**
 * 添加引用js文件
 */
function addJsFile(filePath, callback) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = filePath;
    if (script.readyState) { // IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded"
                || script.readyState == "complete") {
                script.onreadystatechange = null;
                if (callback) {
                    callback();
                }
            }
        };
    } else { // Others
        script.onload = function () {
            if (callback) {
                callback();
            }
        };
    }

    document.getElementsByTagName("head")[0].appendChild(script);
}

/**
 * 添加引用CSS文件
 */
function addCssFile(filePath) {
    var cssRef = document.createElement('link');
    cssRef.setAttribute("rel", "stylesheet");
    cssRef.setAttribute("type", "text/css");
    cssRef.setAttribute("href", filePath);
    document.getElementsByTagName("head")[0].appendChild(cssRef);
}

/**
 * 字符串拼接
 */
function JionString() {
    if (arguments.length > 0) {
        var result = "";
        var char = arguments[0];
        for (var index = 1; index < arguments.length; index++) {
            if (result == "") {
                result += arguments[index];
            } else {
                result += (char + arguments[index]);
            }
        }
        return result;
    } else {
        return "";
    }
}

/**
 * 判断空
 */
function isNotNull(obj) {
    if (typeof (obj) == 'undefined' || obj == null) {
        return false;
    } else {
        return true;
    }
}

Date.prototype.format = function (format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
               ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}
/**
 * 转16进制
 */
function hexToString(str) {
    var val = "";
    var arr = str.split(",");
    for (var i = 0; i < arr.length; i++) {
        val += arr[i].fromCharCode(i);
    }
    return val;
}

/**
 * 在控件底部显示提示信息
 */
function showTips(message, id) {
    layer.tips(message, '#' + id, {
        tips: [3, 'orangered']
    });
}

function showMsg(message) {
    layer.msg(message);
}

String.prototype.endsWith = function (endStr) {
    var d = this.length - endStr.length;
    return (d >= 0 && this.lastIndexOf(endStr) == d)
}
function newWin(url, id) {
    var a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.setAttribute('id', id);
    // 防止反复添加
    if(!document.getElementById(id)) {                     
        document.body.appendChild(a);
    }
    a.click();
}
/**
 * yyyyMMddHHmmss时间字符串转Date格式
 */
function format7ToDate(strTime) {
    var dateString = '1901/01/01 00:00:00';
    if (strTime != undefined && strTime != null && strTime.length >= 14) {
        dateString = strTime.slice(0, 4) + '/' + strTime.slice(4, 6) + '/'
            + strTime.slice(6, 8) + ' ' + strTime.slice(8, 10) + ':'
            + strTime.slice(10, 12) + ':' + strTime.slice(12, 14);
    }
    return new Date(dateString);
}

//日期格式化
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
function formatDateToString(date) {
    var dateTime = new Date(date);
    var hours = dateTime.getHours() >= 10 ? dateTime.getHours() : "0"
    + dateTime.getHours();
    var minutes = dateTime.getMinutes() >= 10 ? dateTime.getMinutes() : "0"
    + dateTime.getMinutes();
    var seconds = dateTime.getSeconds() >= 10 ? dateTime.getSeconds() : "0"
    + dateTime.getSeconds();
    var timeStr = dateTime.getFullYear() + "-" + (dateTime.getMonth() + 1)
        + "-" + dateTime.getDate() + " " + hours + ":" + minutes + ":"
        + seconds;
    return timeStr;
}
function parseToInt(a) {
    var b =-32767;
    try {
        b = parseInt(a);
    }catch(err){
        b = -32767;
    }
    if (a == undefined || a == null ) {
        b = -32767;
    }
    if (b!=0&&!b) {
        b = -32767;
    }
    return b;
}
function parseToFloat(a) {
    var b = -32767;
    try {
        b = parseFloat(a);
    } catch (err) {
        b = -32767;
    }
    if (a == undefined || a == null) {
        b = -32767;
    }
    if (b != 0 && !b) {
        b = -32767;
    }
    return b;
}
/**
 * 获取上一个月
 *
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
function getPreMonth(date) {
    var arr = date.split('-');
    var year = arr[0]; // 获取当前日期的年份
    var month = arr[1]; // 获取当前日期的月份
    var day = arr[2]; // 获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); // 获取当前日期中月的天数
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
}
/**
 * 获取当前日期
 *
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
function getNow_yyyy_mm_dd() {
    var myDate = new Date();
    var t2 = myDate.getFullYear() + '-' + FormatIntToDD(myDate.getMonth() + 1)
        + '-' + FormatIntToDD(myDate.getDate());
    return t2;
}
/**
 * 获取前一天日期
 *
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
function getPre_yyyy_mm_dd() {
    var myDate = new Date();
    if (myDate.getDate() > 1) {
        return myDate.getFullYear() + '-'
            + FormatIntToDD(myDate.getMonth() + 1) + '-'
            + FormatIntToDD(myDate.getDate() - 1);
    } else {
        var year = myDate.getFullYear();
        var month = myDate.getMonth();// 上一个月
        if (month == 0) {
            month = 12;
            year = year - 1;
        }
        var days = new Date(year, month, 0);
        days = days.getDate(); // 获取当前日期中月的天数
        return year + '-' + FormatIntToDD(month) + '-' + FormatIntToDD(days);
    }
}
/**
 * 获取前n天日期
 *
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
function getPreNDay_yyyy_mm_dd(n) {
    var myDate = new Date();

    if (myDate.getDate() > n) {
        return myDate.getFullYear() + '-'
            + FormatIntToDD(myDate.getMonth() + 1) + '-'
            + FormatIntToDD(myDate.getDate() - n);
    } else {
        var year = myDate.getFullYear();
        var month = myDate.getMonth();// 上一个月
        if (month == 0) {
            month = 12;
            year = year - 1;
        }
        var days = new Date(year, month, 0);
        days = days.getDate(); // 获取当前日期中月的天数
        console.log((days + myDate.getDate() - n));
        return year + '-' + FormatIntToDD(month) + '-'
            + FormatIntToDD(days + myDate.getDate() - n);
    }
}

/**
 * 获取前n个月日期
 *
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
function getPreNMonthDay_yyyy_mm_dd(n) {
    var myDate = new Date();

    if ((myDate.getMonth() + 1) > n) {
        return myDate.getFullYear() + '-'
            + FormatIntToDD(myDate.getMonth() + 1 - n) + '-'
            + FormatIntToDD(myDate.getDate());
    } else {
        var year = myDate.getFullYear();
        year = year - 1;
        var month = myDate.getMonth();// 上一个月
        month = 13 + month - n;
        var days = new Date(year, month, 0);
        days = days.getDate(); // 获取当前日期中月的天数
        console.log((days + myDate.getDate() - n));
        return year + '-' + FormatIntToDD(month) + '-'
            + FormatIntToDD(myDate.getDate());
    }
}

function getTime(/** timestamp=0 **/) {
    var ts = arguments[0] || 0;
    var t, y, m, d, h, i, s;
    if (ts) {
        t = new Date(ts);
    }
    else {
        return "";
    }
    y = t.getFullYear();
    m = t.getMonth() + 1;
    d = t.getDate();
    h = t.getHours();
    i = t.getMinutes();
    s = t.getSeconds();
    // 可根据需要在这里定义时间格式  
    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (i < 10 ? '0' + i : i) + ':' + (s < 10 ? '0' + s : s);
}
 

function getServerUrl(mapping) {
    return serverInfoService.getServerURL() + mapping;
};
/**
 * 格式化数字 00
 */
function FormatIntToDD(d) {
    if (d < 10)
        return "0" + d;
    else
        return d + "";
}

/**
 * 异步执行方法
 */
function asynLoad(callbackMethod, times) {
    if (callbackMethod != null) {
        var _times = 1;
        if (times) {
            _times = times;
        }
        setTimeout(function () {
            callbackMethod();
        }, _times);
    }
};
 
/**
 * 向左补位
 */
function padLeft(str, length) {
    if (str.length >= length) {
        return str;
    } else {
        return padLeft("0" + str, length);
    }
}

/**
 * 向左补位
 */
function padLeftStr(str, length, mark) {
    if (str.length >= length) {
        return str;
    } else {
        return padLeftStr(mark + str, length, mark);
    }
}

 


/**
 * 验证是否为正确的手机号码
 */
function isPhone(phoneNo) {
    var reg = /^((1[3-9]{2})+\d{8})$/;
    if (!reg.test(phoneNo)) {
        return false;
    } else {
        return true;
    }
}

/**
 * 验证是否为正确的电子邮箱号码
 */
function isEmail(emailNo) {
    var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!reg.test(emailNo)) {
        return false;
    } else {
        return true;
    }
}

/**
 * 验证是否为正确的电话号码
 */
function isTel(telNo) {
    var reg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
    if (!reg.test(telNo)) {
        return false;
    } else {
        return true;
    }
}
/**
 * 获取密码强度
 */
function getPasswordStrength(password) {
    var upperCase = new RegExp('[A-Z]');
    var lowerCase = new RegExp('[a-z]');
    var numbers = new RegExp('[0-9]');
    var strengthValue = 0;
    if (password != numbers && password.length > 3) {
        if (password.match(numbers)) {
            strengthValue++;
        }
        if (password.match(lowerCase) || password.match(upperCase)) {
            strengthValue++;
        }
        if (password.match(lowerCase) && password.match(upperCase)) {
            strengthValue++;
        }

        if (!password.match(numbers) && !password.match(lowerCase)
            && !password.match(lowerCase)) {
            strengthValue++;
        }

        if (strengthValue > 3 && password.length <= 8) {
            strengthValue = 3;
        } else if (strengthValue == 3 && password.length > 8) {
            strengthValue = 4;
        }
    }

    return strengthValue;
};

/**
 * 清空左侧树的内容
 */
function clearMainTree() {
    $("#treeList").empty();
};

function getFontIcons() {
    return "adjust|anchor|archive|area-chart|arrows|arrows-h|arrows-v|asl-interpreting|assistive-listening-systems|asterisk|at|audio-description|automobile|balance-scale|ban|bank|bar-chart|bar-chart-o|barcode|bars|battery-0|battery-1|battery-2|battery-3|battery-4|battery-empty|battery-full|battery-half|battery-quarter|battery-three-quarters|bed|beer|bell|bell-o|bell-slash|bell-slash-o|bicycle|binoculars|birthday-cake|blind|bluetooth|bluetooth-b|bolt|bomb|book|bookmark|bookmark-o|braille|briefcase|bug|building|building-o|bullhorn|bullseye|bus|cab|calculator|calendar|calendar-check-o|calendar-minus-o|calendar-o|calendar-plus-o|calendar-times-o|camera|camera-retro|car|caret-square-o-down|caret-square-o-left|caret-square-o-right|caret-square-o-up|cart-arrow-down|cart-plus|cc|certificate|check|check-circle|check-circle-o|check-square|check-square-o|child|circle|circle-o|circle-o-notch|circle-thin|clock-o|clone|close|cloud|cloud-download|cloud-upload|code|code-fork|coffee|cog|cogs|comment|comment-o|commenting|commenting-o|comments|comments-o|compass|copyright|creative-commons|credit-card|credit-card-alt|crop|crosshairs|cube|cubes|cutlery|dashboard|database|deaf|deafness|desktop|diamond|dot-circle-o|download|edit|ellipsis-h|ellipsis-v|envelope|envelope-o|envelope-square|eraser|exchange|exclamation|exclamation-circle|exclamation-triangle|external-link|external-link-square|eye|eye-slash|eyedropper|fax|feed|female|fighter-jet|file-archive-o|file-audio-o|file-code-o|file-excel-o|file-image-o|file-movie-o|file-pdf-o|file-photo-o|file-picture-o|file-powerpoint-o|file-sound-o|file-video-o|file-word-o|file-zip-o|film|filter|fire|fire-extinguisher|flag|flag-checkered|flag-o|flash|flask|folder|folder-o|folder-open|folder-open-o|frown-o|futbol-o|gamepad|gavel|gear|gears|gift|glass|globe|graduation-cap|group|hand-grab-o|hand-lizard-o|hand-paper-o|hand-peace-o|hand-pointer-o|hand-rock-o|hand-scissors-o|hand-spock-o|hand-stop-o|hard-of-hearing|hashtag|hdd-o|headphones|heart|heart-o|heartbeat|history|home|hotel|hourglass|hourglass-1|hourglass-2|hourglass-3|hourglass-end|hourglass-half|hourglass-o|hourglass-start|i-cursor|image|inbox|industry|info|info-circle|institution|key|keyboard-o|language|laptop|leaf|legal|lemon-o|level-down|level-up|life-bouy|life-buoy|life-ring|life-saver|lightbulb-o|line-chart|location-arrow|lock|low-vision|magic|magnet|mail-forward|mail-reply|mail-reply-all|male|map|map-marker|map-o|map-pin|map-signs|meh-o|microphone|microphone-slash|minus|minus-circle|minus-square|minus-square-o|mobile|mobile-phone|money|moon-o|mortar-board|motorcycle|mouse-pointer|music|navicon|newspaper-o|object-group|object-ungroup|paint-brush|paper-plane|paper-plane-o|paw|pencil|pencil-square|pencil-square-o|percent|phone|phone-square|photo|picture-o|pie-chart|plane|plug|plus|plus-circle|plus-square|plus-square-o|power-off|print|puzzle-piece|qrcode|question|question-circle|question-circle-o|quote-left|quote-right|random|recycle|refresh|registered|remove|reorder|reply|reply-all|retweet|road|rocket|rss|rss-square|search|search-minus|search-plus|send|send-o|server|share|share-alt|share-alt-square|share-square|share-square-o|shield|ship|shopping-bag|shopping-basket|shopping-cart|sign-in|sign-language|sign-out|signal|signing|sitemap|sliders|smile-o|soccer-ball-o|sort|sort-alpha-asc|sort-alpha-desc|sort-amount-asc|sort-amount-desc|sort-asc|sort-desc|sort-down|sort-numeric-asc|sort-numeric-desc|sort-up|space-shuttle|spinner|spoon|square|square-o|star|star-half|star-half-empty|star-half-full|star-half-o|star-o|sticky-note|sticky-note-o|street-view|suitcase|sun-o|support|tablet|tachometer|tag|tags|tasks|taxi|television|terminal|thumb-tack|thumbs-down|thumbs-o-down|thumbs-o-up|thumbs-up|ticket|times|times-circle|times-circle-o|tint|toggle-down|toggle-left|toggle-off|toggle-on|toggle-right|toggle-up|trademark|trash|trash-o|tree|trophy|truck|tty|tv|umbrella|universal-access|university|unlock|unlock-alt|unsorted|upload|user|user-plus|user-secret|user-times|users|video-camera|volume-control-phone|volume-down|volume-off|volume-up|warning|wheelchair|wheelchair-alt|wifi|wrench";
}
function showSelectIcons(selectFunc) {
    var html = '<div style="max-height:300px;max-width:300px;">';
    var icons = getFontIcons();
    var iconArr = icons.split('|');
    for (var i = 0; i < iconArr.length; i++) {
        html += '<i class="ace-icon fa fa-' + iconArr[i] + ' icon-only icon-select" data-fa="' + iconArr[i] + '" style="font-size:40px;margin:5px;cursor:pointer;"></i>';
    }
    html += '</div>';
    var layerindex = layer.open({
        type: 1,
        title: "图标选择",
        skin: 'layer-ext-blackskin',
        btn: false, //只是为了演示
        offset: 't' //具体配置参考：offset参数项
        , content: html
        , btnAlign: 'c' //按钮居中
        , shade: 0 //不显示遮罩
    });
    $(".icon-select").click(function () {
        selectFunc("fa fa-" + $(this).attr("data-fa"));
        layer.close(layerindex);
    })
}
/**
 * 时间大小比较
 * */
function compareTime(time1, time2) {
    var beginTime = time1.replace('-', '').replace(' ', '').replace(':', '');
    var endTime = time2.replace('-', '').replace(' ', '').replace(':', '');
    return beginTime > endTime;
}

/**
 * 移动DIV div名称 div识别列表 矫正x 矫正y
 */
function moveDiv(divName, firstName, correctX, correctY, divWidth) {

    //移动-鼠标事件
    $('#' + divName).mousedown(
        function (event) {
            var _zindex = $('#' + divName).css('z-index');
            if (_zindex == null || _zindex == 'auto') {
                _zindex = 10000;
            }
            $("div[id^='" + firstName + "']").css('z-index', _zindex);
            $('#' + divName).css('z-index', _zindex + 1);

            var isMove = true;
            var abs_x = event.pageX - $('#' + divName).offset().left;
            var abs_y = event.pageY - $('#' + divName).offset().top;
            $(document).mousemove(function (event) {
                    if (isMove) {
                        var obj = $('#' + divName);
                        obj.css({'left': event.pageX - abs_x + correctX, 'top': event.pageY - abs_y + correctY});
                    }
                }
            ).mouseup(
                function () {
                    isMove = false;
                }
            );
        }
    );
    //移动 touch事件
    $('#' + divName).attr("data-betouched", "false");
    $('#' + divName).on("touchend", function (e) {
        console.log("touchend");
        $('#' + divName).attr("data-betouched", "false");
    });
    document.getElementById('' + divName).addEventListener('touchstart', function (e) {
        console.log("touchstart");
        var _zindex = $('#' + divName).css('z-index');
        if (_zindex == null || _zindex == 'auto') {
            _zindex = 10000;
        }
        $("div[id^='" + firstName + "']").css('z-index', _zindex);
        $('#' + divName).css('z-index', _zindex + 1);
        $('#' + divName).attr("data-betouched", "true");
        $('#' + divName).attr("data-tx", parseInt($('#' + divName).css("left")));
        $('#' + divName).attr("data-ty", parseInt($('#' + divName).css("top")));
        $('#' + divName).attr("data-x", e.touches[0].pageX);
        $('#' + divName).attr("data-y", e.touches[0].pageY);
        return false;
    });
    document.getElementById('' + divName).addEventListener('touchmove', function (e) {
        console.log("touchmove");
        if ($('#' + divName).attr("data-betouched") == "true") {
            var n = parseInt($('#' + divName).attr("data-tx")) + e.touches[0].pageX - parseInt($('#' + divName).attr("data-x"));
            var m = parseInt($('#' + divName).attr("data-ty")) + e.touches[0].pageY - parseInt($('#' + divName).attr("data-y"));
            if (n > 0 && n < $(window).width() - divWidth) {
                $('#' + divName).css("left", n);
            }
            if (m > 0 && m < $(window).height() - divWidth) {
                $('#' + divName).css("top", m);
            }
            return false;
        }
    });


}
//上传文件到媒体服务器
function uploadFileToMediaServer() {

}
//转为液晶字体
function changeToLEDFont(fnub, fcolor, fsize) {
    var nubArr = (fnub + "").split("");
    var newnub = "";
    $.each(nubArr, function (_index, _obj) {
        switch (_obj) {
            case ".":
                newnub += '<i class="icon iconfont icon-icon-fdot" style="font-size:' + fsize + 'px;color:' + fcolor + ';margin-left:-' + parseInt(fsize / 4) + 'px;margin-right:-' + parseInt(fsize / 4) + 'px;"></i>';
                break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                newnub += '<i class="icon iconfont icon-icon-f' + _obj + '" style="font-size:' + fsize + 'px;color:' + fcolor + ';margin-left:-' + parseInt(fsize / 4) + 'px;margin-right:-' + parseInt(fsize / 4) + 'px;"></i>';
                break;
            default:
                newnub += '<font style="font-size:' + fsize + 'px;color:' + fcolor + ';">' + _obj + '</font>';
                break;
        }
    });
    return newnub;
}
function LEDFontNub(nub, width, height, RADIUS) {
    var digit =
        [
            [
                [0, 0, 1, 1, 1, 0, 0],
                [0, 1, 1, 0, 1, 1, 0],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [0, 1, 1, 0, 1, 1, 0],
                [0, 0, 1, 1, 1, 0, 0]
            ],//0  
            [
                [0, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 1, 1, 0, 0],
                [0, 0, 0, 1, 1, 0, 0],
                [0, 0, 0, 1, 1, 0, 0],
                [0, 0, 0, 1, 1, 0, 0],
                [0, 0, 0, 1, 1, 0, 0],
                [0, 0, 0, 1, 1, 0, 0],
                [0, 0, 0, 1, 1, 0, 0],
                [0, 0, 0, 1, 1, 0, 0],
                [1, 1, 1, 1, 1, 1, 1]
            ],//1  
            [
                [0, 1, 1, 1, 1, 1, 0],
                [1, 1, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 1, 1, 0],
                [0, 0, 0, 1, 1, 0, 0],
                [0, 0, 1, 1, 0, 0, 0],
                [0, 1, 1, 0, 0, 0, 0],
                [1, 1, 0, 0, 0, 0, 0],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 1, 1, 1, 1, 1]
            ],//2  
            [
                [1, 1, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 1, 1, 0],
                [0, 0, 0, 1, 1, 0, 0],
                [0, 0, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 1, 1, 0],
                [0, 0, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [0, 1, 1, 1, 1, 1, 0]
            ],//3  
            [
                [0, 0, 0, 0, 1, 1, 0],
                [0, 0, 0, 1, 1, 1, 0],
                [0, 0, 1, 1, 1, 1, 0],
                [0, 1, 1, 0, 1, 1, 0],
                [1, 1, 0, 0, 1, 1, 0],
                [1, 1, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 1, 1, 0],
                [0, 0, 0, 0, 1, 1, 0],
                [0, 0, 0, 0, 1, 1, 0],
                [0, 0, 0, 1, 1, 1, 1]
            ],//4  
            [
                [1, 1, 1, 1, 1, 1, 1],
                [1, 1, 0, 0, 0, 0, 0],
                [1, 1, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 0],
                [0, 0, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [0, 1, 1, 1, 1, 1, 0]
            ],//5  
            [
                [0, 0, 0, 0, 1, 1, 0],
                [0, 0, 1, 1, 0, 0, 0],
                [0, 1, 1, 0, 0, 0, 0],
                [1, 1, 0, 0, 0, 0, 0],
                [1, 1, 0, 1, 1, 1, 0],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [0, 1, 1, 1, 1, 1, 0]
            ],//6  
            [
                [1, 1, 1, 1, 1, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 1, 1, 0],
                [0, 0, 0, 0, 1, 1, 0],
                [0, 0, 0, 1, 1, 0, 0],
                [0, 0, 0, 1, 1, 0, 0],
                [0, 0, 1, 1, 0, 0, 0],
                [0, 0, 1, 1, 0, 0, 0],
                [0, 0, 1, 1, 0, 0, 0],
                [0, 0, 1, 1, 0, 0, 0]
            ],//7  
            [
                [0, 1, 1, 1, 1, 1, 0],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [0, 1, 1, 1, 1, 1, 0],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [0, 1, 1, 1, 1, 1, 0]
            ],//8  
            [
                [0, 1, 1, 1, 1, 1, 0],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [0, 1, 1, 1, 0, 1, 1],
                [0, 0, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 1, 1, 0],
                [0, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 0, 0, 0, 0]
            ],//9  
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],//: 
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 1, 0]
            ]//.  
        ];
    var WINDOW_WIDTH = width;
    var WINDOW_HEIGHT = height;
    var RADIUS = 8;
    var MARGIN_TOP = 60;
    var MARGIN_LEFT = 30;

    var endTime = new Date(2015, 1, 22, 18, 47, 52);
    var curShowTimeSeconds = 0;

    window.onload = function () {
        //自适应屏幕
        WINDOW_WIDTH = document.body.clientWidth;
        WINDOW_HEIGHT = document.body.clientHeight;

        MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
        RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1;

        MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);
        time();
    };
    /**
     * 绘制LED点阵数字
     */
    function render(cxt) {
        var curTime = new Date();
        cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
        cxt.fillStyle = "black";
        cxt.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);  //填充颜色 x y坐标 宽 高
        cxt.strokeRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);  //填充边框 x y坐标 宽 高

        var hours = parseInt(curTime.getHours());
        var minutes = parseInt(curTime.getMinutes());
        var seconds = parseInt(curTime.getSeconds());

        renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt);
        renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt);
        renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
        renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt);
        renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt);
        renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
        renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);
        renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);
    }

    function renderDigit(x, y, num, cxt) {
        for (var i = 0; i < digit[num].length; i++) {
            for (var j = 0; j < digit[num][i].length; j++) {
                if (digit[num][i][j] == 1) {
                    cxt.fillStyle = "red";
                } else {
                    cxt.fillStyle = "rgb(20,20,20)";
                }
                cxt.beginPath();
                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }

    /**
     * 开始计时
     * @return {[type]} [description]
     */
    function time() {
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext("2d");
        canvas.width = WINDOW_WIDTH;
        canvas.height = WINDOW_HEIGHT;
        context.clearRect(0, 0, canvas.width, canvas.height);
        setInterval(
            function () {
                render(context);
            },
            50
        );
    }

}
function showLoading(needLoadLength,fzfunc,callBack) {

    var _html = '<div class="layui-progress layui-progress-big" lay-showpercent="true" lay-filter="progress">\
                                                          <div class="layui-progress-bar layui-bg-red" lay-percent="10%"></div>\
                                                         </div>';
    var layerIndex = layer.open({
        type: 1,
        title: false,
        closeBtn: 0,
        shade: 0.6,
        area: '516px',
        skin: 'layui-layer-nobg', //没有背景色
        shadeClose: false,
        content: _html
    });
    function setProcessValue() {
        setTimeout(function () {
            var value = 0;
            if (WT3DObj && WT3DObj.scene) {
                var getcurrentLgth = (fzfunc ? fzfunc() : WT3DObj.scene.children.length);
                value = Math.floor(getcurrentLgth/ needLoadLength * 100);
            } else {
                value = 0;
            }
            layui.use('element', function () {
                layui.element.progress("progress", value + "%")
            });
            if (value < 100) {
                setProcessValue();
            } else {
                layer.closeAll();
                modelBussiness.init();
                if (callBack) {
                    callBack();
                } else {
                WT3DObj.commonFunc.changeCameraPosition({ x: 1456.7199952545395, y: 1400.088901682739, z: 3097.051259782462 },
                 { x: -172.72016085901143, y: 57.386418380824466, z: -75.19850675990654 }, 1000,
                    function () {

                    });
                }

            }
        },400);
    }
    setProcessValue();

}
/**
 * 创建基于jquery的dictionary
 */
(function ($) {
    $.extend({
        "JQDictionary": function () {
            this.keyList = [];
            this.valueList = [];
        }
    });
    $.JQDictionary.prototype.Add = function (key, value) {
        if (this.keyList != null && this.keyList.length > 0) {
            if ($.inArray(key, this.keyList) >= 0) {
                this.Update(key, value);
                return true;
            }
        }
        this.keyList.push(key);
        this.valueList.push(value);
    };
    $.JQDictionary.prototype.RemoveByKey = function (key) {
        var index = $.inArray(key, this.keyList);
        this.keyList.splice(index, 1);
        this.valueList.splice(index, 1);
    };
    $.JQDictionary.prototype.Update = function (key, value) {
        var index = $.inArray(key, this.keyList);
        this.valueList[index] = value;
    };
    $.JQDictionary.prototype.Select = function (key) {
        var index = $.inArray(key, this.keyList);
        if (index < 0) {
            return null;
        }
        return this.valueList[index];
    };
    $.JQDictionary.prototype.GetData = function () {
        var objList = [];
        for (var i = 0; i < this.keyList.length; i++) {
            var obj = {};
            obj.key = this.keyList[i];
            obj.value = this.valueList[i];
            objList.push(obj);
        }
        return objList;
    };
    $.JQDictionary.prototype.SortData = function (sortFunc) {
        return this.GetData().sort(sortFunc);
    };
})(jQuery);