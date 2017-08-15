var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var isAndroid = navigator.userAgent.indexOf('Android') > -1;
module.exports = {
    login: () => {
        if (isiOS && !!window.mars) {
            location.href = 'ydlc://h5/login';
        } else {
            window.mars.login();
        }
    },
    open: (action, url, id) => {
        if (isiOS && !!window.mars) {
            location.href = 'ydlc://h5/open?action=' + action + '&url=' + url + '&id=' + id;
        } else {
            window.mars.toAction(action, url, id);
        }
    },
    share: (url, title, summary) => {
        if (isiOS && !!window.mars) {
            location.href = 'ydlc://h5/share?url=' + url + '&title=' + title + '&summary=' + summary;
        } else {
            window.mars.login(url, title, summary);
        }
    },
    eventStatistic: (eventId) => {
        if (isiOS && !!window.mars) {
            location.href = 'ydlc://h5/eventStatic?eventid='+eventId;
        } else {
            window.mars.onEventStatistic(eventId);
        }
    }
}