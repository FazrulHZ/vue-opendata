import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        modalHapus: false,
        infografis: {
            infografis_id: '',
            infografis_nama: '',
            infografis_slug: '',
            infografis_foto: '',
            infografis_deskripsi: '',
            created_at: ''
        }
    },

    mutations: {
        toggleModal(state, value) {
            state.modalHapus = value
        },
        viewModal(state, value) {
            state.infografis = value
        }
    }
})
