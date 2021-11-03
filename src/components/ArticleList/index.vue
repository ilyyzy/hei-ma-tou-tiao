<template>
  <div id="ArticleList">
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <!-- 上拉加载更多 -->
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多资讯了"
        @load="onLoad">
        <!-- 循环渲染文章的列表 -->
        <artItem v-for="item in articleList" :key="item.art_id" :article="item" @remove-article="removeArticle"></artItem>
      </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
import { getArticleListAPI } from '@/api/homeAPI.js'

import ArtItem from '@/components/ArtItem'

export default {
  name: 'ArticleList',
  props: {
    channelId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      articleList: [],
      preTimestamp: '',
      loading: false,
      finished: false,
      // 是否正在进行下拉刷新的请求
      isLoading: false
    }
  },
  methods: {
    async initArticleList() {
      const { data: res } = await getArticleListAPI(this.channelId, Date.now())

      if (res.message === 'OK') {
        this.preTimestamp = res.data.pre_timestamp
        this.articleList = res.data.results
      }

      // console.log(res, 'res')
    },
    // 初始化文章的列表数据
    async initArtList() {
      // 请求 API 接口
      const { data: res } = await getArticleListAPI(this.channelId, this.preTimestamp)
      if (res.message === 'OK') {
        // 为时间戳重新赋值
        this.preTimestamp = res.data.pre_timestamp
        // 1. 上拉加载更多时，应该是“旧数据”在前，“新数据”在后
        this.articleList = [...this.articleList, ...res.data.results]
        // 2. 重置 loading 为 false
        this.loading = false

        console.log(this.articleList)
        // 3. 判断所有的数据是否已加载完毕
        if (res.data.pre_timestamp === null) {
          this.finished = true
        }
      }
      // // console.log(res, '新的res数据')
    },
    onLoad() {
      console.log('触发了上拉加载更多')
      this.initArtList()
    },
    onRefresh() {
      setTimeout(() => {
        // Toast('刷新成功')
        this.isLoading = false
      }, 1000)
    },
    // 从文章列表中移除指定 id 的文章
    removeArticle(id) {
      // 对原数组进行 filter 方法的过滤
      this.articleList = this.articleList.filter(item => item.art_id !== id)
      // 判断剩余数据的文章数量是否小于 10
      if (this.articleList.length < 10) {
        // 主动请求下一页的数据
        this.initArtList()
      }
    }
  },
  created() {
    this.initArticleList()
  },
  components: {
    ArtItem
  }
}
</script>

<style>

</style>
