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
      <van-tab v-for="item in userCannel" :key="item.id" :title="item.name">
        <!-- 导入文章列表 -->
        <ArticleList :channelId="item.id"></ArticleList>
      </van-tab>
      <!-- 频道管理的小图标 -->
      <van-icon name="plus" size="16" class="plus" @click="show = true" />

      <!-- 频道管理的弹出层 -->
      <van-popup v-model="show">
        <div class="popup-container">
          <!-- 弹出层的头部区域 -->
          <van-nav-bar title="频道管理">
            <template #right>
              <van-icon
                name="cross"
                size="14"
                color="white"
                @click="show = false"
              />
            </template>
          </van-nav-bar>

          <!-- 弹出层的主体区域 -->
          <div class="pop-body">
            <!-- 我的频道 -->
            <div class="my-channel-box">
              <div class="channel-title">
                <div>
                  <span class="title-bold">已添加频道：</span>
                  <span class="title-gray">点击进入频道</span>
                </div>
                <span class="btn-edit">编辑</span>
              </div>
              <!-- 我的频道列表 -->
              <van-row type="flex">
                <van-col span="6" v-for="item in userCannel" :key="item.id">
                  <!-- 用户的频道 Item 项 -->
                  <div class="channel-item van-hairline--surround">
                    {{ item.name }}
                  </div>
                </van-col>
              </van-row>
            </div>

            <!-- 分隔线 -->
            <div class="van-hairline--top sp-line"></div>

            <!-- 更多频道 -->
            <div class="more-channel-box">
              <div class="channel-title">
                <div>
                  <span class="title-bold">可添加频道：</span>
                  <span class="title-gray">点击添加频道</span>
                </div>
              </div>
              <!-- 更多频道列表 -->
              <van-row type="flex">
                <van-col span="6" v-for="item in userCannel" :key="item.id">
                  <div class="channel-item van-hairline--surround">
                    {{ item.name }}
                  </div>
                </van-col>
              </van-row>
            </div>
          </div>
        </div>
      </van-popup>
    </van-tabs>
  </div>
</template>

<script>
// 频道管理列表
// import { getUserChannelAPI} from '@/api/userAPI'
import { getUserChannelAPI, getAllChannelAPI } from '@/api/homeAPI'

// 文章列表组件
import ArticleList from '@/components/ArticleList'

export default {
  name: 'Home',
  data() {
    return {
      active: 0,
      // 频道管理列表
      userCannel: [],
      show: false,
      allChannel: []
    }
  },
  components: {
    ArticleList
  },
  methods: {
    async initUserChannel() {
      const { data: res } = await getUserChannelAPI()

      if (res.message === 'OK') {
        this.userCannel = res.data.channels
        console.log(this.userCannel)
      }

      console.log(res)
    },
    async initAllChannel() {
      const { data: res } = await getAllChannelAPI()
      if (res.message === 'OK') {
        // 将请求到的数据，转存到 allChannel 中
        this.allChannel = res.data.channels
      }
    }
  },
  created() {
    this.initUserChannel()
  }
}
</script>

<style lang="less" scoped>
#home {
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
.van-popup,
.popup-container {
  background-color: transparent;
  height: 100%;
  width: 100%;
}

.popup-container {
  display: flex;
  flex-direction: column;
}

.pop-body {
  flex: 1;
  overflow: scroll;
  padding: 8px;
  background-color: white;
}

.my-channel-box,
.more-channel-box {
  .channel-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 28px;
    padding: 0 6px;
    .title-bold {
      font-weight: bold;
    }
    .title-gray {
      color: gray;
      font-size: 12px;
    }
  }
}

.btn-edit {
  border: 1px solid #a3a2a2;
  padding: 0 10px;
  line-height: 20px;
  height: 20px;
  border-radius: 6px;
  font-size: 12px;
}

.channel-item {
  font-size: 12px;
  text-align: center;
  line-height: 36px;
  background-color: #fafafa;
  margin: 6px;
}

.cross-badge {
  position: absolute;
  right: -3px;
  top: 0;
  border: none;
}

.sp-line {
  margin: 10px 0 20px 0;
}
</style>
