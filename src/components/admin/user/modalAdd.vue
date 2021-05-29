<template>
  <v-dialog v-model="ModalAdd" max-width="50%">
    <template v-slot:activator="{ on: modal, attrs }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn small fab text v-bind="attrs" v-on="{ ...tooltip, ...modal }" @click="openModal()">
            <v-icon>mdi-plus-box</v-icon>
          </v-btn>
        </template>
        <span>Tambah Data</span>
      </v-tooltip>
    </template>

    <v-card>
      <v-toolbar dark color="primary" dense flat>
        <v-toolbar-title class="subtitle-1">Tambah User</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="closeModal()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form ref="form">
        <div class="ml-5 mr-5 mt-5">
          <v-row>
            <!-- Nama Lengkap -->
            <v-col cols="12" class="mb-n10">
              <span class="subtitle-2">Nama Lengkap</span>
              <v-text-field dense flat outlined class="mt-2" v-model="user_fullname"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Username -->
            <v-col cols="4" class="mb-n10">
              <span class="subtitle-2">Username</span>
              <v-text-field dense flat outlined class="mt-2" v-model="user_nama"></v-text-field>
            </v-col>

            <!-- Email -->
            <v-col cols="8" class="mb-n10">
              <span class="subtitle-2">Email</span>
              <v-text-field dense flat outlined class="mt-2" v-model="user_email"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- User Password -->
            <v-col cols="12" class="mb-n10">
              <span class="subtitle-2">User Password</span>
              <v-text-field dense flat outlined v-model="user_password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'" class="mt-2 input-group--focused" @click:append="show = !show"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Organisasi -->
            <v-col cols="12">
              <span class="subtitle-2">Organisasi</span>
              <v-autocomplete v-model="org_id" :items="refOrg" item-text="org_nama" item-value="org_id" outlined dense> </v-autocomplete>
            </v-col>
          </v-row>

          <hr />
          <div class="text-right mr-5 mt-5 pb-5">
            <v-btn v-if="btnLoading" small color="primary" depressed @click="add()">SIMPAN</v-btn>
            <v-btn v-else small color="primary" depressed loading>SIMPAN</v-btn>
          </div>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import refreshView from '@/store/user/viewUser'
import getRef from '@/helper/getRef.js'

export default {
  data: () => ({
    ModalAdd: false,
    btnLoading: true,
    show: false,

    refOrg: [],

    user_nama: '',
    user_email: '',
    user_fullname: '',
    user_password: '',
    org_id: ''
  }),

  methods: {
    async openModal() {
      this.refOrg = await getRef.Organisasi()
      this.ModalAdd = true
    },

    closeModal() {
      this.ModalAdd = false
    },

    async add() {
      this.btnLoading = false

      const data = new FormData()
      data.append('user_nama', this.user_nama)
      data.append('user_email', this.user_email)
      data.append('user_fullname', this.user_fullname)
      data.append('user_password', this.user_password)
      data.append('org_id', this.org_id)

      const url = process.env.VUE_APP_API_BASE + 'users'
      this.http
        .post(url, data)
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

    onFile(value) {
      this.user_email = value
      this.urlImage = URL.createObjectURL(this.user_email)
      console.log(value)
    }
  }
}
</script>
