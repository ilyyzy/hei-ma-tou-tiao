<template>
  <div class="search-result-container">
    <!-- 点击实现后退效果 -->
    <van-nav-bar title="搜索结果" left-arrow @click-left="$router.back()" fixed />

    <van-list v-model="loading" :finished="finished" finished-text="没有更多数据了" @load="onLoad" :immediate-check="false">
      <!-- 文章的 Item 项 -->
      <artItem v-for="item in searchList" :key="item.art_id" :article="item" :closable="false"></artItem>
    </van-list>
  </div>
</template>

<script>
import { getSearchResultAPI } from '@/api/searchAPI.js'
import ArtItem from '@/components/ArtItem'

export default {
  name: 'SearchResult',
  props: ['kw'],
  data() {
    return {
      page: 1,
      // 搜索结果列表
      searchList: [],
      // 是否正在进行上拉加载的数据请求
      loading: false,
      // 所有数据是否已经加载完毕
      finished: false
    }
  },
  methods: {
    async initSearchResult() {
      const { data: res } = await getSearchResultAPI(this.kw, this.page)
      if (res.message === 'OK') {
        // console.log('搜索结果', res.data.results)
        this.searchList = [...res.data.results, ...this.searchList]

        this.loading = false
        if (res.data.results.length === 0) {
          this.finished = true
        }

        this.page++
      }
    },
    onLoad() {
      // console.log('触发上拉加载')
      this.initSearchResult()
    }
  },
  created() {
    this.initSearchResult()
  },
  components: {
    ArtItem
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
