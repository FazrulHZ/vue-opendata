import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        Refresh: false,
        success: '',
        alertBerhasil: false,
        alertGagal: false,
        alertMassage: ''
    },

    mutations: {
        refreshData(state, value) {
            state.Refresh = value
        },

        alert(state, value) {
            state.alertMassage = value
        },

        success(state, value) {
            state.success = value
        },

        berhasilAlert(state, value) {
            state.alertBerhasil = value
        },

        gagalAlert(state, value) {
            state.alertGagal = value
        }
    }
})
