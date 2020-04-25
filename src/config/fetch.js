import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import {app} from '@/main.js'

// http request 拦截器
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  // _.toast('错误的传参', 'fail')
  return Promise.reject(error)
})

// http response 拦截器
axios.interceptors.response.use(response => {
  if (response.data.code !== 'undefined') {
    switch(response.data.code){
      case 1001:
        router.replace({
            path: '/login'
        })
        break
    }
    return response
  } else {
    return response
  }
}, error => {
  if (error.response) {
    
  }
  return Promise.reject(error.response.data) // 返回接口返回的错误信息
})

// fetch 类似于 Ajax
export default function fetch (url, params, method) {
  let requestConfig = {
    method: method || 'GET',
    url: url
  }

  if (requestConfig.method === 'GET') {
    requestConfig.params = params
  } else {
    requestConfig.data = params
  }

  return new Promise((resolve, reject) => {
    axios(requestConfig)
    .then(response => {
      console.log(response)
      resolve(response.data)
    }, err => {
      if(err.code == '1001'){
        router.replace({
            path: '/login'
        })
      }
      app.$message.error(err.message)
      resolve(err)
    })
    .catch((error) => {
      if(error.code == '1001'){
        router.replace({
            path: '/login'
        })
      }
      app.$message.error(error.message)
      reject(error)
    })
  })
}
