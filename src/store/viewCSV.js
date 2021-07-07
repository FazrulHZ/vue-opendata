/* eslint-disable indent */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        View: false
    },

    mutations: {
        viewCSV(state, value) {
            state.View = value
        }
    }
})
