import request from '@/utils/request.js'

/**
 * 获取搜索建议列表数据的 API
 * @param { String } kw 搜索文本
 * @returns Per
 */
export const getSuggestListAPI = kw => {
  return request.get('/v1_0/suggestion', {
    // 注意：GET 请求的参数，要通过 params 提供
    params: {
      q: kw
    }
  })
}

/**
 * 搜索文章数据
 * @param { String } kw 关键字
 * @param { Number } page 页码
 * @returns Array
 */
export const getSearchResultAPI = (kw, page) => {
  return request.get('/v1_0/search', {
    params: {
      q: kw,
      page
    }
  })
}
