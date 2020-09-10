<template>
  <div class="manage">
      <hm-header>栏目管理</hm-header>
  <div class="content">
    <div class="active">
        <h3>点击删除以下频道</h3>
        <div class="list">
          <div class="item" v-for = "item in activeList" :key="item.id" @click = "delTap(item.id)">{{item.name}}</div>
        </div>
      </div>
      <div class="deactive">
        <div class="list">
          <h3>点击添加以下频道</h3>
          <div class="item" v-for = "item in deactiveList" :key="item.id" @click = "add(item.id)">{{item.name}}</div>
        </div>
      </div>
   </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 存放激活的栏目
      activeList: [],
      // 存放未激活的栏目
      deactiveList: [],
      tabList: []
    }
  },
  async created () {
    const activeList = JSON.parse(localStorage.getItem('activeList'))
    const deactiveList = JSON.parse(localStorage.getItem('deactiveList'))
    if (activeList) {
      this.activeList = activeList
      this.deactiveList = deactiveList
      return
    }
    const res = await this.$axios.get('/category')
    const { statusCode, data } = res.data
    console.log(res)
    if (statusCode === 200) {
      this.activeList = data
    }
  },
  methods: {
    delTap (id) {
      if (this.activeList.length < 5) return
      const Index = this.activeList.findIndex(item => item.id === id)
      // 往未激活的栏目中添加
      this.deactiveList.push(this.activeList[Index])
      // 删除激活中的这个栏目
      this.activeList.splice(Index, 1)
    },
    add (id) {
    //   if (this.activeList.length < 5) return
      const Index = this.deactiveList.findIndex(item => item.id === id)
      // 往激活的栏目中添加
      this.activeList.push(this.deactiveList[Index])
      // 删除激活中的这个栏目
      this.deactiveList.splice(Index, 1)
    }
  },
  watch: {
    activeList: {
      // 深度检测
      deep: true,
      handler (value) {
        localStorage.setItem('activeList', JSON.stringify(this.activeList))
        localStorage.setItem('deactiveList', JSON.stringify(this.deactiveList))
      }
    }
  }
}
</script>

<style lang ="less" scoped>
  .content {
    padding: 10px;
    .active,
    .deactive {
      h3 {
        font-size: 14px;
        font-weight: 400;
        margin-bottom: 10px;
        margin-left: 8px;
        margin-top: 10px;
      }
      .list {
        overflow: hidden;
        .item {
          font-size: 12px;
          width: 60px;
          height: 30px;
          border: 1px solid #ccc;
          background-color: #eee;
          text-align: center;
          line-height: 30px;
          float: left;
          margin: 5px;
          margin-left: 9px;
        }
      }
    }
  }
</style>
