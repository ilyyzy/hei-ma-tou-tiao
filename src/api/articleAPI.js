import request from '@/utils/request.js'

/**
 * 获取文章详情的 API（形参中的 id 是文章的 id）
 * @param { String } id 文章ID
 * @returns
 */
export const getArticleDetailAPI = id => {
  return request.get(`/v1_0/articles/${id}`)
}

/**
 * 关注用户的 API（形参中的 userId 是文字作者的 id）
 * @param { String } userId 用户ID
 * @returns
 */
export const followUserAPI = userId => {
  return request.post('/v1_0/user/followings', {
    target: userId
  })
}

/**
 * 取消关注用户的 API
 * @param { String } userId 用户ID
 * @returns
 */
export const unfollowUserAPI = userId => {
  return request.delete(`/v1_0/user/followings/${userId}`)
}

/**
 * 点赞的 API（形参中的 artId 是文章的 Id）
 * @param { String } artId 用户ID
 * @returns
 */
export const addLikeAPI = artId => {
  return request.post('/v1_0/article/likings', {
    target: artId
  })
}

/**
 * 取消点赞的 API（形参中的 artId 是文章的 Id）
 * @param { String } artId 用户ID
 * @returns
 */
export const delLikeAPI = artId => {
  return request.delete(`/v1_0/article/likings/${artId}`)
}

/**
 * 获取文章下评论数据的 API
 * @param { String } artId 评论ID
 * @param {*} offset 表示获取文章下的评论
 * @returns
 */
export const getCmtListAPI = (artId, offset) => {
  return request.get('/v1_0/comments', {
    params: {
      // a 表示获取文章下的评论
      type: 'a',
      // 文章的 Id
      source: artId,
      // 获取评论数据的偏移量，值为评论的 id。表示从此 id 的数据向后取，不传表示从第一页开始读取数据
      offset
    }
  })
}

/**
 * 评论点赞的 API
 * @param { String } cmtId 评论ID
 * @returns
 */
export const addLikeCmtAPI = cmtId => {
  return request.post('/v1_0/comment/likings', {
    target: cmtId
  })
}

/**
 * 评论取消点赞的 API
 * @param { String } cmtId 评论ID
 * @returns
 */
export const delLikeCmtAPI = cmtId => {
  return request.delete(`/v1_0/comment/likings/${cmtId}`)
}

/**
 * 发表评论的 API（形参中的 artId 是文章的 id；content 是评论的内容）
 * @param { String } artId 评论ID
 * @param { String } content 评论内容
 * @returns
 */
export const pubCommentAPI = (artId, content) => {
  return request.post('/v1_0/comments', {
    target: artId,
    content
  })
}
