import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        modalEdit: false,
        grup: {
            grup_id: '',
            grup_nama: '',
            grup_slug: '',
            grup_foto: '',
            grup_deskripsi: '',
            created_at: ''
        }
    },

    mutations: {
        toggleModal(state, value) {
            state.modalEdit = value
        },
        viewModal(state, value) {
            state.grup = value
        }
    }
})
