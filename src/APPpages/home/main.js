import Vue from 'vue';
import App from './App.vue'
import './home.scss';
import '../../APPcommon/modules/ajax';
import '../../APPcommon/modules/token';
import '../../APPcommon/modules/cookie';

new Vue({
    el:'#app',
    template:'<App/>',
    components:{App}
})