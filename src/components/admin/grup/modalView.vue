<template>
  <v-dialog v-model="modalView" :width="CWidth">
    <v-card>
      <v-toolbar dark color="primary" dense flat>
        <v-toolbar-title class="subtitle-1">Detail grup</v-toolbar-title>
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
            <v-text-field dense flat outlined class="mt-2" v-model="viewItem.grup_nama" readonly></v-text-field>
          </v-col>

          <!-- Deskripsi Grup -->
          <v-col cols="12" class="mb-n8">
            <span class="subtitle-2">Deskripsi Grup</span>
            <v-textarea dense flat outlined class="mt-2" v-model="viewItem.grup_deskripsi" readonly></v-textarea>
          </v-col>

          <!-- Preview -->
          <v-col cols="12">
            <span class="subtitle-2">Foto Grup</span>
            <v-img :src="getIMG(viewItem.grup_foto)" max-width="200"></v-img>
          </v-col>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import modalView from '@/store/grup/modalView'

export default {
  created() {
    if (this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm') {
      this.CWidth = '100%'
    }
  },

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
        return modalView.state.grup
      },
      set(value) {
        console.log(value)
      }
    }
  },

  data: () => ({
    CWidth: '70%'
  }),

  methods: {
    getIMG(value) {
      if (value) {
        return process.env.VUE_APP_API_BASE + 'upload/grupGambar/' + value
      } else {
        return process.env.VUE_APP_API_BASE + 'upload/grupGambar/default.jpg'
      }
    },

    closeModal() {
      this.modalView = false
    }
  }
}
</script>
