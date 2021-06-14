<template>
  <v-dialog v-model="modalEdit" :max-width="dekstop">
    <v-card>
      <v-toolbar dark color="primary" dense flat>
        <v-toolbar-title class="subtitle-1">Edit Data dataset</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="closeModal()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form ref="form">
        <div class="px-5 py-5">
          <v-row>
            <!-- Nama Dataset -->
            <v-col cols="12" class="mb-n10">
              <span class="subtitle-2">Nama Dataset</span>
              <v-text-field dense flat outlined class="mt-2" v-model="editedItem.dataset_nama"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Sumber Dataset -->
            <v-col cols="12" md="6" class="mb-n10">
              <span class="subtitle-2">Sumber Dataset</span>
              <v-text-field dense flat outlined class="mt-2" v-model="editedItem.dataset_sumber"></v-text-field>
            </v-col>

            <!-- Cakupan Dataset -->
            <v-col cols="12" md="6" class="mb-n10">
              <span class="subtitle-2">Cakupan Dataset</span>
              <v-text-field dense flat outlined class="mt-2" v-model="editedItem.dataset_cakupan"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Deskripsi Dataset -->
            <v-col cols="12" class="mb-n10">
              <span class="subtitle-2">Deskripsi Dataset</span>
              <v-textarea dense flat outlined class="mt-2" v-model="editedItem.dataset_deskripsi"></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <!-- Organisasi -->
            <v-col cols="12" md="6" class="mb-n10">
              <span class="subtitle-2">Organisasi</span>
              <v-autocomplete v-model="editedItem.org_id" :items="refOrg" item-text="org_nama" item-value="org_id" outlined dense> </v-autocomplete>
            </v-col>

            <!-- Grup -->
            <v-col cols="12" md="6">
              <span class="subtitle-2">Grup</span>
              <v-autocomplete v-model="editedItem.grup_id" :items="refGrup" item-text="grup_nama" item-value="grup_id" outlined dense> </v-autocomplete>
            </v-col>
          </v-row>

          <hr />
          <div class="text-right mr-5 mt-5 pb-5">
            <v-btn v-if="btnLoading" small color="primary" depressed @click="edit()">SIMPAN</v-btn>
            <v-btn v-else small color="primary" depressed loading>SIMPAN</v-btn>
          </div>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import Cookie from '@/helper/cookie.js'

import modalEdit from '@/store/dataset/modalEdit'
import refreshView from '@/store/dataset/viewDataset'
import getRef from '@/helper/getRef.js'

export default {
  created() {
    if (this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm') {
      this.dekstop = '100%'
    }
  },

  computed: {
    modalEdit: {
      get() {
        return modalEdit.state.modalEdit
      },
      set(value) {
        modalEdit.commit('toggleModal', value)
      }
    },

    editedItem: {
      get() {
        return modalEdit.state.dataset
      },
      set(value) {
        console.log(value)
      }
    }
  },

  watch: {
    async modalEdit() {
      this.session = await JSON.parse(Cookie.dec(Cookie.get('myCookie')))
      this.refOrg = await getRef.Organisasi()
      this.refGrup = await getRef.Grup()
    }
  },

  data: () => ({
    session: '',
    dekstop: '80%',
    btnLoading: true,
    show: false,

    refOrg: [],
    refGrup: []
  }),

  methods: {
    async edit() {
      this.btnLoading = false

      const data = {
        dataset_id: this.editedItem.dataset_id,
        dataset_nama: this.editedItem.dataset_nama,
        dataset_sumber: this.editedItem.dataset_sumber,
        dataset_cakupan: this.editedItem.dataset_cakupan,
        dataset_deskripsi: this.editedItem.dataset_deskripsi,
        org_id: this.editedItem.org_id,
        grup_id: this.editedItem.grup_id
      }

      const url = process.env.VUE_APP_API_BASE + 'dataset'
      this.http
        .put(url, data, {
          headers: {
            Authorization: 'Bearer ' + this.session.token
          }
        })
        .then(response => {
          this.btnLoading = true
          if (response.data.success) {
            refreshView.commit('refreshData', true)
            refreshView.commit('alert', response.data.message)
            refreshView.commit('berhasilAlert', true)
            refreshView.commit('gagalAlert', false)
            refreshView.commit('success', response.data.success)
          } else {
            refreshView.commit('refreshData', true)
            refreshView.commit('alert', response.data.message)
            refreshView.commit('gagalAlert', true)
            refreshView.commit('berhasilAlert', false)
            refreshView.commit('success', response.data.success)
          }
          this.closeModal()
        })
        .catch(error => {
          refreshView.commit('refreshData', true)
          refreshView.commit('alert', error.response.data.message)
          refreshView.commit('gagalAlert', true)
          refreshView.commit('berhasilAlert', false)
          refreshView.commit('success', error.response.data.success)
          console.log(error.response.status)
          this.btnLoading = true
        })
    },

    onFile(value) {
      this.dataset_foto = value
      this.urlImage = URL.createObjectURL(this.dataset_foto)
    },

    closeModal() {
      this.modalEdit = false
    }
  }
}
</script>
