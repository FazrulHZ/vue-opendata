import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        modalHapus: false,
        grup: {
            user_id: '',
            user_nama: '',
            user_email: '',
            user_fullname: '',
            org_id: '',
            created_at: '',
            org_nama: ''
        }
    },

    mutations: {
        toggleModal(state, value) {
            state.modalHapus = value
        },
        viewModal(state, value) {
            state.grup = value
        }
    }
})
