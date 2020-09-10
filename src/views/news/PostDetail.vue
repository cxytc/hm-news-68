<template>
  <div class="post-detail">
    <div class="header">
      <div class="left" @click= "$router.back()">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="right">
        <div class="followed" v-if = "post.has_follow" @click = "unfollow">已关注</div>
        <div class="follow"  v-else @click = "follow">关注</div>
      </div>
    </div>
    <div class="content">
      <div class="title">{{post.title}}</div>
      <div class="name">
        <span>{{post.user.nickname}}</span>
        <span>{{post.create_date | time}}</span>
      </div>
      <div v-if="post.type === 1" class="info" v-html="post.content"></div>
      <video v-else :src=" getUrl(post.content)" controls autoplay muted></video>
      <div class="buttons">
        <div class="good" @click = "like" :class="{active: post.has_like}">
          <span class="iconfont icondianzan" ></span>
          <span >{{post.like_length || 0}}</span>
        </div>
        <div class="share">
          <span class="iconfont iconweixin"></span>
          <span>微信</span>
        </div>
      </div>
    </div>
    <!-- 精彩回帖 -->
    <div class="comment-list">
      <h3>精彩跟贴</h3>
      <hm-comment :comment = "comment" v-for = "comment in commentList" :key="comment.id" @reply = "onReply"></hm-comment>
    </div>
    <div class="footer-textarea" v-if ="isShowTextarea">
      <textarea @blur = "onBlur"  v-model = "content" :placeholder="'回复：' + nickname" ref="textarea"></textarea>
      <van-button type="primary" @click = "publish">发送</van-button>
    </div>
    <div class="footer-input" v-else>
      <div class="search">
        <input type="text" placeholder="回复" @focus="onFocus">
      </div>
      <span class="iconfont iconpinglun-">
        <i>20</i>
      </span>
      <span class="iconfont iconshoucang" :class = "{now: post.has_star}" @click = "star"></span>
      <span class="iconfont iconfenxiang"></span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      post: {
        // f防止post没有数据的时候访问post.user.nickname会报错
        user: {}
      },
      commentList: [],
      isShowTextarea: false,
      content: '',
      nickname: '',
      replyId: ''
    }
  },
  created () {
    this.getInfo()
    // 获取文章的评论列表
    this.getCommentList()
    // 给bus注册自定义事件
    this.$bus.$on('reply', this.onReply)
  },
  // 钩子函数销毁功能
  destroyed () {
    // 移出$bus的自定义事件$off
    // this.$bus.$off() 移出bus上所有的事件
    // this.$bus.$off('reply') 移出bus上所有的reply事件
    // this.$bus.$off('reply', this.onReply) 移除bus上 一个reply事件 对应的这个函数就是需要移除的
    this.$bus.$off('reply', this.onReply)
  },
  methods: {
    noLogin () {
      const token = localStorage.getItem('token')
      if (!token) {
        // 没有登录
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
        // 代表没有登录
        return true
      } else {
        // 代表登录
        return false
      }
    },
    async getInfo () {
      const { id } = this.$route.params
      const res = await this.$axios.get(`/post/${id}`)
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.post = data
      }
    },
    // 解决视频播放不了的情况
    getUrl (url) {
      const div = document.createElement('div')
      div.innerHTML = url
      return div.innerText
    },
    async follow () {
      if (!this.noLogin()) return
      const res = await this.$axios.get(`/user_follows/${this.post.user.id}`)
      if (res.data.statusCode === 200) {
        this.$toast.success('关注成功')
        this.getInfo()
      }
    },
    async unfollow () {
      // 取消关注 直接发送请求
      const res = await this.$axios.get(`/user_unfollow/${this.post.user.id}`)
      if (res.data.statusCode === 200) {
        this.$toast.success('取消成功')
        this.getInfo()
      }
    },
    async like () {
      if (this.noLogin()) return
      const res = await this.$axios.get(`/post_like/${this.post.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    async star () {
      if (this.noLogin()) return
      const res = await this.$axios.get(`/post_star/${this.post.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    async getCommentList () {
      // 从原型上拿到id
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
        console.log(this.commentList)
      }
    },
    async onFocus () {
      this.isShowTextarea = true
      // 等待DOM更新
      await this.$nextTick()
      // 让texttarea自动获取焦点
      this.$refs.textarea.focus()
    },
    async publish () {
      console.log(this.replyId)
      const res = await this.$axios.post(`/post_comment/${this.post.id}`, {
        content: this.content,
        // 把 replyId 传给 parent_id
        parent_id: this.replyId
      })
      // 当数据传输过去 就要验证是否成功
      // 首先解构一下数据
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        // 提示一下数据评论成功
        this.$toast.success(message)
        // 把弹出的 textarea框隐藏掉
        this.isShowTextarea = false
        // 把页面从新渲染
        this.getCommentList()
        // 把textarea内容清空
        this.content = ''
        // 把replyId清空
        this.replyId = ''
        // 把nickname内容清空
        this.nickname = ''
      }
    },
    async onReply (id, nickname) {
      // 把textarea框弹出
      this.isShowTextarea = true
      // 等待dom的渲染
      await this.$nextTick()
      // 自动获取焦点
      this.$refs.textarea.focus()
      // 回显nickname
      this.nickname = '@' + nickname
      this.replyId = id
    },
    // 这是点击空白处隐藏textarea框
    onBlur () {
      // 首先判断里面是否有内容 有就不隐藏
      if (!this.content) {
        this.isShowTextarea = false
        // 让它的id也要为空
        this.replyId = ''
        // 里面的nickname也要为空
        this.nickname = ''
      }
    }
  }
}
</script>

