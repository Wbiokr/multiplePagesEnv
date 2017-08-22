import Vue from 'vue';

import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';

import 'common/style/mixin.scss';
import 'common/style/normalize.scss';

import '../style/home.scss';

import setTitle from 'common/modules/title.js';

Vue.use(Mint);

Vue.component('to-item', {
    template: '<p>hello，' + new Date().getTime() + '</p>'
})

Vue.component('child', {
    props: ['message'],
    template: '<p class=abc>{{message}}</p>'
})

export default {
    data: function () {
        return {
            msg: 'my hello app!' + new Date().getTime(),
            isIos: true,
            name: 'wbiokr    ',
            todos: [
                { text: 'vue2' },
                { text: 'do you know' },
                { text: 'wbiokr    ff' }
            ],
            url: 'https://www.rongzi.com'
        }
    },
    created: function () {
        console.log(11111111111);
        setTitle('当前页面：测试页面！')
    },
    methods: {
        changeSys: function () {
            this.isIos = !this.isIos
        },
        doSmt: function () {
            console.log(1312231313)
        },
        handleClick: function () {
            this.$toast('Hello world!')
        }
    },
    filters: {
        capitalize: function (value, arg) {
            if (!value) return '';
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1) + arg;
        }
    },
    computed: {
        rsMsg: function () {
            return this.msg + 'hello world!!!'
        }
    },
    watch: {
        msgName: function (val) {

        }
    }
}