import * as types from './mutation-types';
//const mutations = {
//  [types.LOGIN_STATUS] (state, { isLogin }) {
//    state.isLogin = isLogin
//  }
//};


export default {
  [types.LOGIN_STATUS] (state, { isLogin }) {
    state.isLogin = isLogin;
    window.sessionStorage.setItem('isLogin',isLogin);
  }
}
