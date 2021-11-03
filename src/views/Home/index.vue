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
        <van-icon name="search" color="white" size="18" @click="$router.push('/search')" />
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
      <van-popup v-model="show" :close-on-click-overlay="false">
        <div class="popup-container">
          <!-- 弹出层的头部区域 -->
          <van-nav-bar title="频道管理">
            <template #right>
              <van-icon name="cross" size="14" color="white" @click="show = false" />
            </template>
          </van-nav-bar>

          <!-- 弹出层的主体区域 -->
          <div class="pop-body">
            <!-- 我的频道 -->
            <div class="my-channel-box">
              <div class="channel-title">
                <div>
                  <span class="title-bold">已添加频道：</span>
                  <span class="title-gray">{{ isDel ? '点击移除频道' : '点击进入频道' }}</span>
                </div>
                <span class="btn-edit" @click="isDel = !isDel">{{ isDel ? '完成' : '编辑' }}</span>
              </div>
              <!-- 我的频道列表 -->
              <van-row type="flex">
                <van-col span="6" v-for="(item, index) in userCannel" :key="item.id">
                  <!-- 用户的频道 Item 项 -->
                  <div class="channel-item van-hairline--surround" @click="onUserChannelClick(item, index)"> {{ item.name }}
                    <!-- 删除图标 -->
                    <van-badge color="transparent" class="cross-badge" v-if="isDel && item.name !== '推荐' && userCannel.length > 2">
                      <template #content>
                        <van-icon name="cross" class="badge-icon" color="#cfcfcf" size="12" />
                      </template>
                    </van-badge>
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
                <van-col span="6" v-for="item in moreChannels" :key="item.id">
                  <div class="channel-item van-hairline--surround" @click="addChannel(item)">{{ item.name }}</div>
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
import { getUserChannelAPI, getAllChannelAPI, updateUserChannelAPI } from '@/api/homeAPI'

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
      // 我的频道数据
      allChannel: [],
      // 删除频道状态
      isDel: false
    }
  },
  components: {
    ArticleList
  },
  created() {
    this.initUserChannel()
    this.getAllChannel()
  },
  methods: {
    // 频道管理
    async initUserChannel() {
      const { data: res } = await getUserChannelAPI()

      if (res.message === 'OK') {
        this.userCannel = res.data.channels
      }

      console.log(res.data.channels, '频道管理：我的频道数据 userCannel')
    },
    // 获取骗到管理总数据
    async getAllChannel() {
      const { data: res } = await getAllChannelAPI()

      if (res.message === 'OK') {
        this.allChannel = res.data.channels
      }

      console.log(this.allChannel, '频道管理：总数据 allChannel')
    },
    // 新增频道
    addChannel(item) {
      // 我的频道中新增频道
      this.userCannel.push(item)

      // 调用 updateChannel 方法，把最新的频道列表数据提交到后端保存
      this.updateChannel()
    },
    // 把用户的频道列表数据提交到后端保存
    async updateChannel() {
      // 将 推荐 从频道列表中过滤出去，并返回新数组
      const channels = [...this.userCannel].filter(item => item.name !== '推荐').map((item, index) => {
        return {
          id: item.id,
          seq: index + 1
        }
      })
      // 调用 API 接口
      const { data: res } = await updateUserChannelAPI(channels)
      // console.log(res, '更新接口res')
      if (res.message === '更新用户频道成功') {
        this.$notify({ type: 'success', message: '更新成功', duration: 1000 })
      }
    },
    // 0移除频道 切换到到点击的列表
    onUserChannelClick(data, index) {
      if (this.isDel && data.name !== '推荐' && this.userCannel.length > 2) {
        // 过滤掉当前的频道
        this.userCannel = this.userCannel.filter(item => item.id !== data.id)

        // 调用 updateChannel 方法，把最新的频道列表数据提交到后端保存
        this.updateChannel()
      } else {
        // 不编辑时，点击频道跳转到当前频道
        this.active = index
        this.show = false
      }
    }
  },
  computed: {
    // 更多频道的数据
    moreChannels() {
      // 过滤掉在我的频道中的数据
      return this.allChannel.filter(item => {
        const index = this.userCannel.findIndex(x => x.id === item.id)
        if (index === -1) return true
      })
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

  // 频道管理的弹出层
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
}
</style>
