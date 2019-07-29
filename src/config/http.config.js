import qs from "qs"

// axios 配置
axios.defaults.timeout = 30000
axios.defaults.retry = 4
axios.defaults.retryDelay = 1000

// 代理需要切换成api
// axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/api' : ''

// 上行拦截
axios.interceptors.request.use(config => {
  console.log('上行拦截',config)
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
},
  error => {//这里是返回最外层状态码不为200的错误
    return Promise.reject(error)
  }
)

// 下行拦截
axios.interceptors.response.use(
  res => {
    console.log(res);
    return res.data
  },
  error => { //这里是返回最外层状态码不为200的错误
    return Promise.reject(error)
  }
)

export default axios
