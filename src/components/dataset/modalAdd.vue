<template>
  <v-dialog v-model="ModalAdd" max-width="50%">
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
        <v-toolbar-title class="subtitle-1">Tambah Dataset</v-toolbar-title>
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
              <v-text-field dense flat outlined class="mt-2" v-model="dataset_nama"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Sumber Dataset -->
            <v-col cols="12" class="mb-n10">
              <span class="subtitle-2">Sumber Dataset</span>
              <v-text-field dense flat outlined class="mt-2" v-model="dataset_sumber"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Cakupan Dataset -->
            <v-col cols="12" class="mb-n10">
              <span class="subtitle-2">Cakupan Dataset</span>
              <v-text-field dense flat outlined class="mt-2" v-model="dataset_cakupan"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Organisasi -->
            <v-col cols="12" class="mb-n10">
              <span class="subtitle-2">Organisasi</span>
              <v-autocomplete v-model="org_id" :items="refOrg" item-text="org_nama" item-value="org_id" outlined dense> </v-autocomplete>
            </v-col>
          </v-row>

          <v-row>
            <!-- Grup -->
            <v-col cols="12">
              <span class="subtitle-2">Grup</span>
              <v-autocomplete v-model="grup_id" :items="refGrup" item-text="grup_nama" item-value="grup_id" outlined dense> </v-autocomplete>
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
import refreshView from '@/store/dataset/viewDataset'
import getRef from '@/helper/getRef.js'

export default {
  data: () => ({
    ModalAdd: false,
    btnLoading: true,
    show: false,

    refOrg: [],
    refGrup: [],

    dataset_nama: '',
    dataset_sumber: '',
    dataset_cakupan: '',
    org_id: '',
    grup_id: ''
  }),

  methods: {
    async openModal() {
      this.refOrg = await getRef.Organisasi()
      this.refGrup = await getRef.Grup()
      this.ModalAdd = true
    },

    closeModal() {
      this.ModalAdd = false
    },

    async add() {
      this.btnLoading = false

      const data = {
        dataset_nama: this.dataset_nama,
        dataset_sumber: this.dataset_sumber,
        dataset_cakupan: this.dataset_cakupan,
        org_id: this.org_id,
        grup_id: this.grup_id
      }

      const url = process.env.VUE_APP_API_BASE + 'dataset'
      this.http
        .post(url, data)
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
      this.dataset_email = value
      this.urlImage = URL.createObjectURL(this.dataset_email)
      console.log(value)
    }
  }
}
</script>
