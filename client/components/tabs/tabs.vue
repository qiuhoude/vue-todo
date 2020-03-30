<template>
  <div class="tabs">
    <ul class="tabs-header">
      <slot name="default" />
    </ul>
    <tab-container :panes="panes" />
  </div>
</template>

<script>
  import TabContainer from './tab-container.vue'

  export default {
    name: "Tabs",
    components: {
      TabContainer,
    },
    props: {
      value: {
        type: [String, Number],
        require: true,
        default: 1
      }
    },
    data() {
      return {
        panes: [] // tab
      }
    },
   /* provide() {
      let that = this
      /!*  const bindData = {}
        // 将value传递到 bindData的value上
        Reflect.defineProperty(bindData, 'tabsValue', {
          get() {
            return that.value
          },
          enumerable: true
        })*!/
      const bindData = new Proxy(that, {})
      return {
        bindData
      }
    },*/
    methods: {
      onChange(index) {
        this.$emit('change', index)
      }
    },
   /* render() {
      return (
        <div class='tabs'>
          <ul class='tabs-header'>
            {this.$slots.default}
          </ul>
          <tab-container panes={this.panes}/>
        </div>
      )
    }*/
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
