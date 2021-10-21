import request from '../utils/request'

// 获取用户频道数据
export const getUserChannelAPI = () => {
  return request.get('/v1_0/user/channels')
}

// 获取文章列表
export const getArtListAPI = (id, time) => {
  return request.get('/v1_0/articles', {
    params: {
      channel_id: id, // 频道的 Id
      timestamp: time // 时间戳
    }
  })
}
// 将文章设置为不感兴趣
export const dislikeArticleAPI = (id) => {
  return request.post('/v1_0/article/dislikes', {
    target: id
  })
}
// 举报文章
export const reportsArticle = (id, type) => {
  return request.post('/v1_0/article/reports', {
    target: id,
    type: type
  })
}