<style lang= "less" scoped>
  .header {
      display: flex;
      padding: 0 10px;
      border-bottom: 1px solid #ccc;
      height: 50px;
      align-items: center;
      .left {
        line-height: 50px;
      }
      .center {
        flex: 1;
        span {
          font-size: 50px;
        }
      }
      .right {
        font-size: 14px;
        div {
          border: 1px solid #ccc;
          width: 60px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 15px;
        }
        .followed {
          border: 1px solid #ccc;
        }
        .follow {
          color: #fff;
          background-color: #f00;
        }
      }
  }
  .content {
    padding: 10px;
    border-bottom: 3px solid #ccc;
    .title {
      font-weight: 700;
      font-size: 16px;
    }
    .name {
      font-size: 14px;
      color: #666;
      margin-top: 10px;
      span:first-child {
        margin-right: 8px;
      }
    }
    .info {
      font-size: 14px;
      /deep/ img {
       width: 100%;
     }
   }
   video {
     width: 100%;
   }
   .buttons {
     padding-top: 10px;
     display: flex;
     justify-content: space-around;
     > div {
       width: 120px;
       height: 40px;
       line-height: 40px;
       border-radius: 20px;
       border: 1px solid #ccc;
       text-align: center;
       font-size: 14px;
       .iconfont {
         font-size: 18px;
         margin-right: 5px;
       }
       .iconweixin {
         color: skyblue569
         ;
       }
     }
     .active {
       background-color: skyblue;
     }
   }
  }
  .footer-input {
    background-color: #fff;
    width: 100%;
    height: 50px;
    display: flex;
    border-top: 1px solid #ccc;
    position: fixed;
    bottom: 0;
    align-items: center;
    justify-content: space-around;
    padding: 0 10px;
    .iconfont {
      font-size: 24px;
    }
    .iconpinglun- {
      position: relative;
      i {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 8px;
        color: #fff;
        background-color: red;
        padding: 0 3px;
        border-radius: 5px;
        right: -5px;
        font-style: normal;
      }
    }
    .now {
      color: orange;
    }
    .search {
      width: 180px;
      padding-right: 10px;
      input {
        height: 30px;
        background-color: #ddd;
        border-radius: 15px;
        width: 100%;
        border: none;
        font-size: 14px;
        padding-left: 20px;
      }
    }
  }

  .footer-textarea {
     width: 100%;
     height: 100px;
     display: flex;
     position: fixed;
     z-index: 999;
     bottom: 0;
     padding: 10px;
     align-items: flex-end;
     background-color: #fff;
     border-top: 1px solid #ccc;
     justify-content: space-around;
     textarea {
       width: 260px;
       height: 80px;
       background-color: #ccc;
       border-radius: 5px;
       border: none;
       padding: 10px;
       font-size: 14px;
     }
  }
</style>
