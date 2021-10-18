<template>
  <div>
    <art-item v-for="item in artlist" :key="item.art_id" :article="item">
        <ArtItem></ArtItem>
    </art-item>
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
      timestamp: Date.now()
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
        this.artlist = res.data.results
        // console.log(this.artlist)
      }
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
