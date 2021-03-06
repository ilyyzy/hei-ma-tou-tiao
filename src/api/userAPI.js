import Axios from 'axios'
import request from '../utils/request'

/**
 * loginAPI 登录
 * @param { object } data 用户数据
 * @returns Promise
 */
export const loginAPI = (data) => {
  return request.post('/v1_0/authorizations', data)
}

// 换取 Token 的 API（形参中的 refreshToken 用来换取新 token）
export const exchangeTokenAPI = refreshToken => {
  return Axios({
    method: 'PUT',
    // 这里必须填写完整的请求 URL 地址
    url: 'http://www.liulongbin.top:8000/v1_0/authorizations',
    headers: {
      // 在请求头中携带 Authorization 身份认证字段
      Authorization: 'Bearer ' + refreshToken
    }
  })
}

// 请求用户基本信息的 API
export const getUserInfoAPI = () => {
  return request.get('/v1_0/user')
}
export const getUserProfileAPI = () => {
  return request.get('/v1_0/user/profile')
}
export const updateUserProfileAPI = obj => {
  return request.patch('/v1_0/user/profile', obj)
}
