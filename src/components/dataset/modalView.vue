<template>
  <v-dialog v-model="modalView" max-width="50%">
    <v-card>
      <v-toolbar dark color="primary" dense flat>
        <v-toolbar-title class="subtitle-1">Detail dataset</v-toolbar-title>
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
              <v-text-field dense flat outlined class="mt-2" v-model="viewItem.dataset_nama" readonly></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Sumber Dataset -->
            <v-col cols="12" class="mb-n10">
              <span class="subtitle-2">Sumber Dataset</span>
              <v-text-field dense flat outlined class="mt-2" v-model="viewItem.dataset_sumber" readonly></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Cakupan Dataset -->
            <v-col cols="12" class="mb-n10">
              <span class="subtitle-2">Cakupan Dataset</span>
              <v-text-field dense flat outlined class="mt-2" v-model="viewItem.dataset_cakupan" readonly></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Deskripsi Dataset -->
            <v-col cols="12" class="mb-n10">
              <span class="subtitle-2">Deskripsi Dataset</span>
              <v-text-field dense flat outlined class="mt-2" v-model="viewItem.dataset_deskripsi"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Organisasi -->
            <v-col cols="12" class="mb-n10">
              <span class="subtitle-2">Organisasi</span>
              <v-autocomplete v-model="viewItem.org_id" :items="refOrg" item-text="org_nama" item-value="org_id" outlined dense readonly> </v-autocomplete>
            </v-col>
          </v-row>

          <v-row>
            <!-- Grup -->
            <v-col cols="12">
              <span class="subtitle-2">Grup</span>
              <v-autocomplete v-model="viewItem.grup_id" :items="refGrup" item-text="grup_nama" item-value="grup_id" outlined dense readonly> </v-autocomplete>
            </v-col>
          </v-row>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import modalView from '@/store/dataset/modalView'
import getRef from '@/helper/getRef.js'

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
        return modalView.state.dataset
      },
      set(value) {
        console.log(value)
      }
    }
  },

  watch: {
    async modalView() {
      this.refOrg = await getRef.Organisasi()
      this.refGrup = await getRef.Grup()
    }
  },

  data: () => ({
    refOrg: [],
    refGrup: []
  }),

  methods: {
    closeModal() {
      this.modalView = false
    }
  }
}
</script>
