import App from '../App'
/**
 * auth true登录才能访问，false不需要登录，默认true
 */
export default [
  {
    name: 'index',
    path: '/',
    component: App
  },{
    name: 'search',
    path: '/search', //登录
    meta: { auth: false },
    component: resolve => require(['../modules/search/search.vue'], resolve)
  },
      //{
      //  path: '/signout', //退出
      //  component: resolve => require(['../modules/signout/'], resolve)
      //},
      //{
      //  path: '/home', //个人主页
      //  component: resolve => require(['../modules/home/'], resolve)
      //},
      //{
      //  path: '/', //首页
      //  meta: { auth: false },
      //  component: resolve => require(['../modules/index/'], resolve)
      //},
    {
      path: '*', //其他页面，强制跳转到登录页面
      redirect: '../modules/search/search.vue'
    }
]