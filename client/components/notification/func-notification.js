import Notification from './notification.vue'


// 对 notification.vue组件进行扩展
export default {
  extends: Notification,
  computed: {
    style() {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  mounted() {
    this.createTimer() // 创建自动销毁定时器
  },
  methods: {
    createTimer() {
      // console.log(this.autoClose)
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          // 到一定时间将visible
          this.visible = false
        }, this.autoClose)
      }
    },
    clearTimer() {
      // 移除定时器
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    afterEnter() {
       this.height = this.$el.offsetHeight
    },

  },
  beforeDestroy() {
    // 销毁前移除定时器 ,点击关闭时
    this.clearTimer()
  },
  data() {
    return {
      verticalOffset: 0,
      autoClose: 3000, // 自动关闭时间
      visible: false,
      height: 0,
    }
  }
}
