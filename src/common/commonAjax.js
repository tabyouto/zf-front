import axios from 'axios';
import host from '../host.js';
import qs from 'qs';

// 使用代理
const HOST = host();

const commonData = {
  token: 'kjdghksh3hk1h2h1oi2o12o'
};

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export function fetch(data) {
    //var promise = new Promise();
    return axios({
        method: 'post',
        url: HOST.api + data.url,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: qs.stringify(data.data)
    }).then(function(response) {
      if(response.data.ret==1) {
        return response.data.data;
      }else {
        alert(response.data.msg);
        return false;
      }
    },function(err) {
      return err;
    })

}
//
export function fetchItemByType(data) {
  return fetch({
    url: 'get_schedule',
    data: data
  });
}
//
//
//export function fetchMoviesByType(type, start=0, count=20) {
//  return fetchItemByType(`movie/${type}?start=${start}&count=${count}`)
//}
