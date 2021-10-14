<template>
  <div id="login">
    <!-- 头部区域 -->
    <van-nav-bar :fixed="true" title="黑马头条 - 登录" />
    <!-- 表单区域 -->
    <van-form @submit="login">
      <van-field
        v-model="form.mobile"
        :rules="rules.mobile"
        required
        name="mobile"
        label="手机号码"
        placeholder="请输入手机号码"
      />
      <van-field
        v-model="form.password"
        :rules="rules.password"
        required
        type="password"
        name="password"
        label="登录密码"
        placeholder="请输入登录密码"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 按需导入登录的API接口
import { loginAPI } from '../../api/userAPI'

import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        mobile: '13888888123',
        password: '246810'
      },
      rules: {
        mobile: [
          { required: true, message: '请务必输入手机号码', trigger: 'onBlur' },
          { pattern: /^1\d{10}$/, message: '请您输入正确的手机号', trigger: 'onBlur' }
        ],
        password: [{ required: true, message: '请输入正确的密码', trigger: 'onBlur' }]
      }
    }
  },
  methods: {
    ...mapMutations(['updateTokenInfo']),
    async login() {
      const { data: res } = await loginAPI({ mobile: this.form.mobile, code: this.form.password })

      if (res.message === 'OK') {
        console.log(res.data)
        this.updateTokenInfo(res.data)
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="less" scoped>
#login {
  padding-top: 46px;
}
</style>
