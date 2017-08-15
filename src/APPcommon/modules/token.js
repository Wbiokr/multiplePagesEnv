
const base64=require('./base64');

window.ydwVersion = '';
window.ydwToken = '';
var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var isAndroid = navigator.userAgent.indexOf('Android') > -1;



//iOS系统获取version
window.getVersion = function (version) {
    window.location.href = "ydlc://h5/getToken";
    ydwVersion = version;
};

//iOS系统获取token
window.getToken = function (token) {
    ydwToken = base64.decode(token);
    init();
};

//iOS与Android确认token
window.init = function () {
    if (isiOS) {
        return;
    } else {
        ydwToken = window.mars.getToken();
        return;
    }

};

//进入 H5页面首先，获取token与version值的入口函数
function checkUser() {
    // if (location.port == '8088') { alert('现在是web测试'); return; };
    if (isiOS) {
        if (!window.mars) {
            ydwVersion = "1.0.1";
            window.location.href = "ydlc://h5/getVersion"
        }
    } else if (window.mars) {
        if (window.mars.getVersion) {
            ydwVersion = window.mars.getVersion().substring(1);
        }
        init();
    };
};
