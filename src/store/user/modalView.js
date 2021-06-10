import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        modalView: false,
        user: {
            user_id: '',
            user_nama: '',
            user_email: '',
            user_fullname: '',
            user_lvl: '',
            user_foto: '',
            org_id: '',
            created_at: '',
            org_nama: ''
        }
    },

    mutations: {
        toggleModal(state, value) {
            state.modalView = value
        },
        viewModal(state, value) {
            state.user = value
        }
    }
})
