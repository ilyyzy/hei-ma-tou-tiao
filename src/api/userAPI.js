import request from '../utils/request'
import axios from 'axios'

// jsdoc
/**
 * loginAPI 登录
 * @param { object } data 用户数据
 * @returns Promise
 */
export const loginAPI = (data) => {
  return request.post('/v1_0/authorizations', data)
}

/**
 * 请求用户频道列表数据的 API
 * @returns Promise
 */
export const getUserChannelAPI = () => {
  return request.get('/v1_0/user/channels')
}

export const exchangeTokenAPI = refreshToken => {
  return axios({
    method: 'PUT',
    // 这里必须填写完整的请求 URL 地址
    url: 'http://www.liulongbin.top:8000/v1_0/authorizations',
    headers: {
      // 在请求头中携带 Authorization 身份认证字段
      Authorization: 'Bearer ' + refreshToken
    }
  })
}
