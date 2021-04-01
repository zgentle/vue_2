import axios from 'axios'
import router from '@/router'
import {
  Message
} from 'element-ui'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.withCredentials = true;
// 默认地址
axios.defaults.baseURL = ''

let messageFlag = true;
let messageFlagTime = 8 * 1000;

// Add a request interceptor
axios.interceptors.request.use(function(config) {
  if (Object.prototype.toString.call(config.data) == "[object FormData]") {
    config.timeout = 0;
  } else {
    config.timeout = 10 * 1000;
  }
  // let token = localStorage.getItem('token');
  // if (token) {
  //   config.headers['X-Authorization'] = `Bearer ${token}`;
  //   config.headers.common['X-Authorization'] = `Bearer ${token}`;
  // } else {
  //   signOut();
  //   return Promise.reject(new Error('Termination request'));
  // }
  return config
}, function(error) {
  return Promise.reject(error)
});

function signOut() {
  localStorage.removeItem('token');
  router.push({
    path: '/login'
  })
}

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code === '70000002') {
      return Promise.reject(null);
    }
    return response;
  },
  error => {
    let message = "";
    // 判断请求异常信息中是否含有超时timeout字符串
    if (error.message.includes("Network Error")) {
      message = "网络异常，请联系管理员！";
    } else if (error.message.includes('timeout')) {
      message = "请求超时，请联系管理员！";
    } else if (!error.response) {
      return Promise.reject(null)
    } else if (error.response.status) {
      message = error.response.data.message || '服务异常，请联系管理员！';
    } else {
      message = "服务异常，请联系管理员！";
    }
    if (messageFlag) {
      messageFlag = false;
      Message({
        message: message,
        type: 'error',
        duration: '1000'
      });
      setTimeout(() => {
        messageFlag = true;
      }, messageFlagTime);
    }
    return Promise.reject(error && error.response)
  }
);

export default function fetch(url, param, config) {
  let _config = config || {};
  let _param = param || {};
  if (Object.prototype.toString.call(param) === "[object FormData]") {
    // param.append("userId", Cookies.get('userid'));
  }
  return new Promise((resolve, reject) => {
    axios.post(url, _param, _config).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function fetchGet(url) {
  return new Promise((resolve, reject) => {
    axios.get(url).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function fetchForm(url, param) {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  return new Promise((resolve, reject) => {
    axios.post(url, param, config).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    }).catch((err) => {
      reject(err)
    })
  })
}