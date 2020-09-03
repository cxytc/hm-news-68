<template>
  <div class="my-comment">
      <hm-header>我的跟帖</hm-header>
      <div class="coment">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              :immediate-check="false"
              offset:10
              @load="onLoad"
            >
              <div class="item" v-for = "item in coment" :key="item.id">
                  <div class="time">{{item.create_date | time('YYYY-MM-DD hh:mm')}}</div>
                  <div class="comment" v-if ="item.parent">
                      <div class="name">回复: {{item.parent.user.nickname}}</div>
                      <div class="comment_content">{{item.parent.content}}</div>
                  </div>
                  <div class="content">{{item.content}}</div>
                  <div class="origin">
                      <span class="one-txt-cut">原文:{{item.post.title}}</span>
                      <span class="iconfont iconjiantou1"></span>
                  </div>
              </div>
            </van-list>
          </van-pull-refresh>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      coment: [],
      // 当前页
      pageIndex: 1,
      // 每页的条数
      pageSize: 5,
      // 代表是否结束 false代表还有数据 finished true代表没有更多数据
      finished: false,
      // 代表加载状态 如果loading为true的时候 代表List组件正在加载数据 onLoad就不再触发  当滚动到底部的时候 触发onload时候  自动把loading改成true
      loading: false,
      // 是否正在下来刷新
      refreshing: false
    }
  },
  created () {
    this.getMyComment()
  },
  methods: {
    async getMyComment () {
      const res = await this.$axios.get('/user_comments', {
        // get请求的参数必须放到params中或者拼接到url地址中
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.coment = [...this.coment, ...data]

        // 把loading改成fasle,加载完成
        this.loading = false

        // 判断如果没有更多数据了 需要把finishes改成true
        if (data.length < this.pageSize) {
          this.finished = true
        }

        this.refreshing = false
      }
    },
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        this.pageIndex++
        this.getMyComment()
      }, 1000)
    },
    onRefresh () {
      setTimeout(() => {
        // 下来刷新需要清除原来的数据
        this.coment = []
        // 防止之前已经没有数据了
        this.finished = false
        this.loading = true
        // 重新加载第一页的数据
        this.pageIndex = 1
        this.getMyComment()
      }, 1000)
    }
  }
}
</script>

<style lang = "less" scoped>
    .item {
       border-bottom:1px solid #ccc;
       padding: 10px 20px;
       .time {
           color: #ccc;
           font-size: 16px;
       }

       .comment {
           background-color: #e4e4e4;
           margin-top: 20px;
           font-size: 12px;
           color: #ccc;
           padding: 15px 10px;
           .name {
               padding-bottom: 5px;
           }
       }

       .content {
           margin-top: 20px;
           font-size: 16px;
       }
       .origin {
           font-size: 16px;
           color: #ccc;
           margin-top: 10px;
           display: flex;
           span:first-child{
               font-size: 14px;
           }
       }

    }
</style>
