import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueRouter from 'vue-router';
import routes from './config/routes.js';
import commonAjax from './common/commonAjax.js'
import store from './store'
import {mapActions} from 'vuex';

Vue.use(VueRouter);
Vue.config.devtools = true;
/* eslint-disable no-new */
const router = new VueRouter({
  routes
});
router.beforeEach(({meta, path}, from, next) => {
  var { auth = true } = meta;
  console.log(meta)
  if(auth) {
    if(localStorage.getItem('classPasswd')) {
      next();
    }else {
      next({ name: 'index' });
    }
  }else {
    next();
  }
  // var isLogin = store.state.isLogin; //true用户已登录， false用户未登录
  // if (auth && !isLogin) {
  //   if(path == '/home/score' || path=='/home/schedule') {
  //     sessionStorage.setItem('currentFrom',path); //记录要查询类型
  //   }
  //   return next({ path: '/home/login' });
  // }
  // if((path.length==1 || path=='/home/login') && isLogin) {
  //   return next({ path: '/home/ranking' });
  // }

});

var socket = io('http://test1.com');
socket.on('connect', function(){

//通知服务端保存客户端ID
  var flag = setTimeout(function () {
    var token = sessionStorage.getItem('token');
    if(token) {
      clearTimeout(flag);
      socket.emit('setConnect',{
        sid: socket.io.engine.id,
        token: token
      });
    }
  },1000);
});


socket.on('finishAllDegree',function(data) {
  console.log(data);
});





// socket.on('disconnect', function(){});

const app = new Vue({
  el: '#app',
  store,
  router,
  axios,
  commonAjax,
  methods: {
    // ...mapActions([
    //   'saveSid'
    // ]),
  },
  //created () {
  //  // 组件创建完后获取数据，
  //  // 此时 data 已经被 observed 了
  //  this.changeLogin(sessionStorage.getItem('isLogin'));
  //},
  render: h => h(App)
});
