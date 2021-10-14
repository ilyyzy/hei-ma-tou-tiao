import request from '../utils/request'

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
