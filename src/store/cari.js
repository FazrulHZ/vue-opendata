import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataset: []
  },

  mutations: {
    postDataset(state, value) {
      state.dataset = value
    }
  }
})
