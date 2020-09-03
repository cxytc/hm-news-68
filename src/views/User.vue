<template>
  <div class="hm-user">
    <div class="header" @click = "$router.push('useredit')">
      <div class="avatar">
        <img :src="$axios.defaults.baseURL + user.head_img" alt="">
      </div>
      <div class="info">
        <div class="name">
          <span class="iconfont iconxingbienan" v-if="user.gender === 1"></span>
          <span class="iconfont iconxingbienv" v-if="user.gender === 0"></span>
          <span>{{user.nickname}}</span>
        </div>
        <div class="time">
         {{user.create_date | time}}
        </div>
      </div>
      <div class="arrow">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
     <hm-nav to = "/myfollow">
      <template>我的关注</template>
      <template #content>关注的内容</template>
  </hm-nav>
   <hm-nav to= "/mycomment">
      <template>我的跟帖</template>
      <template #content>跟帖/回复</template>
  </hm-nav>
   <hm-nav>
      <template>我的收藏</template>
      <template #content>文章/视频</template>
  </hm-nav>
  <hm-nav to="/useredit">
      <template >设置</template>
  </hm-nav>
  <div class = "btn">
    <van-button type="info" class = "btns" @click="clickFn">退出</van-button>
  </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: ''
    }
  },
  async created () {
    const userId = localStorage.getItem('userId')
    const res = await this.$axios.get(`/user/${userId}`)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
    }
  },
  methods: {
    async clickFn () {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确定要退出本系统吗?'
        })
      } catch {
        return this.$toast('取消退出')
      }
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.$router.push('/login')
      this.$toast.success('退出成功')
    }
  }
}
</script>
<style lang = "less" scoped>
    .hm-user {
        .header {
            display: flex;
            align-items: center;
            border-bottom: 3px solid #ccc;
            padding: 20px 10px;
            .avatar {
                width: 70px;
                height: 70px;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .info {
                flex: 1;
                font-size: 12px;
                margin-left: 10px;

                .iconxingbienan {
                    color: #7bbcec
                }
                .time {
                    margin-top: 10px;
                    color: #ccc
                }
                .iconxingbienv {
                    color: pink
                }
            }
        }
    }
    .btn {
      display: flex;
      .btns {
        flex: 1;
        margin: 15px;
      }
    }
</style>
