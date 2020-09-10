<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push('/search')">
        <div class="search-box">
          <span class="iconfont iconsearch"></span>
          <span>搜索新闻</span>
        </div>
      </div>
      <div class="user" @click = "$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <!-- tab栏切换 -->
   <van-sticky class="my-sticky">
     <div class="more" @click="$router.push('/manage')">
       <span class="iconfont iconlianjie"></span>
     </div>
   </van-sticky>
   <van-tabs v-model="active" sticky animated swipeable>
      <van-tab :title="item.name" v-for = "item in tebList" :key ="item.id">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check = "false"
          >
            <hm-post :post ="item" v-for="item in newList" :key="item.id"></hm-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      active: 0,
      // 用于存放栏目列表
      tebList: [],
      pageIndex: 1,
      pageSize: 5,
      newList: [],
      finished: false,
      loading: false,
      refreshing: false
    }
  },
  created () {
    this.getTabList()
  },
  methods: {
    async getTabList () {
      // 先判断缓存中是否存在
      const activeList = JSON.parse(localStorage.getItem('activeList'))
      if (activeList) {
        this.tebList = activeList
        // 发送请求获取第一个tab栏的数据
        this.getNewsList(this.tebList[0].id)
        return
      }
      const res = await this.$axios.get('/category')
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tebList = data
        // 发送请求获取第一个tab栏数据
        this.getNewsList(this.tebList[0].id)
      }
    },
    // 获取新闻列表
    async getNewsList (id) {
      // 发送请求获取新闻数据
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        if (this.pageIndex === 1) {
          this.newList = []
        }
        this.newList = [...this.newList, ...data]
        // console.log('123', this.newList)
      }
      // 数据加载完成需要把loading改成false
      this.loading = false
      this.refreshing = false
      // 判断是否还有更多数据
      if (data.length < this.pageSize) {
        // console.log(33)
        this.finished = true
      }
    },
    onLoad () {
      setTimeout(() => {
        this.pageIndex++
        this.getNewsList(this.tebList[this.active].id)
      }, 1000)
    },
    // 下拉刷新
    onRefresh () {
      this.newList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      setTimeout(() => {
        this.getNewsList(this.tebList[this.active].id)
      }, 1000)
    }
  },
  watch: {
    active (value) {
      this.newList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      setTimeout(() => {
        this.getNewsList(this.tebList[value].id)
        console.log(111)
      }, 1000)
    }
  }
}
</script>

<style lang ="less" scoped>
  .header {
    display: flex;
    height: 50px;
    background-color: #ff0000;
    line-height: 50px;
    text-align: center;
    color: #fff;
    .logo,
    .user {
      width: 70px;
    }
    .logo {
      span {
        font-size: 50px;
      }
    }
    .user {
      span {
        font-size: 24px;
      }
    }
    .search {
        flex: 1;
        position: relative;
        .search-box {
          height: 32px;
          line-height: 32px;
          background-color: rgba(255, 255, 255, .5);
          border-radius: 15px;
          margin-top: 7px;
          font-size: 16px;
          .iconfont {
            margin-right: 8px;
          }
        }
      }
  }

  /* 跳转页面 */
/deep/ .van-tabs__wrap {
  width: 85%;
}
.more {
  width: 15%;
  height: 44px;
  position: absolute;
  right: 0;
  z-index: 999;
  background-color: #fff;
  text-align: center;
  line-height: 44px;
}
/* 提高下面的层级 */
.my-sticky {
 /deep/ .van-sticky--fixed {
    z-index: 1000;
  }
}
</style>
