import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        modalView: false,
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
            state.modalView = value
        },
        viewModal(state, value) {
            state.infografis = value
        }
    }
})
