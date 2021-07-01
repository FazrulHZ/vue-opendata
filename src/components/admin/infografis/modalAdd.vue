<template>
  <v-dialog v-model="ModalAdd" :width="CWidth">
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
        <v-toolbar-title class="subtitle-1">Tambah Infografis</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="closeModal()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form ref="form">
        <div class="ml-5 mr-5 mt-5">
          <v-row>
            <v-col cols="12" md="6" class="my-auto">
              <v-col cols="12" v-if="!urlImage">
                <v-card class="d-flex align-center justify-center pa-5" outlined height="400">
                  <div>
                    <v-icon>mdi-image</v-icon>
                    <span>Preview Image</span>
                  </div>
                </v-card>
              </v-col>

              <v-col cols="12" v-else>
                <v-card class="d-flex align-center justify-center" outlined height="400" style="overflow-y: scroll">
                  <div>
                    <v-img :src="urlImage" max-width="380"></v-img>
                  </div>
                </v-card>
              </v-col>
            </v-col>

            <v-col cols="12" md="6">
              <!-- Nama Infografis -->
              <v-col cols="12" class="mb-n8">
                <span class="subtitle-2">Nama Infografis</span>
                <v-text-field dense flat outlined class="mt-2" v-model="infografis_nama"></v-text-field>
              </v-col>

              <!-- Deskripsi Infografis -->
              <v-col cols="12" class="mb-n8">
                <span class="subtitle-2">Deskripsi Infografis</span>
                <v-textarea dense flat outlined class="mt-2" v-model="infografis_deskripsi"></v-textarea>
              </v-col>

              <!-- Gambar -->
              <v-col cols="12">
                <span class="subtitle-2">Gambar</span>
                <v-file-input dense flat outlined prepend-icon accept="image/png, image/jpeg, image/bmp" placeholder="Pilih Infografis" append-icon="mdi-camera" @change="onFile" ref="avatar"></v-file-input>
              </v-col>
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
import refreshView from '@/store/infografis/viewInfografis'
export default {
  created() {
    if (this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm') {
      this.CWidth = '100%'
    }
  },

  data: () => ({
    session: '',
    ModalAdd: false,
    btnLoading: true,
    CWidth: '70%',

    infografis_nama: '',
    infografis_foto: '',
    infografis_deskripsi: '',
    urlImage: ''
  }),

  methods: {
    default() {
      this.infografis_nama = ''
      this.infografis_foto = ''
      this.infografis_deskripsi = ''
      this.urlImage = ''
    },

    async openModal() {
      this.session = await JSON.parse(Cookie.dec(Cookie.get('myCookie')))
      this.ModalAdd = true
    },

    closeModal() {
      this.default()
      this.ModalAdd = false
    },

    async add() {
      this.btnLoading = false

      const data = new FormData()
      data.append('infografis_nama', this.infografis_nama)
      data.append('infografis_foto', this.infografis_foto)
      data.append('infografis_deskripsi', this.infografis_deskripsi)

      const url = process.env.VUE_APP_API_BASE + 'infografis'
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
          this.btnLoading = true
          this.default()
          this.closeModal()
        })
    },

    onFile(value) {
      this.infografis_foto = value
      this.urlImage = URL.createObjectURL(this.infografis_foto)
    }
  }
}
</script>
