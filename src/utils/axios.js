import qs from "qs"
import axios from "axios"


// axios 配置
// axios.defaults.timeout = 30000
// axios.defaults.retry = 4
// axios.defaults.retryDelay = 1000

const instance = axios.create({
  // baseURL: '',
  retry: 5,
  retryDelay: 1000,
  timeout: 30000,
  headers: {
    'X-Custom-Header': 'foobar'
  }
});

instance.interceptors.request.use(req => {
    if (req.method === 'post' && req.headers['Content-Type'] !== "multipart/form-data") {
      req.data = qs.stringify(req.data)
    }
    return req
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  res => {
    return res.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance