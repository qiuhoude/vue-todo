<script>
  export default {
    name: "Tabs",
    props: {
      value: {
        type: [String, Number],
        require: true,
        default: 1
      }
    },
    provide() {
      const bindData = {}
      let that = this
      // 将value传递到 bindData的value上
      Reflect.defineProperty(bindData, 'tabsValue', {
        get() {
          return that.value
        },
        enumerable: true
      })
      return {
        bindData
      }
    },
    render() {
      return (
        <div class='tabs'>
          <ul class='tabs-header'>
            {this.$slots.default}
          </ul>
        </div>
      )
    },
  }
</script>

<style scoped lang="stylus">
  .tabs-header
    display flex
    list-style none
    margin 0
    padding 0
    border-bottom 2px solid #ededed
</style>
