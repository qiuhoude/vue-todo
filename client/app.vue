<template>
  <div id="app">
    <div id="cover" />
    <HeaderCom />

    <transition
      name="fade"
      mode="out-in"
    >
      <router-view />
    </transition>
    <button @click="notifyClick">
      notify me
    </button>
    <FooterCom />
  </div>
</template>

<script>
  import HeaderCom from './layout/header.vue'
  import FooterCom from './layout/footer.jsx'
  import {mapState} from 'vuex'

  export default {
    metaInfo: {
      title: 'Todo App'
    },
    components: {
      HeaderCom,
      FooterCom,
      // TodoCom
    },
    computed: {
      // ...mapState({}),
      // fullName() {
      //   return this.$store.getters.fullName
      // }
    },
    methods: {
      notifyClick() {
        const n = this.$notify({
          content: 'test notify',
          btn: 'close',
          autoClose: 3000
        })
        n.content = n.id
      }
    }
  }
</script>

<style lang="stylus" scoped>
  #app
    position absolute
    left 0
    right 0
    top 0
    bottom 0

  #cover
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    background-color #555
    opacity 0.5
    z-index -1
</style>
