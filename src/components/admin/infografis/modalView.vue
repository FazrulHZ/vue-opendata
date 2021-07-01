<template>
  <v-dialog v-model="modalView" :width="CWidth">
    <v-card>
      <v-toolbar dark color="primary" dense flat>
        <v-toolbar-title class="subtitle-1">Detail Infografis</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="closeModal()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form ref="form">
        <div class="px-5 py-5">
          <v-row>
            <v-col cols="12" md="6" class="my-auto">
              <v-col cols="12">
                <v-card class="d-flex align-center justify-center" outlined height="400" style="overflow-y: scroll">
                  <div>
                    <v-img :src="getIMG(viewItem.infografis_foto)" max-width="380"></v-img>
                  </div>
                </v-card>
              </v-col>
            </v-col>

            <v-col cols="12" md="6">
              <!-- Nama Infografis -->
              <v-col cols="12" class="mb-n8">
                <span class="subtitle-2">Nama Infografis</span>
                <v-text-field dense flat outlined class="mt-2" v-model="viewItem.infografis_nama" readonly></v-text-field>
              </v-col>

              <!-- Deskripsi Infografis -->
              <v-col cols="12">
                <span class="subtitle-2">Deskripsi Infografis</span>
                <v-textarea dense flat outlined class="mt-2" v-model="viewItem.infografis_deskripsi" readonly></v-textarea>
              </v-col>
            </v-col>
          </v-row>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import modalView from '@/store/infografis/modalView'

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
        return modalView.state.infografis
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
        return process.env.VUE_APP_API_BASE + 'upload/infografisGambar/' + value
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
