import axios from 'axios';
import host from '../host.js';
import qs from 'qs';

// 使用代理
const HOST = host();

//公共参数
let userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : '';
const commonData = {
  //debug: true,
  token: 'kjdghksh3hk1h2h1oi2o12o',
  class_passwd: userInfo.class_passwd || undefined,
  class_number: userInfo.class_number || undefined
};

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export function fetch(data) {
    var _target = {};
    Object.assign(_target, commonData ,data.data);
    return axios({
        method: 'post',
        url: HOST.api + data.url,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: qs.stringify(_target),
        validateStatus: function (status) {
          console.log(status);
          return status !== '200'; // Reject only if the status code is greater than or equal to 500
        }
    }).then(function(response) {
      console.log('first then',response)
      if(response.data.ret==1) {
        return response.data.data;
      }else {
        throw '真不幸，请再试一次';
      }
    },function(err) {
      console.log('进入reject',err);
      alert('哎呀，失败啦~请稍后重试');
      return false;
    }).catch(function(error) {
      alert(error);
      return false;
    })

}
/**
 * 登录
 * @param data
 */
export function login(data) {
  return fetch({
    url: 'users/login',
    data: data
  });
};

/**
 * 获取具体课程表
 * @param data
 */
export function fetchSpecificSchedule(data) {
  return fetch({
    url: 'users/fetchSchedule',
    data: data
  });
};
//
//
//export function fetchMoviesByType(type, start=0, count=20) {
//  return fetchItemByType(`movie/${type}?start=${start}&count=${count}`)
//}
