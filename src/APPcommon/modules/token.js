window.v = '';
window.t = '';
var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var isAndroid= navigator.userAgent.indexOf('Android') > -1;
var browser =  function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }()
   
//base64位解码与编码
var base64 = {
    // private property 
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding 
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = this._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                this. _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                this. _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    },

    // public method for decoding 
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = this._utf8_decode(output);
        return output;
    },
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    },

    // private method for UTF-8 decoding 
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = 0, c3 = 0, c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }

}

//iOS系统获取version
window.getVersion = function (version) {
    window.location.href = "ydlc://h5/getToken";
    v = version;
};

//iOS系统获取token
window.getToken = function (token) {
    t = base64.decode(token);
    init();
};

//iOS与Android确认token
window.init = function () {
    if (isiOS) {
        if (!!t && t.length > 10) {
            cookie.set('tokenInfor', JSON.stringify({
                state: 1,
                isLogin: true,
                version: v,
                token: t
            }), { expires: 7, path: '/' })
        } else {
            cookie.set('tokenInfor', JSON.stringify({
                state: 1,
                isLogin: false,
                version: v,
                token: t
            }), { expires: 7, path: '/' })
        };

        return;
    } else {
        t = window.mars.getToken();
        if (!!t && t.length > 10) {
            cookie.set('tokenInfor', JSON.stringify({
                state: 1,
                isLogin: true,
                version: v,
                token: t
            }), { expires: 7, path: '/' })
        } else {
            cookie.set('tokenInfor', JSON.stringify({
                state: 1,
                isLogin: false,
                version: v,
                token: t
            }), { expires: 7, path: '/' })
        };
        return;
    }

};

//进入 H5页面首先，获取token与version值的入口函数
function checkUser(callback) {
    // if (location.port == '8088') { alert('现在是web测试'); return; };
    if (isiOS) {
        if (!window.mars) {
            v = "1.0.1";
                window.location.href = "ydlc://h5/getVersion"
           
            
        }
    } else if(window.mars){
        if (window.mars.getVersion) {
            v = window.mars.getVersion().substring(1);
        }
        init();
    };
    if (callback) {
        setTimeout(callback, 100)
    }
};
