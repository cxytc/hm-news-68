<template>
  <div>
    <hm-header>注册</hm-header>
    <hm-log></hm-log>
     <van-form @submit="register">
    <van-field
      v-model="user.username"
      label="账号"
      placeholder="用户名/手机号"
      :rules="rules.username"
    />
     <van-field
      v-model="user.nickname"
      label="昵称"
      placeholder="用户名"
      :rules="rules.nickname"
    />
    <van-field
      v-model="user.password"
      type="password"
      name="密码"
      label="密码"
      placeholder="请输入密码"
      :rules="rules.password"
    />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">
        注册
      </van-button>
    </div>
     <p class = "tips">已有账号？去<router-link to= "/login">登录</router-link></p>
  </van-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        nickname: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '用户名长度是5-11位数字', trigger: 'onChange' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'onChange' },
          { pattern: /^\d{3,9}$/, message: '密码长度是3-9位数字', trigger: 'onChange' }
        ],
        nickname: [
          { required: true, message: '名称不能为空', trigger: 'onChange' },
          { pattern: /^[\u4e00-\u9fa5]{2,6}$/, message: '必须要写2-6位的文字', trigger: 'onChange' }
        ]
      }
    }
  },
  methods: {
    async register () {
      const res = await this.$axios.post('/register', this.user)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push({
          name: 'login',
          params: {
            username: this.user.username,
            password: this.user.password
          }
        })
      } else {
        this.$toast.fail(message)
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
