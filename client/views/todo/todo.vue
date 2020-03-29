<template>
  <section class="real-app">
    <div class="tab-container">
      <tabs :value="tabValue">
        <tab
          label="tab1"
          index="1"
        />
        <tab
          label="tab2"
          index="2"
        />
        <tab
          label="tab3"
          index="3"
        />
      </tabs>
    </div>
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="干点啥?"
      @keydown.enter="addTodo"
    >
    <Item
      v-for="todo in filterTodos"
      :key="todo.id"
      :todo="todo"
      @del="deleteTodo"
    />
    <Helper
      :filter="filter"
      :todos="todos"
      @clearAllCompleted="clearAllCompleted"
      @toggle="toggleFilter"
    />
  </section>
</template>

<script>
  import Item from './item.vue'
  import Helper from './helper.vue'

  let id = 0;

  export default {
    components: {
      Item,
      Helper
    },
    data() {
      return {
        todos: [],
        filter: 'all',
        tabValue: 1
      }
    },
    computed: {
      filterTodos() {
        if (this.filter === 'all') {
          return this.todos;
        }
        const completed = this.filter === 'completed';
        return this.todos.filter(todo => completed === todo.completed)
      }
    },
    mounted() {
      setTimeout(() => {
        this.tabValue = 2
      }, 1000)
    },
    methods: {
      addTodo(e) {
        console.log(this);
        this.todos.unshift({
          id: id++,
          content: e.target.value.trim(),
          completed: false
        });
        e.target.value = '';
      },
      deleteTodo(id) {
        let index = this.todos.findIndex(t => t.id === id);
        this.todos.splice(index, 1);
      },
      clearAllCompleted() {
        this.todos = this.todos.filter(t => !t.completed);
      },
      toggleFilter(state) {
        this.filter = state;
      }
    }

  }
</script>

<style scoped lang="stylus">
  .real-app
    width 600px
    margin 0 auto
    box-shadow 0 0 5px 0 #666

  .add-input
    position relative
    margin 0
    border 0
    width 100%
    font-size 24px
    font-family inherit
    font-weight inherit
    line-height 1.4em
    outline none
    color inherit
    box-sizing border-box
    font-smoothing antialiased
    padding 16px 16px 16px 36px
    border none
    box-shadow inset 0 -2px 1px rgba(0, 0, 0, 0.03)

  .tab-container
    background-color #fff
    padding 0 15px

</style>
