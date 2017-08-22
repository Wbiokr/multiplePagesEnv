<template>
    <div id="app" v-bind:title='msg'>
        <p>{{msg}}</p>
        <p v-once>{{msg}}</p>
        <input type="button" value='click'  @click='changeSys'>
        <section >
            <p v-if='isIos'>ios设备</p>
            <p v-if='!isIos'>Android设备</p>
        </section>
        <input type="text" v-model='msg'  >
        <ul>
            <li v-for="todo in todos">
                <to-item></to-item>
                {{todo.text | capitalize('你好')}}
            </li>
        </ul>
        <a v-bind:href="url" @mouseover='doSmt'>跳转到融资网</a>
        <p>{{rsMsg}}</p>
        <child v-bind:message='msg'></child>
        <mt-button @click.native="handleClick">按钮</mt-button>
    </div>
    
</template>
<script src='../js/app.js'></script>