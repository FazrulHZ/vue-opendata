<template>
  <v-dialog v-model="modalEdit" :max-width="dekstop">
    <v-card>
      <v-toolbar dark color="primary" dense flat>
        <v-toolbar-title class="subtitle-1">Edit Data data</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="closeModal()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form ref="form">
        <div class="px-5 py-5">
          <v-row>
            <!-- Dataset -->
            <v-col cols="12" class="mb-n10">
              <span class="subtitle-2">Pilih Dataset</span>
              <v-autocomplete v-model="editedItem.dataset_id" :items="refDataset" item-text="dataset_nama" item-value="dataset_id" outlined dense> </v-autocomplete>
            </v-col>
          </v-row>

          <v-row>
            <!-- Nama Data -->
            <v-col cols="12" md="10" class="mb-n10">
              <span class="subtitle-2">Nama Data</span>
              <v-text-field dense flat outlined class="mt-2" v-model="editedItem.data_nama"></v-text-field>
            </v-col>

            <!-- Tahun Data -->
            <v-col cols="12" md="2" class="mb-n10">
              <span class="subtitle-2">Tahun Data</span>
              <v-text-field dense flat outlined class="mt-2" v-model="editedItem.data_tahun"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Keterangan Data -->
            <v-col cols="12" class="mb-n10">
              <span class="subtitle-2">Keterangan Data</span>
              <v-textarea dense flat outlined class="mt-2" v-model="editedItem.data_ket"></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <!-- File -->
            <v-col cols="12" md="6">
              <span class="subtitle-2">File</span>
              <v-file-input
                v-model="inputfile"
                dense
                flat
                outlined
                prepend-icon
                accept=".csv"
                placeholder="Pilih file CSV"
                append-icon="mdi-paperclip"
                @change="onFile"
                ref="avatar"
                :hint="'Database file: ' + editedItem.data_file"
                persistent-hint
              ></v-file-input>
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

import modalEdit from '@/store/data/modalEdit'
import refreshView from '@/store/data/viewData'
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
        return modalEdit.state.data
      },
      set(value) {
        console.log(value)
      }
    }
  },

  watch: {
    async modalEdit() {
      this.session = await JSON.parse(Cookie.dec(Cookie.get('myCookie')))
      this.refDataset = await getRef.Dataset()
    }
  },

  data: () => ({
    session: '',
    dekstop: '80%',
    btnLoading: true,
    show: false,

    refDataset: [],

    inputfile: null
  }),

  methods: {
    async edit() {
      this.btnLoading = false

      const data = new FormData()
      data.append('data_id', this.editedItem.data_id)
      data.append('data_nama', this.editedItem.data_nama)
      data.append('data_ket', this.editedItem.data_ket)
      data.append('data_tahun', this.editedItem.data_tahun)
      data.append('data_file', this.editedItem.data_file)
      data.append('dataset_id', this.editedItem.dataset_id)

      const url = process.env.VUE_APP_API_BASE + 'data'
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
          this.closeModal()
        })
    },

    onFile(value) {
      this.editedItem.data_file = value
    },

    closeModal() {
      this.modalEdit = false
      this.inputfile = null
    }
  }
}
</script>
