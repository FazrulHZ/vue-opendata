<template>
  <v-dialog v-model="modalEdit" max-width="50%">
    <v-card>
      <v-toolbar dark color="primary" dense flat>
        <v-toolbar-title class="subtitle-1">Edit Data user</v-toolbar-title>
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
              <v-text-field dense flat outlined class="mt-2" v-model="editedItem.user_fullname"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Username -->
            <v-col cols="4" class="mb-n10">
              <span class="subtitle-2">Username</span>
              <v-text-field dense flat outlined class="mt-2" v-model="editedItem.user_nama"></v-text-field>
            </v-col>

            <!-- Email -->
            <v-col cols="8" class="mb-n10">
              <span class="subtitle-2">Email</span>
              <v-text-field dense flat outlined class="mt-2" v-model="editedItem.user_email"></v-text-field>
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
              <v-autocomplete v-model="editedItem.org_id" :items="refOrg" item-text="org_nama" item-value="org_id" outlined dense> </v-autocomplete>
            </v-col>
          </v-row>

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
import modalEdit from '@/store/user/modalEdit'
import refreshView from '@/store/user/viewUser'
import getRef from '@/helper/getRef.js'

export default {
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
        return modalEdit.state.user
      },
      set(value) {
        console.log(value)
      }
    }
  },

  watch: {
    async modalEdit() {
      this.refOrg = await getRef.Organisasi()
    }
  },

  data: () => ({
    btnLoading: true,
    show: false,

    refOrg: [],

    user_password: ''
  }),

  methods: {
    async edit() {
      this.btnLoading = false

      const data = new FormData()
      data.append('user_id', this.editedItem.user_id)
      data.append('user_nama', this.editedItem.user_nama)
      data.append('user_email', this.editedItem.user_email)
      data.append('user_fullname', this.editedItem.user_fullname)
      data.append('user_password', this.user_password)
      data.append('org_id', this.editedItem.org_id)

      const url = process.env.VUE_APP_API_BASE + 'users'
      this.http
        .put(url, data)
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
      this.user_foto = value
      this.urlImage = URL.createObjectURL(this.user_foto)
    },

    closeModal() {
      this.modalEdit = false
    }
  }
}
</script>
