<template>
  <v-dialog v-model="ModalAdd" :max-width="dekstop">
    <template v-slot:activator="{ on: modal, attrs }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn small fab text v-bind="attrs" v-on="{ ...tooltip, ...modal }" @click="openModal()">
            <v-icon>mdi-plus-box</v-icon>
          </v-btn>
        </template>
        <span>Tambah Data</span>
      </v-tooltip>
    </template>

    <v-card>
      <v-toolbar dark color="primary" dense flat>
        <v-toolbar-title class="subtitle-1">Tambah data</v-toolbar-title>
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
              <v-autocomplete v-model="dataset_id" :items="refDataset" item-text="dataset_nama" item-value="dataset_id" outlined dense> </v-autocomplete>
            </v-col>
          </v-row>

          <v-row>
            <!-- Nama Data -->
            <v-col cols="12" md="10" class="mb-n10">
              <span class="subtitle-2">Nama Data</span>
              <v-text-field dense flat outlined class="mt-2" v-model="data_nama"></v-text-field>
            </v-col>

            <!-- Tahun Data -->
            <v-col cols="12" md="2" class="mb-n10">
              <span class="subtitle-2">Tahun Data</span>
              <v-text-field dense flat outlined class="mt-2" v-model="data_tahun"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Keterangan Data -->
            <v-col cols="12" class="mb-n10">
              <span class="subtitle-2">Keterangan Data</span>
              <v-textarea dense flat outlined class="mt-2" v-model="data_ket"></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <!-- File -->
            <v-col cols="12" md="6">
              <span class="subtitle-2">File</span>
              <v-file-input dense flat outlined prepend-icon accept=".csv" placeholder="Pilih file CSV" append-icon="mdi-paperclip" @change="onFile" ref="avatar"></v-file-input>
            </v-col>
          </v-row>

          <hr />
          <div class="text-right mr-5 mt-5 pb-5">
            <v-btn v-if="btnLoading" small color="primary" depressed @click="add()">SIMPAN</v-btn>
            <v-btn v-else small color="primary" depressed loading>SIMPAN</v-btn>
          </div>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import Cookie from '@/helper/cookie.js'

import refreshView from '@/store/data/viewData'
import getRef from '@/helper/getRef.js'

export default {
  created() {
    if (this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm') {
      this.dekstop = '100%'
    }
  },

  data: () => ({
    session: '',
    dekstop: '80%',
    ModalAdd: false,
    btnLoading: true,

    refDataset: [],

    data_nama: '',
    data_ket: '',
    data_tahun: '',
    data_file: null,
    dataset_id: ''
  }),

  methods: {
    default() {
      this.data_nama = ''
      this.data_ket = ''
      this.data_tahun = ''
      this.data_file = null
      this.dataset_id = ''
    },

    async openModal() {
      this.session = await JSON.parse(Cookie.dec(Cookie.get('myCookie')))
      this.refDataset = await getRef.Dataset()
      this.ModalAdd = true
    },

    closeModal() {
      this.default()
      this.ModalAdd = false
    },

    async add() {
      this.btnLoading = false

      const data = new FormData()
      data.append('data_nama', this.data_nama)
      data.append('data_ket', this.data_ket)
      data.append('data_tahun', this.data_tahun)
      data.append('data_file', this.data_file)
      data.append('dataset_id', this.dataset_id)

      const url = process.env.VUE_APP_API_BASE + 'data'
      this.http
        .post(url, data, {
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
          this.default()
          this.closeModal()
        })
        .catch(error => {
          refreshView.commit('refreshData', true)
          refreshView.commit('alert', error.response.data.message)
          refreshView.commit('gagalAlert', true)
          refreshView.commit('berhasilAlert', false)
          refreshView.commit('success', error.response.data.success)
          console.log(error.response.status)
          this.default()
          this.btnLoading = true
          this.closeModal()
        })
    },

    onFile(value) {
      this.data_file = value
    }
  }
}
</script>
