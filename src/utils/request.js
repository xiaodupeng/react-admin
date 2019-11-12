
import axios from 'axios'

const service = axios.create({
    baseURL: 'http://mock-api.com/NnX559Ky.mock'
})

service.interceptors.request.use(
    config => {
      return config
    },
    error => {
      return Promise.reject(error)
    }
)
  
service.interceptors.response.use(
  response => {
      return response.data
  },
  error => {
      console.log(error)
      return Promise.reject(error)
  }
)
  
export default service