// 配置API接口地址
var root = 'http://qinghua.gstai.com/api/api/'

// 引用axios
var axios = require('axios')
var qs = require('qs')

// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

function apiAxios (method, url, params, success, failure, error) {
  if (params) {
    params = filterNull(params)
  }
  if(method == 'POST' && !(params instanceof FormData)){
    params = qs.stringify(params);//数据参数格式转换
  }
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    withCredentials: false
  })
  .then(function (res) {
    if (res.data) {
      if (success) {
        success(res.data)
      }
    } else {
      if (failure) {
        failure(res.data)
      } else {
        //window.alert('error: ' + JSON.stringify(res.data))
      }
    }
  })
  .catch(function (err) {
    if(error){
      error(err)
    }
  })
}

//返回在vue模板中的调用接口
export default {
  get: function (url, params, success, failure, error) {
    return apiAxios('GET', url, params, success, failure, error)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  }
}