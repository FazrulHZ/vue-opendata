<template>
  <v-dialog v-model="modalEdit" :width="CWidth">
    <v-card>
      <v-toolbar dark color="primary" dense flat>
        <v-toolbar-title class="subtitle-1">Edit Data grup</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="closeModal()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form ref="form">
        <div class="px-5 py-5">
          <!-- Nama Grup -->
          <v-col cols="12" class="mb-n8">
            <span class="subtitle-2">Nama Grup</span>
            <v-text-field dense flat outlined class="mt-2" v-model="editedItem.grup_nama"></v-text-field>
          </v-col>

          <!-- Deskripsi Grup -->
          <v-col cols="12" class="mb-n8">
            <span class="subtitle-2">Deskripsi Grup</span>
            <v-textarea dense flat outlined class="mt-2" v-model="editedItem.grup_deskripsi"></v-textarea>
          </v-col>

          <!-- Preview -->
          <v-col cols="12">
            <span class="subtitle-2">Foto Grup</span>
            <v-img :src="getIMG(editedItem.grup_foto)" max-width="200"></v-img>
          </v-col>

          <!-- Foto -->
          <v-col cols="12" class="mb-n8">
            <span class="subtitle-2">Unggah Foto Baru</span>
            <v-file-input dense flat outlined prepend-icon accept="image/png, image/jpeg, image/bmp" placeholder="Pilih Foto grup" append-icon="mdi-camera" @change="onFile" ref="avatar"></v-file-input>
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

import modalEdit from '@/store/grup/modalEdit'
import refreshView from '@/store/grup/viewGrup'

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
        return modalEdit.state.grup
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

    grup_foto: '',
    urlImage: ''
  }),

  methods: {
    getIMG(value) {
      if (value) {
        return process.env.VUE_APP_API_BASE + 'upload/grupGambar/' + value
      } else {
        return process.env.VUE_APP_API_BASE + 'upload/grupGambar/default.jpg'
      }
    },

    async edit() {
      this.btnLoading = false

      const data = new FormData()
      data.append('grup_id', this.editedItem.grup_id)
      data.append('grup_nama', this.editedItem.grup_nama)
      data.append('grup_deskripsi', this.editedItem.grup_deskripsi)
      data.append('grup_foto', this.grup_foto)

      const url = process.env.VUE_APP_API_BASE + 'grup'
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
      this.grup_foto = value
      this.urlImage = URL.createObjectURL(this.grup_foto)
    },

    closeModal() {
      this.modalEdit = false
    }
  }
}
</script>
