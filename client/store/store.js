import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === "development"

export default () => {

  const store = new Vuex.Store({
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions,

    // 插件
    // plugins: [
    //   (store) => {
    //     console.log('my plugin invoked')
    //   }
    // ]

    // 模块
    // modules: {
    //   a: {
    //     namespaced: true,
    //     state: {
    //       text: 1
    //     },
    //     mutations: {
    //       updateText (state, text) {
    //         console.log('a.state', state)
    //         state.text = text
    //       }
    //     },
    //     getters: {
    //       textPlus (state, getters, rootState) {
    //         return state.text + rootState.b.text
    //       }
    //     },
    //     actions: {
    //       add ({ state, commit, rootState }) {
    //         commit('updateCount', { num: 56789 }, { root: true })
    //       }
    //     }
    //   },
    //   b: {
    //     namespaced: true,
    //     state: {
    //       text: 2
    //     },
    //     actions: {
    //       testAction ({ commit }) {
    //         commit('a/updateText', 'test text', { root: true })
    //       }
    //     }
    //   }
    // }
  })

  // 热重载 https://vuex.vuejs.org/zh/guide/hot-reload.html
  if (module.hot) {
    // 使 state getters action mutation 成为可热重载模块
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      // 获取更新后的模块
      // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

      // 加载新模块
      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })

  }

  return store
}
