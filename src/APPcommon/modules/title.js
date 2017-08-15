module.exports = function (titleMsg) {
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    if (isAndroid) {
        document.title = titleMsg;
    } else if (isiOS) {
        document.title = titleMsg;
        let i = document.createElement('iframe');
        i.src = '//m.baidu.com/favicon.ico';
        i.style.display = 'none';
        i.onload = function () {
            setTimeout(function () {
                i.remove();
            }, 9)
        }
        document.body.appendChild(i);
    }
}