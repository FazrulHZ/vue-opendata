<template>
  <v-dialog v-model="modalView" :max-width="dekstop">
    <v-card>
      <v-toolbar dark color="primary" dense flat>
        <v-toolbar-title class="subtitle-1">Detail Data</v-toolbar-title>
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
              <span class="subtitle-2">Dataset</span>
              <v-text-field v-model="viewItem.dataset_nama" outlined dense readonly> </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Nama Data -->
            <v-col cols="12" md="10" class="mb-n10">
              <span class="subtitle-2">Nama Data</span>
              <v-text-field dense flat outlined class="mt-2" v-model="viewItem.data_nama" readonly></v-text-field>
            </v-col>

            <!-- Tahun Data -->
            <v-col cols="12" md="2" class="mb-n10">
              <span class="subtitle-2">Tahun Data</span>
              <v-text-field dense flat outlined class="mt-2" v-model="viewItem.data_tahun" readonly></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Keterangan Data -->
            <v-col cols="12">
              <span class="subtitle-2">Keterangan Data</span>
              <v-textarea dense flat outlined class="mt-2" v-model="viewItem.data_ket" readonly></v-textarea>
            </v-col>
          </v-row>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import modalView from '@/store/data/modalView'

export default {
  created() {
    if (this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm') {
      this.dekstop = '100%'
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
        return modalView.state.data
      },
      set(value) {
        console.log(value)
      }
    }
  },

  data: () => ({
    dekstop: '80%'
  }),

  methods: {
    closeModal() {
      this.modalView = false
    }
  }
}
</script>
