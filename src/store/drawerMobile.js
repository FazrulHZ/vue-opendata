/* eslint-disable indent */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        drawer: null
    },

    mutations: {
        toggle(state, value) {
            state.drawer = value
        }
    }
})
