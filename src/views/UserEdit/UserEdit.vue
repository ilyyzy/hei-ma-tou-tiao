<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
      fixed
    />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image round class="avatar" :src="userProfile.photo" />
        </template>
      </van-cell>
      <van-cell
        title="名称"
        is-link
        :value="userProfile.name"
        @click="onNameCellClick"
      />
      <van-dialog
        v-model="showNameDialog"
        title="修改名称"
        show-cancel-button
        :before-close="beforeClose"
      >
        <!-- input-align 文本横向的对其方式 -->
        <van-field
          v-model.trim="name"
          placeholder="请输入用户名"
          input-align="center"
          maxlength="7"
          ref="nameRef"
        />
      </van-dialog>
      <van-cell title="生日" is-link :value="userProfile.birthday" />
    </van-cell-group>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { updateUserProfileAPI } from '@/api/userAPI.js'
export default {
  name: 'UserEdit',
  data() {
    return {
      // 是否展示修改姓名的对话框
      showNameDialog: false,
      // 用户填写的姓名
      name: ''
    }
  },
  methods: {
    // 从 vuex 中把指定名称的 Action 方法映射到组件中使用
    ...mapActions(['initUserProfile']),
    onNameCellClick() {
      // 把用户的名称赋值给 data 中的 name
      this.name = this.userProfile.name
      // 展示对话框
      this.showNameDialog = true
      this.$nextTick(() => {
        this.$refs.nameRef.focus()
      })
    },
    beforeClose(action, done) {
      if (action === 'cancel') return done()

      // 判断名称的长度是否不合法
      if (this.name === '' || this.name.length > 7) {
        // 1. 提示用户“名称的长度为1-7个字符”
        this.$notify({
          type: 'warning',
          message: '名称的长度为1-7个字符',
          duration: 2000
        })
        // 2. 让文本框持续获得焦点
        this.$refs.nameRef.focus()
        // 3. 阻止对话框关闭
        return done(false)
      }

      // TODO：发起修改名称的请求：
      // A. 如果请求成功，则调用 done() 关闭对话框
      // B. 如果请求失败，则提示用户失败的信息，并调用 done(false) 阻止对话框关闭
      this.updateName(done)
    },
    async updateName(done) {
      try {
        const { data: res } = await updateUserProfileAPI({ name: this.name })
        if (res.message === 'OK') {
          // 关闭对话框
          done()
          // 重新请求用户的简介信息
          this.initUserProfile()
          // 提示用户更新成功
          this.$notify({
            type: 'success',
            message: '名称更新成功！',
            duration: 2000
          })
        }
      } catch (e) {
        if (e.response.status === 409) {
          // 提示用户名称被占用
          this.$notify({
            type: 'warning',
            message: '名称被占用，请更换后重试！',
            duration: 2000
          })
          // 阻止关闭对话框
          done(false)
          // 让文本框持续获得焦点
          this.$refs.nameRef.focus()
        } else {
          // 关闭对话框
          done()
          // 提示用户名称被占用
          this.$notify({
            type: 'danger',
            message: '名称更新失败！',
            duration: 2000
          })
        }
      }
    }
  },
  computed: {
    // 从 vuex 中把指定名称的 State 数据映射到组件中使用
    ...mapState(['userProfile'])
  },
  created() {
    this.initUserProfile()
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
}

.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
</style>
