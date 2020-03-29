<template>
  <transition
    name="fade"
    @after-leave="afterLeave"
    @after-enter="afterEnter"
  >
    <div
      v-show="visible"
      class="notification"
      :style="style"
      @mouseenter="clearTimer"
      @mouseleave="createTimer"
    >
      <span class="content">{{ content }}</span>
      <a
        class="btn"
        @click="handleClose"
      > {{ btn }}</a>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "NotificationCom",
    props: {
      content: {
        type: String,
        require: true,
        default: 'content'
      },
      btn: {
        type: String,
        default: '关闭'
      }
    },
    data() {
      return {
        visible: true
      }
    },
    computed: {
      style() { //此处只是声明,给子类去实现,vue原因要用的到属性需要提前声明
        return {}
      }
    },
    methods: {
      // 关闭
      handleClose(e) {
        e.preventDefault() //取消a标签的默认的事件
        this.$emit('close')
      },
      afterLeave() { // transition 过渡离开之后的钩子
        this.$emit('closed')
      },
      afterEnter() {
      },
      clearTimer() {
      },
      createTimer() {
      },
    }

  }
</script>

<style scoped lang="stylus">
  .notification
    display: inline-flex
    flex-wrap wrap
    align-items center
    background-color #303030
    color rgba(255, 255, 255, 1)
    padding 20px
    min-width 280px
    box-shadow 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)
    transition all .3s

  .content
    padding 0

  .btn
    color #ff4081
    padding-left 24px
    margin-left auto
    cursor pointer
</style>
