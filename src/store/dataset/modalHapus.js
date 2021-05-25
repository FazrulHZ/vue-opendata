import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        modalHapus: false,
        dataset: {
            dataset_id: '',
            dataset_nama: '',
            dataset_sumber: '',
            dataset_cakupan: '',
            org_id: '',
            grup_id: '',
            created_at: ''
        }
    },

    mutations: {
        toggleModal(state, value) {
            state.modalHapus = value
        },
        viewModal(state, value) {
            state.dataset = value
        }
    }
})