<template>
  <v-dialog v-model="modalHapus" max-width="50%">
    <v-card>
      <v-toolbar dark color="primary" dense flat>
        <v-toolbar-title class="subtitle-1">Hapus Data Grup</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="closeModal()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form ref="form">
        <div class="px-5 py-5">
          <v-col cols="12" class="mb-n5">
            <h3>Apakah Anda Yakin Menghapus Data Ini?</h3>
          </v-col>

          <v-col cols="12">
            <span>Data yang telah dihapus tidak akan bisa dikembalikan!</span>
          </v-col>

          <hr />
          <div class="text-right mr-5 mt-5">
            <v-btn class="mr-2" v-if="btnLoading" color="error" depressed @click="hapus()">Ya</v-btn>
            <v-btn class="mr-2" v-else color="error" depressed loading>Ya</v-btn>
            <v-btn class="black--text" color="secondary" @click="closeModal()" depressed light>Tidak</v-btn>
          </div>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import Cookie from '@/helper/cookie.js'

import modalHapus from '@/store/grup/modalHapus'
import refreshView from '@/store/grup/viewGrup'

export default {
  computed: {
    modalHapus: {
      get() {
        return modalHapus.state.modalHapus
      },
      set(value) {
        modalHapus.commit('toggleModal', value)
      }
    },
    hapusItem: {
      get() {
        return modalHapus.state.grup
      },
      set(value) {
        console.log(value)
      }
    }
  },

  watch: {
    async modalHapus() {
      this.session = await JSON.parse(Cookie.dec(Cookie.get('myCookie')))
    }
  },

  data: () => ({
    session: '',
    btnLoading: true
  }),

  methods: {
    async hapus() {
      this.btnLoading = false

      const url = process.env.VUE_APP_API_BASE + 'grup/' + this.hapusItem.grup_id
      this.http
        .delete(url, {
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

    closeModal() {
      this.modalHapus = false
    }
  }
}
</script>
