module.exports = {
    getCookiesObj: function () {
        var cookies = {};
        if (document.cookie) {
            var objs = document.cookie.split('; ');
            for (var i in objs) {
                var index = objs[i].indexOf('='),
                    name = objs[i].substr(0, index),
                    value = objs[i].substr(index + 1, objs[i].length);
                cookies[name] = value;
            }
        }
        return cookies;
    },
    set: function (name, value, opts) {
        //opts maxAge, path, domain, secure
        if (name && value) {
            var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
            //可选参数
            if (opts) {
                if (opts.maxAge) {
                    cookie += '; max-age=' + opts.maxAge;
                }
                if (opts.path) {
                    cookie += '; path=' + opts.path;
                }
                if (opts.domain) {
                    cookie += '; domain=' + opts.domain;
                }
                if (opts.secure) {
                    cookie += '; secure';
                }
            }
            document.cookie = cookie;
            return cookie;
        } else {
            return '';
        }
    },
    get: function (name) {
        return decodeURIComponent(this.getCookiesObj()[name]) || null;
    },
    remove: function (name) {
        if (this.getCookiesObj()[name]) {
            document.cookie = name + '=; max-age=0';
        }
    }
}