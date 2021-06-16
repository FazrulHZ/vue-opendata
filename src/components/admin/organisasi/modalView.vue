<template>
  <v-dialog v-model="modalView" max-width="50%">
    <v-card>
      <v-toolbar dark color="primary" dense flat>
        <v-toolbar-title class="subtitle-1">Detail Organisasi</v-toolbar-title>
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
            <v-text-field dense flat outlined class="mt-2" v-model="viewItem.org_nama" readonly></v-text-field>
          </v-col>

          <!-- Detail Organisasi -->
          <v-col cols="12" class="mb-n8">
            <span class="subtitle-2">Detail Organisasi</span>
            <v-textarea dense flat outlined class="mt-2" v-model="viewItem.org_ket" readonly></v-textarea>
          </v-col>

          <!-- Preview -->
          <v-col cols="12">
            <span class="subtitle-2">Foto Organisasi</span>
            <v-img :src="getIMG(viewItem.org_foto)" max-width="200"></v-img>
          </v-col>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import modalView from '@/store/organisasi/modalView'

export default {
  computed: {
    modalView: {
      get() {
        return modalView.state.modalView
      },
      set(value) {
        modalView.commit('toggleModal', value)
      }
    },
    viewItem: {
      get() {
        return modalView.state.organisasi
      },
      set(value) {
        console.log(value)
      }
    }
  },

  data: () => ({}),

  methods: {
    getIMG(value) {
      if (value) {
        return process.env.VUE_APP_API_BASE + 'upload/organisasiGambar/' + value
      } else {
        return process.env.VUE_APP_API_BASE + 'upload/organisasiGambar/default.svg'
      }
    },

    closeModal() {
      this.modalView = false
    }
  }
}
</script>
