<template>
  <div id="home">
    <!-- 头部区域 -->
    <van-nav-bar fixed>
      <!-- 左侧的插槽 -->
      <template #left>
        <img src="@/assets/toutiao_logo.png" alt="logo" class="logo" />
      </template>
      <!-- 右侧的插槽 -->
      <template #right>
        <van-icon name="search" color="white" size="18" />
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" sticky offset-top="1.22666667rem">
      <!-- 遍历频道管理 -->
      <van-tab v-for="item in userCannel" :key="item.id"
               :title="item.name">
        <!-- 导入文章列表 -->
        <ArticleList :channelId="item.id"></ArticleList>
      </van-tab>
      <!-- 频道管理的小图标 -->
      <van-icon name="plus" size="16" class="plus" />
    </van-tabs>
  </div>
</template>

<script>
// 频道管理列表
import { getUserChannelAPI } from '@/api/userAPI'

// 文章列表组件
import ArticleList from '@/components/ArticleList'

export default {
  name: 'Home',
  data() {
    return {
      active: 0,
      // 频道管理列表
      userCannel: []
    }
  },
  components: {
    ArticleList
  },
  created() {
    this.initUserChannel()
  },
  methods: {
    async initUserChannel() {
      const { data: res } = await getUserChannelAPI()

      if (res.message === 'OK') {
        this.userCannel = res.data.channels
      }

      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
#home  {
  padding-top: 46px;
  padding-bottom: 50px;
  .logo {
  height: 80%;
  }

  // 为 tabs 容器设置右 padding
  /deep/ .van-tabs__wrap {
    padding-right: 36px;
    background-color: white;
  }

  // 频道管理小图标的定位
  .plus {
    position: fixed;
    top: 58px;
    right: 10px;
    z-index: 999;
  }
}
</style>
