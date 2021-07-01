<template>
  <v-dialog v-model="modalEdit" :width="CWidth">
    <v-card>
      <v-toolbar dark color="primary" dense flat>
        <v-toolbar-title class="subtitle-1">Edit Data Organisasi</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="closeModal()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form ref="form">
        <div class="px-5 py-5">
          <!-- Nama Organisasi -->
          <v-col cols="12" class="mb-n8">
            <span class="subtitle-2">Nama Organisasi</span>
            <v-text-field dense flat outlined class="mt-2" v-model="editedItem.org_nama"></v-text-field>
          </v-col>

          <!-- Detail Organisasi -->
          <v-col cols="12" class="mb-n8">
            <span class="subtitle-2">Detail Organisasi</span>
            <v-textarea dense flat outlined class="mt-2" v-model="editedItem.org_ket"></v-textarea>
          </v-col>

          <!-- Preview -->
          <v-col cols="12">
            <span class="subtitle-2">Foto Organisasi</span>
            <v-img :src="getIMG(editedItem.org_foto)" max-width="200"></v-img>
          </v-col>

          <!-- Foto -->
          <v-col cols="12" class="mb-n8">
            <span class="subtitle-2">Unggah Foto Baru</span>
            <v-file-input dense flat outlined prepend-icon accept="image/png, image/jpeg, image/bmp" placeholder="Pilih Foto Organisasi" append-icon="mdi-camera" @change="onFile" ref="avatar"></v-file-input>
          </v-col>

          <!-- Preview -->
          <v-col cols="12">
            <v-img :src="urlImage" max-width="200"></v-img>
          </v-col>

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

import modalEdit from '@/store/organisasi/modalEdit'
import refreshView from '@/store/organisasi/viewOrganisasi'

export default {
  created() {
    if (this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm') {
      this.CWidth = '100%'
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
        return modalEdit.state.organisasi
      },
      set(value) {
        console.log(value)
      }
    }
  },

  watch: {
    async modalEdit() {
      this.session = await JSON.parse(Cookie.dec(Cookie.get('myCookie')))
    }
  },

  data: () => ({
    session: '',
    btnLoading: true,
    CWidth: '70%',

    org_foto: '',
    urlImage: ''
  }),

  methods: {
    getIMG(value) {
      if (value) {
        return process.env.VUE_APP_API_BASE + 'upload/organisasiGambar/' + value
      } else {
        return process.env.VUE_APP_API_BASE + 'upload/organisasiGambar/default.svg'
      }
    },

    async edit() {
      this.btnLoading = false

      const data = new FormData()
      data.append('org_id', this.editedItem.org_id)
      data.append('org_nama', this.editedItem.org_nama)
      data.append('org_ket', this.editedItem.org_ket)
      data.append('org_foto', this.org_foto)

      const url = process.env.VUE_APP_API_BASE + 'organisasi'
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
      this.org_foto = value
      this.urlImage = URL.createObjectURL(this.org_foto)
    },

    closeModal() {
      this.modalEdit = false
    }
  }
}
</script>
