import Vue from 'vue';
import App from './App.vue'
import '../../APPcommon/modules/ajax';
import '../../APPcommon/modules/cookie';
import '../../APPcommon/modules/token';

new Vue({
    el:'#app',
    template:'<App/>',
    components:{App}
})