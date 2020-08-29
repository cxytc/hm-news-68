<template>
  <div>
    <hm-header>登录</hm-header>
    <hm-log></hm-log>
    <!-- 登录表单 -->
    <van-form @submit="login">
    <van-field
      v-model="username"
      name="用户名"
      label="用户名"
      placeholder="用户名"
      :rules="rules.username"
    />
    <van-field
      v-model="password"
      type="password"
      name="密码"
      label="密码"
      placeholder="请输入密码"
      :rules="rules.password"
    />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">
        登录
      </van-button>
    </div>
    <p class = "tips">没有账号？去<router-link to= "/register">注册</router-link></p>
  </van-form>
  </div>
</template>

<script>
// 局部引入axios
// import axios from 'axios'
export default {
  // 在页面进入的时候渲染
  created () {
    const { username, password } = this.$route.params
    this.username = username
    this.password = password
  },
  methods: {
    async login () {
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        // 保存token
        // 跳转到个人中心
        this.$router.push('/user')
      } else {
        this.$toast.fail(message)
      }
    }
  },
  data () {
    return {
      username: '',
      password: '',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '用户名长度是5-11位数字', trigger: 'onChange' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'onChange' },
          { pattern: /^\d{3,9}$/, message: '密码长度是3-9位数字', trigger: 'onChange' }
        ]
      }
    }
  }
}
</script>

<style lang = "less" scoped>
  .tips {
    text-align: right;
    font-size: 18px;
    padding: 15px;
    a {
      color : pink
    }
  }
</style>
