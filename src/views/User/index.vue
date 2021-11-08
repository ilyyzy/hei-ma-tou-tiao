<template>
  <div class="user-container">
    <!-- 用户基本信息面板 -->
    <div class="user-card">
      <!-- 用户头像、姓名 -->
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #icon>
          <img :src="userInfo.photo" alt="" class="avatar">
        </template>
        <template #title>
          <span class="username">{{ userInfo.name }}</span>
        </template>
        <template #label>
          <van-tag color="#fff" text-color="#007bff">申请认证</van-tag>
        </template>
      </van-cell>
      <!-- 动态、关注、粉丝 -->
      <div class="user-data">
        <div class="user-data-item">
          <span>{{ userInfo.art_count }}</span>
          <span>动态</span>
        </div>
        <div class="user-data-item">
          <span>{{ userInfo.follow_count }}</span>
          <span>关注</span>
        </div>
        <div class="user-data-item">
          <span>{{ userInfo.fans_count }}</span>
          <span>粉丝</span>
        </div>
      </div>
    </div>

    <!-- 操作面板 -->
    <van-cell-group class="action-card">
     <van-cell icon="edit" title="编辑资料" is-link @click="$router.push({name: 'user-edit'})" />
      <van-cell icon="chat-o" title="小思同学" is-link />
      <van-cell icon="warning-o" title="退出登录" is-link :data-id="userInfo.id" @click="logout" />
    </van-cell-group>
  </div>
</template>

<script>
// 按需导入辅助函数
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'User',
  methods: {
    // 映射Action方法
    ...mapActions(['initUserInfo']),
    ...mapMutations(['cleanState']),

    // 退出登录
    async logout() {
      // 展示确认的提示框
      await this.$dialog.confirm({
        title: '提示',
        message: '确认退出登录吗？'
      }).then(() => {
        // on confirm
        console.log('退出成功')

        this.clearLoginState()
        // 3. 跳转到登录页
        this.$router.push('/login')
      }).catch(() => {
        // on cancel
        console.log('取消退出')
      })

      // 取消登录，不执行后面代码
      // if (confirmResult === 'cancel') return 1
    }
  },
  computed: {
    // 映射State数据
    ...mapState(['userInfo'])
  },
  created() {
    this.initUserInfo()
  }
}
</script>

<style lang="less" scoped>
.user-container {
  .user-card {
    background-color: #007bff;
    color: white;
    padding-top: 20px;
    .van-cell {
      background: #007bff;
      color: white;
      &::after {
        display: none;
      }
      .avatar {
        width: 60px;
        height: 60px;
        background-color: #fff;
        border-radius: 50%;
        margin-right: 10px;
      }
      .username {
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  .user-data {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 14px;
    padding: 30px 0;
    .user-data-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33.33%;
    }
  }
}
</style>
