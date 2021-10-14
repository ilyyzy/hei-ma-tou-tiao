<template>
  <div class="login-container">
    <van-nav-bar title="黑马头条 - 登录" fixed />
    <!-- 登录的表单 -->
    <van-form>
      <van-field v-model="form.mobile" type="tel"      label="手机号码" placeholder="请输入手机号码" required :rules="rules.mobile"></van-field>
      <van-field v-model="form.userpwd"   type="password" label="登录密码" placeholder="请输入登录密码" required :rules="rules.userpwd"></van-field>
      <!-- 登录按钮 -->
      <div style="margin: 16px;">
        <van-button @submit="login" round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      // 校验规则
      rules: {
        userphone: [
          // 非空校验
          { required: true, message: '请填写您的手机号', trigger: 'onBlur' },
          // 手机号11位校验
          { pattern: /^1\d{10}$/, message: '请填写正确的手机号', trigger: 'onBlur' }
        ],
        userpwd: [
          // 非空校验
          { required: true, message: '请填写您的密码', trigger: 'onBlur' }
        ]
      },

      // 登录表单双向绑定
      form: {
        // 手机号
        mobile: '',
        // 密码
        userpwd: ''
      }
    }
  },
  methods: {
    // 校验通过时触发
    login() {
      console.log('ok')
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  padding-top: 46px;
}
</style>
