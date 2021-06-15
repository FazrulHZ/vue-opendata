import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        modalHapus: false,
        data: {
            data_id: '',
            data_nama: '',
            data_slug: '',
            data_ket: '',
            data_tahun: '',
            data_file: '',
            dataset_id: '',
            created_at: '',
            dataset_nama: '',
            dataset_slug: '',
            dataset_sumber: '',
            dataset_cakupan: '',
            dataset_deskripsi: '',
            org_id: '',
            grup_id: '',
            update_at: ''
        }
    },

    mutations: {
        toggleModal(state, value) {
            state.modalHapus = value
        },
        viewModal(state, value) {
            state.data = value
        }
    }
})
