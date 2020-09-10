<template>
  <div ref = "father">
    <div class="hm-sticky" ref = "sticky">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll () {
      // 获取可视区的宽高的距离
      const father = this.$refs.father
      const sticky = this.$refs.sticky
      // 给window注册滚动事件
      const rect = father.getBoundingClientRect()
      console.log(rect.top)
      if (rect.top <= 0) {
        sticky.classList.add('hm-sticky--fixed')
        // this.father.skyle.height = sticky.offsetHeight + 'px'
      } else {
        sticky.classList.remove('hm-sticky--fixed')
      }
    }
  },
  // 销毁的钩子函数
  destroyed () {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>

<style lang = "less" scoped>
  /deep/.hm-sticky--fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }

</style>
