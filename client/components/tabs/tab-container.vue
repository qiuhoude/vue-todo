<script>
  export default {
    name: "TabContainer",
    props: {
      panes: {
        type: Array,
        require: true,
        default: null
      }
    },
    render() {
      const contents = this.panes.map(pane => {
        return pane.active ? pane.$slots.default : null
       })
      return (
        <div class="tab-container">
          {contents}
        </div>
      )
    },

  }
</script>

<style scoped>

</style>
