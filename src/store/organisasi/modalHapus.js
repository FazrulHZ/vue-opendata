import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        modalHapus: false,
        organisasi: {
            org_id: '',
            org_nama: '',
            org_slug: '',
            org_ket: '',
            org_foto: '',
            created_at: ''
        }
    },

    mutations: {
        toggleModal(state, value) {
            state.modalHapus = value
        },
        viewModal(state, value) {
            state.organisasi = value
        }
    }
})
