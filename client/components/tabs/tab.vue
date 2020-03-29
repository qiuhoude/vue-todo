<script>
  export default {
    name: "Tab",
    inject: ['bindData'],
    props: {
      index: {
        type: [Number, String],
        require: true,
        default: 1
      },
      label: {
        type: String,
        default: 'tab'
      }
    },
    computed: {
      active() {
        // 获取 父组件tabs的value的值(选中值)有两种方式
        // 1 使用 $parent 但是如果是祖先节点就不能用
        // const active = this.$parent.value == this.index
        // 2 使用provide/inject的方式
        const active = this.bindData.tabsValue == this.index
        return active
      }
    },
    render() {

      const classNames = {
        tab: true,
        active: this.active
      }
      // 如果有插槽,就使用具名label插槽,没有就使用label属性
      const tab = this.$slots.label || <span>{this.label}</span>
      return (
        <li class={classNames}>
          {tab}
        </li>
      )
    }

  }
</script>

<style scoped lang="stylus">
  .tab
    list-style none
    line-height 40px
    margin-right 30px
    position relative
    bottom -2px
    cursor pointer

    &.active
      border-bottom 2px solid blue

    &:last-child
      margin-right 0

</style>
