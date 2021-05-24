<template>
  <v-dialog v-model="modalView" max-width="50%">
    <v-card>
      <v-toolbar dark color="primary" dense flat>
        <v-toolbar-title class="subtitle-1">Detail user</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="closeModal()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form ref="form">
        <div class="px-5 py-5">
          <v-row>
            <!-- Nama Lengkap -->
            <v-col cols="12" class="mb-n10">
              <span class="subtitle-2">Nama Lengkap</span>
              <v-text-field dense flat outlined class="mt-2" v-model="viewItem.user_fullname" readonly></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Username -->
            <v-col cols="4" class="mb-n10">
              <span class="subtitle-2">Username</span>
              <v-text-field dense flat outlined class="mt-2" v-model="viewItem.user_nama" readonly></v-text-field>
            </v-col>

            <!-- Email -->
            <v-col cols="8" class="mb-n10">
              <span class="subtitle-2">Email</span>
              <v-text-field dense flat outlined class="mt-2" v-model="viewItem.user_email" readonly></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Organisasi -->
            <v-col cols="12">
              <span class="subtitle-2">Organisasi</span>
              <v-autocomplete v-model="viewItem.org_id" :items="refOrg" item-text="org_nama" item-value="org_id" outlined dense readonly> </v-autocomplete>
            </v-col>
          </v-row>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import modalView from '@/store/user/modalView'
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
        return modalView.state.user
      },
      set(value) {
        console.log(value)
      }
    }
  },

  watch: {
    async modalView() {
      this.refOrg = await getRef.Organisasi()
    }
  },

  data: () => ({
    refOrg: []
  }),

  methods: {
    closeModal() {
      this.modalView = false
    }
  }
}
</script>
