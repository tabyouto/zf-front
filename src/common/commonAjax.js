import axios from 'axios';
import host from '../host.js';
import qs from 'qs';

// 使用代理
const HOST = host();

//公共参数
let userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : '';
let commonData = {
  //debug: true,
  token: '',
  class_passwd: userInfo.class_passwd || undefined,
  class_number: userInfo.class_number || undefined
};

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export function fetch(data) {
  var _target = {};
  Object.assign(_target, commonData, data.data);
  return axios({
    method: 'post',
    url: HOST.api + data.url,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: qs.stringify(_target)
    //validateStatus: function (status) {
    //  console.log(status);
    //  return status != '200'; // Reject only if the status code is greater than or equal to 500
    //}
  }).then(function (response) {
    console.log(response.data.ret);
    if(response.data.ret == 1) {
      commonData.class_number = data.data.class_number;
      commonData.class_passwd = data.data.class_passwd;
      return response.data.data;
    }else {
      if(response.data.ret == 1111) {
        throw '请重新登录';
      }
    }
    if(response.data.ret == 1112) {
      alert('教务服务器太渣，请重试');
    }
  }).catch(function (error) {

    if(!(/(Error)/.test(error))){
      alert(error);
    }else {
      alert('oh~ 请重试');
    }
    //window.location.href = './'
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
