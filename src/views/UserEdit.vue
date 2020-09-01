<template>
  <div class="user-edit">
       <hm-header>编辑资料</hm-header>
       <div class="avatar">
           <span> <img :src="$axios.defaults.baseURL + user.head_img" > </span>
       </div>
        <hm-nav @click = "clickFn">
      <template>昵称</template>
      <template #content>{{user.nickname}}</template>
  </hm-nav>
   <hm-nav  @click = "showPassword">
      <template>密码</template>
      <template #content>******</template>
  </hm-nav>
   <hm-nav @click = "showGender">
      <template>性别</template>
      <template #content>{{user.gender === 1? '男' : '女'}}</template>
  </hm-nav>
  <!-- 昵称选项 -->
  <van-dialog v-model="isShowname" title="修改昵称" show-cancel-button @confirm = "UpdateNickname">
    <van-field v-model="nickname"/>
  </van-dialog>
  <!-- 密码选项 -->
  <van-dialog v-model="isShowpassShow" title="修改密码" show-cancel-button @confirm = "UpdatePassword">
  <van-field v-model="password"/>
  </van-dialog>
  <!-- 性别选项 -->
  <van-dialog v-model="isShowGender" title="修改性别" show-cancel-button @confirm = "UpdateGender">
    <van-radio-group v-model="gender">
      <van-cell-group>
        <van-cell title="男" clickable @click="gender = 1">
          <template #right-icon>
            <van-radio :name="1" />
          </template>
        </van-cell>
        <van-cell title="女" clickable @click="gender = 0">
          <template #right-icon>
            <van-radio :name="0" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </van-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: '',
      isShowname: false,
      nickname: '',
      isShowpassShow: false,
      password: '',
      isShowGender: false,
      gender: 1
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
      }
    },
    clickFn () {
      this.isShowname = true
      this.nickname = this.user.nickname
    },
    async updateUser (data) {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      // console.log(res.data)
      if (res.data.statusCode === 200) {
        this.getUserInfo()
        this.$toast.success('昵称修改成功')
      }
    },
    async UpdateNickname () {
      this.updateUser({
        nickname: this.nickname
      })
    },
    // 点击修改密码的显示与隐藏
    showPassword () {
      // console.log(this.user)
      this.isShowpassShow = true
      this.password = this.user.password
    },
    async UpdatePassword () {
      this.updateUser({
        password: this.password
      })
    },
    showGender () {
      this.isShowGender = true
      this.gender = this.user.gender
    },
    async UpdateGender () {
      this.updateUser({
        gender: this.gender
      })
    }
  }
}
</script>

<style lang ="less" scoped>
.avatar {
    text-align: center;
    padding: 15px;
    img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
    }
}

/deep/.van-dialog__content {
      padding: 15px;
      .van-field {
        border: 1px solid skyblue;
      }
    }
</style>
