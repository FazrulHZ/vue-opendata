import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        modalEdit: false,
        organisasi: {
            org_id: '',
            org_nama: '',
            org_slug: '',
            org_foto: '',
            created_at: ''
        }
    },

    mutations: {
        toggleModal(state, value) {
            state.modalEdit = value
        },
        viewModal(state, value) {
            state.organisasi = value
        }
    }
})
