<template>
  <div>
   <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多数据了" :immediate-check="false" @load="onLoad">
        <ArtItem v-for="item in artlist" :key="item.art_id" :article="item" @removeArticle="removeArticle"></ArtItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArtListAPI } from '@/api/homeAPI'
import ArtItem from '@/components/ArtItem/'
export default {
  name: 'ArticleList',
  props: {
    channelId: {
      type: Number,
      requirst: true
    }
  },
  components: {
    ArtItem
  },
  data() {
    return {
      // 文章列表的数组
      artlist: [],
      // 时间戳。初始的默认值为当前的时间戳
      timestamp: Date.now(),
      // 代表数据加载完毕了
      finished: false,
      // 代表数据加载完毕了(vant自动的行为)
      loading: false,
      // 是否在加载中
      isLoading: false
    }
  },
  methods: {
    // 初始化文章的列表数据
    async initArtList() {
      // 请求 API 接口
      const { data: res } = await getArtListAPI(this.channelId, this.timestamp)
      if (res.message === 'OK') {
        // 为时间戳重新赋值
        this.timestamp = res.data.pre_timestamp
        // 为 artlist 赋值
        this.artlist = [...this.artlist, ...res.data.results]
        this.loading = false
        if (res.data.pre_timestamp === null) {
          this.finished = true
        }
        // console.log(this.artlist)
      }
    },
    onLoad() {
      console.log('上拉加载数据触发')
      this.initArtList()
    },
    onRefresh() {
      console.log('下拉刷新中')
    },
    removeArticle(id) {
      console.log('你要删除的文章ID:', id)
      this.artlist = this.artlist.filter(item => item.art_id !== id)
    }
  },
  created() {
  // 在组件创建的时候，请求文章的列表数据
    this.initArtList()
  }
}
</script>

<style lang="less">
</style>
