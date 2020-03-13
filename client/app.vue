<template>
  <div id="app">
    <div id="cover" />
    <HeaderCom />
    <TodoCom />
    <FooterCom />
  </div>
</template>

<script>
    import HeaderCom from './layout/header.vue'
    import FooterCom from './layout/footer.jsx'
    import TodoCom from './views/todo/todo.vue'

    console.log("-----> : ",HeaderCom.__docs);
    export default {
        components: {
            HeaderCom,
            FooterCom,
            TodoCom
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