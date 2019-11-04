<template>
    <div>
        <fieldset class="login">
        <legend>登录</legend>
        <table cellpadding="0" cellspacing="3" border="0">
            <tr>
                <td class="tt">IP地址</td>
                <td><input id="loginip" type="text" class="txt" value="172.27.1.84" /></td>
                <td class="tt">端口号</td>
                <td><input id="port" type="text" class="txt" value="37777" /></td>
            </tr>
			<tr>
                <td class="tt">协议类型</td>
                <td colspan="2">
                    <select id="protocolType" class="sel" onchange="changeProtocol(this.value);">
                        <option value="0">TCP</option>
                        <option value="4">UDP</option>
						<option value="3">组播</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td class="tt">用户名</td>
                <td><input id="username" type="text" class="txt" value="admin" /></td>
                <td class="tt">密码</td>
                <td><input id="password" type="password" class="txt" value="admin123" /></td>
            </tr>
            <tr>
                <td class="tt">RTSP端口</td>
                <td colspan="2"><input id="rtspport" type="text" class="txt" value="37777" />（可选参数）</td>
				<td colspan="4">
                    <input type="button" class="btn" value="登录" onclick="clickLogin();" />
                    <input type="button" class="btn" value="退出" onclick="clickLogout();" />
                </td>
            </tr>
		    <tr>
                <td class="tt">已登录设备</td>
                <td>
                    <select id="ips" class="sel" onchange="switchDeviceInfo(this.value);"></select>
                </td>
                <td class="tt">通道列表</td>
                <td>
                    <select id="channels" class="sel"></select>
                </td>
            </tr>
            <tr>
				<td class="tt">窗口分割数</td>
                <td colspan="2">
                    <select id="wndNum" class="sel2" onchange="changeWndNum(this.value);">
                        <option value="1" selected>1x1</option>
                        <option value="2">2x2</option>
                        <option value="3">3x3</option>
                        <option value="4">4x4</option>
                    </select>
                </td>
				<td colspan="4">
                     <input type="button" class="btn" value="全屏" onclick="clickFullScreen();" />
                </td>
            </tr>
        </table>
    </fieldset>
    <fieldset class="localconfig">
        <legend>本地配置</legend>
        <table cellpadding="0" cellspacing="3" border="0">
            <tr>
                <td class="tt">播放性能</td>
                <td>
                    <select id="netsPreach" name="netsPreach" class="sel">
                        <option value="0">最短延时</option>
                        <option value="1">实时性好</option>
                        <option value="2">均衡</option>
                        <option value="3">流畅性好</option>
                    </select>
                </td>
                <td class="tt">图像尺寸</td>
                <td>
                    <select id="wndSize" name="wndSize" class="sel">
                        <option value="0">充满</option>
                        <option value="1">4:3</option>
                        <option value="2">16:9</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td class="tt">规则信息</td>
                <td>
                    <select id="rulesInfo" name="rulesInfo" class="sel">
                        <option value="1">启用</option>
                        <option value="0">禁用</option>
                    </select>
                </td>
                <td class="tt">抓图文件格式</td>
                <td>
                    <select id="captureFileFormat" name="captureFileFormat" class="sel">
                        <option value="0">BMP</option>
                        <option value="1">JEPG</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td class="tt">录像文件保存路径</td>
                <td colspan="3"><input id="LiveRecord" type="text" class="txt" />&nbsp;<input type="button" class="btn" value="浏览" onclick="clickOpenFileDlg('LiveRecord');" /></td>
            </tr>
            <tr>
                <td class="tt">回放下载保存路径</td>
                <td colspan="3"><input id="Download" type="text" class="txt" />&nbsp;<input type="button" class="btn" value="浏览" onclick="clickOpenFileDlg('Download');" /></td>
            </tr>
            <tr>
                <td class="tt">预览抓图保存路径</td>
                <td colspan="3"><input id="LiveSnapshot" type="text" class="txt" />&nbsp;<input type="button" class="btn" value="浏览" onclick="clickOpenFileDlg('LiveSnapshot');" /></td>
            </tr>
            <tr>
                <td class="tt">回放抓图保存路径</td>
                <td colspan="3"><input id="PlaybackPicPath" type="text" class="txt" />&nbsp;<input type="button" class="btn" value="浏览" onclick="clickOpenFileDlg('PlaybackPicPath');" /></td>
            </tr>
            <tr>
                <td class="tt">回放剪辑保存路径</td>
                <td colspan="3"><input id="PlaybackFilePath" type="text" class="txt" />&nbsp;<input type="button" class="btn" value="浏览" onclick="clickOpenFileDlg('playbackFilePath');" /></td>
            </tr>
        </table>
    </fieldset>
    <fieldset class="operate">
        <legend>操作信息</legend>
        <div id="opinfo" class="opinfo"></div>
    </fieldset>
    <fieldset class="preview">
        <legend>预览</legend>
        <table cellpadding="0" cellspacing="3" border="0">
            <tr>
                <td class="tt" colspan="1">码流类型</td>
                <td colspan="1">
                    <select id="streamtype" class="sel2" onchange="changeStreamType(this.value);">
                        <option value="1">主码流</option>
                        <option value="2">子码流</option>
                    </select>
                </td>
				<td>
				</td>
            </tr>
			<tr>
				<td class="tt" colspan="1">播放窗口选择</td>
				<td colspan="1">
					<select id="winMode" class="sel2" onchange="changeWinMode(this.value);">
						<option value="0">选中窗口</option>
						<option value="1">指定窗口</option>
					</select>
				</td>
				<td>
					<select id="winIndex" class="sel2" onchange="changeWndIndex(this.value);">
                    </select>
				</td>
				</tr>
			<tr>
				<td>
					<input type="button" class="btn" value="开始预览" onclick="clickStartRealPlay();" />
				</td>
				<td>
					<input type="button" class="btn" value="停止预览" onclick="clickStopRealPlay();" />
				</td>
			</tr>
			<tr>
				<td>
					<input type="button" class="btn" value="播放所有" onclick="clickStartAllRealPlay();" />
				</td>
				<td>
					<input type="button" class="btn" value="关闭所有" onclick="clickStopAllRealPlay();" />
				</td>
			</tr>
            <tr>
                <td>
                    <input type="button" class="btn" value="开始对讲" onclick="clickStartVoiceTalk();" />
				</td>
				 <td>
                    <input type="button" class="btn" value="停止对讲" onclick="clickStopVoiceTalk();" />
                </td>
				<td>
				</td>
            </tr>
        </table>
    </fieldset>
    <fieldset class="preview">
        <legend>音视频控制</legend>
		<table cellpadding="0" cellspacing="3" border="0">
            <tr>
				<td class="tt">
                    <input type="button" class="btn" value="打开声音" onclick="clickOpenSound();" />
                </td>
                <td >
					<input type="button" class="btn" value="关闭声音" onclick="clickCloseSound();" />
				</td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="button" class="btn" value="抓图" onclick="clickCapturePic();" />
				</td>
				<td>
                    <input type="button" class="btn" value="开始录像" onclick="clickStartRecord();" />
				</td>
				<td>
                    <input type="button" class="btn" value="停止录像" onclick="clickStopRecord();" />
                </td>
            </tr>
            <tr>
                <td>
                    <input type="button" class="btn2" value="启用电子放大" onclick="clickEnableEZoom();" />
				</td>
				<td>
                    <input type="button" class="btn2" value="禁用电子放大" onclick="clickDisableEZoom();" />
                </td>
				<td>
				</td>
            </tr>
		</table>
	</fieldset>
    </div>
</template>

<script>
    export default {
        name:'VideoInfo',
        data(){
            return {

            }
        }
    }
</script>

<style scoped>

</style>