import request from '../utils/request'

export function getUserInfo(data) {
    return request({
      url: '/user/getUserInfo',
      method: 'get',
      params: data || {}
    })
}