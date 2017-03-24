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
  },
  [types.SID] (state, { obj }) {
    state.socketInfo.sid = obj.sid;
    state.socketInfo.clientCreateId = obj.clientId;
    window.sessionStorage.setItem('sid',obj.sid);
  }
}
