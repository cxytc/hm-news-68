<template>
  <div class="nav-item" @click = "clickFn">
      <div class="title"><slot></slot></div>
      <div class="content"><slot name="content"></slot></div>
      <div class="arrow">
          <span class="iconfont iconjiantou1"></span>
      </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickFn () {
      if (this.to) {
        this.$router.push(this.to)
      }
      this.$emit('click')
    }
  },
  props: {
    to: String
  }
}
</script>

<style lang = "less" scopes>
    .nav-item {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        height: 50px;
        font-size: 14px;
        margin-left: 10px;
        .content {
            flex: 1;
            text-align: right;
            font-size: 12px;
            color: #ccc;
            margin-right: 10px;
        }
        .arrow {
            margin-right: 10px;
        }
    }
</style>
