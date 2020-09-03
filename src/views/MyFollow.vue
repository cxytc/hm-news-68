<template>
  <div class="my-follow">
      <hm-header>我的关注</hm-header>
      <div class="list" v-for = "item in list" :key="item.id">
          <div class="item">
              <div class="left">
                  <img :src="$base + item.head_img" alt="">
              </div>
              <div class="center">
                  <p>{{item.nickname}}</p>
                  <p class="mement">{{item.create_date | time }}</p>
              </div>
              <div class="right">
                  <van-button type="primary" round size ="small" @click = "unfollow(item.id)">取消关注</van-button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getFollow()
  },
  methods: {
    async getFollow () {
      const res = await this.$axios.get('./user_follows')
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        console.log(this.list)
      }
    },
    async unfollow (id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确定要取关吗帅哥'
        })
      } catch {
        return this.$toast('取消操作')
      }
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('取关成功')
        this.getFollow()
      }
    }
  }
}
</script>

<style lang = "less" scoped>
    .item {
        display: flex;
        height: 100px;
        align-items: center;
        padding: 10px;

        .left {
            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
        }
        .center {
            flex: 1;
            padding-left: 15px;
            font-size: 14px;
            .mement {
                margin-top: 8px;
            }
        }
    }
</style>
