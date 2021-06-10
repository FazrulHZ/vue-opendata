<template>
  <v-dialog v-model="ModalAdd" max-width="50%">
    <template v-slot:activator="{ on: modal, attrs }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn small fab text v-bind="attrs" v-on="{ ...tooltip, ...modal }">
            <v-icon>mdi-plus-box</v-icon>
          </v-btn>
        </template>
        <span>Tambah Data</span>
      </v-tooltip>
    </template>

    <v-card>
      <v-toolbar dark color="primary" dense flat>
        <v-toolbar-title class="subtitle-1">Tambah Organisasi</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="ModalAdd = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form ref="form">
        <div class="ml-5 mr-5 mt-5">
          <!-- Nama Organisasi -->
          <v-col cols="12" class="mb-n8">
            <span class="subtitle-2">Nama Organisasi</span>
            <v-text-field dense flat outlined class="mt-2" v-model="org_nama"></v-text-field>
          </v-col>

          <!-- Detail Organisasi -->
          <v-col cols="12" class="mb-n8">
            <span class="subtitle-2">Detail Organisasi</span>
            <v-textarea dense flat outlined class="mt-2" v-model="org_ket"></v-textarea>
          </v-col>

          <!-- Foto -->
          <v-col cols="12" class="mb-n8">
            <span class="subtitle-2">Foto</span>
            <v-file-input dense flat outlined prepend-icon accept="image/png, image/jpeg, image/bmp" placeholder="Pilih Foto Organisasi" append-icon="mdi-camera" @change="onFile" ref="avatar"></v-file-input>
          </v-col>

          <!-- Preview -->
          <v-col cols="12">
            <v-img :src="urlImage" max-width="200"></v-img>
          </v-col>

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
import refreshView from '@/store/organisasi/viewOrganisasi'
export default {
  data: () => ({
    ModalAdd: false,
    btnLoading: true,

    org_nama: '',
    org_ket: '',
    org_foto: '',
    urlImage: ''
  }),

  methods: {
    async add() {
      this.btnLoading = false

      const data = new FormData()
      data.append('org_nama', this.org_nama)
      data.append('org_ket', this.org_ket)
      data.append('org_foto', this.org_foto)

      const url = process.env.VUE_APP_API_BASE + 'organisasi'
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
      this.org_foto = value
      this.urlImage = URL.createObjectURL(this.org_foto)
    },

    closeModal() {
      this.ModalAdd = false
    }
  }
}
</script>
