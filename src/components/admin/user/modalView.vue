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
            <!-- Foto user -->
            <v-col cols="12" class="text-center mb-n5">
              <v-avatar size="200">
                <v-img :src="getIMG(viewItem.user_foto)"></v-img>
              </v-avatar>
            </v-col>
          </v-row>

          <v-row>
            <!-- Nama Lengkap -->
            <v-col cols="12" class="mb-n10">
              <span class="subtitle-2">Nama Lengkap</span>
              <v-text-field v-model="viewItem.user_fullname" dense flat outlined class="mt-2" readonly></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Username -->
            <v-col cols="4" class="mb-n10">
              <span class="subtitle-2">Username</span>
              <v-text-field v-model="viewItem.user_nama" dense flat outlined class="mt-2" readonly></v-text-field>
            </v-col>

            <!-- Email -->
            <v-col cols="8" class="mb-n10">
              <span class="subtitle-2">Email</span>
              <v-text-field v-model="viewItem.user_email" dense flat outlined class="mt-2" readonly></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Usel Level -->
            <v-col cols="12" class="mb-n8">
              <span class="subtitle-2">Usel Level</span>
              <v-select v-model="viewItem.user_lvl" :items="refLevel" item-text="nama" item-value="id" outlined dense readonly> </v-select>
            </v-col>
          </v-row>

          <v-row>
            <!-- Organisasi -->
            <v-col cols="12">
              <span class="subtitle-2">Organisasi</span>
              <v-text-field v-model="viewItem.org_nama" outlined dense readonly> </v-text-field>
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
    refOrg: [],
    refLevel: [
      {
        id: 'superadmin',
        nama: 'Super Admin'
      },

      {
        id: 'admin',
        nama: 'Admin'
      }
    ]
  }),

  methods: {
    getIMG(value) {
      if (value) {
        return process.env.VUE_APP_API_BASE + 'upload/userGambar/' + value
      } else {
        return process.env.VUE_APP_API_BASE + 'upload/userGambar/default.png'
      }
    },

    closeModal() {
      this.modalView = false
    }
  }
}
</script>
