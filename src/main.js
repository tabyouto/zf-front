import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueRouter from 'vue-router';
import routes from './config/routes.js';
import commonAjax from './common/commonAjax.js'

Vue.use(VueRouter);
Vue.config.devtools = true;
/* eslint-disable no-new */
const router = new VueRouter({
  routes
});
router.beforeEach(({meta, path}, from, next) => {
  //var { auth = true } = meta;
  //var isLogin = Boolean(store.state.user.id); //true用户已登录， false用户未登录
  //
  //if (auth && !isLogin && path !== '/search') {
  //  return next({ path: '/search' });
  //}
  next();
});

const app = new Vue({
  el: '#app',
  router,
  axios,
  commonAjax,
  render: h => h(App)
});
