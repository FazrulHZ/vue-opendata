import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        modalEdit: false,
        dataset: {
            dataset_id: '',
            dataset_nama: '',
            dataset_sumber: '',
            dataset_cakupan: '',
            dataset_deskripsi: '',
            org_id: '',
            grup_id: '',
            created_at: ''
        }
    },

    mutations: {
        toggleModal(state, value) {
            state.modalEdit = value
        },
        viewModal(state, value) {
            state.dataset = value
        }
    }
})
