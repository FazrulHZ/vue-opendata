<template>
  <div>
    <div>
      <v-alert v-model="alertBerhasil" type="success" dense dismissible>
        {{ alertMassage }}
      </v-alert>
      <v-alert v-model="alertGagal" type="error" dense dismissible>
        {{ alertMassage }}
      </v-alert>
    </div>

    <v-row>
      <v-col cols="12" md="5">
        <v-card class="pa-5">
          <div class="text-right">
            <CModalEdit />
          </div>

          <div class="text-center">
            <v-avatar size="200">
              <img :src="getIMG(user.user_foto)" alt="..." style="border: 1px solid #CCC; object-fit: cover;" />
            </v-avatar>
          </div>

          <div class="text-center mt-2 font-weight-black">
            {{ user.user_fullname.toUpperCase() }}
          </div>

          <v-divider class="ma-2"></v-divider>
          <div class="pa-2">
            <v-card outlined>
              <v-card-text>
                <div class="pa-2">
                  <b>Username</b><br />
                  <span>{{ user.user_nama }}</span>
                </div>

                <v-divider></v-divider>
                <div class="pa-2">
                  <b>E-mail</b><br />
                  <span>{{ user.user_email }}</span>
                </div>

                <v-divider></v-divider>
                <div class="pa-2">
                  <b>User Level</b> <br />
                  <span>{{ user.user_lvl.toUpperCase() }}</span>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="7">
        <v-card class="pa-5">
          <div>
            Organisasi Tempat Tugas
          </div>

          <hr class="my-2" />

          <div>
            <v-img :src="orgIMG(user.org_foto)" max-height="260"></v-img>
          </div>

          <div class="mt-5">
            <h3>{{ user.org_nama }}</h3>
          </div>

          <div class="mt-3">
            <span>{{ user.org_ket }}</span>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Cookie from '@/helper/cookie.js'
import refreshView from '@/store/profil/viewProfil'

import CModalEdit from '@/components/admin/profil/modalEdit'

export default {
  components: {
    CModalEdit
  },

  computed: {
    refresh: {
      get() {
        return refreshView.state.Refresh
      }
    },

    alertMassage: {
      get() {
        return refreshView.state.alertMassage
      }
    },

    success: {
      get() {
        return refreshView.state.success
      },
      set(value) {
        refreshView.commit('alert', value)
      }
    },

    alertBerhasil: {
      get() {
        return refreshView.state.alertBerhasil
      },
      set(value) {
        refreshView.commit('berhasilAlert', value)
      }
    },

    alertGagal: {
      get() {
        return refreshView.state.alertGagal
      },
      set(value) {
        refreshView.commit('gagalAlert', value)
      }
    }
  },

  watch: {
    refresh() {
      window.scrollTo(0, 0)
      this.getData()
      setTimeout(() => {
        this.alertGagal = false
        this.alertBerhasil = false
      }, 5000)
    }
  },

  data: () => ({
    session: '',

    user: {}
  }),

  async mounted() {
    this.session = await JSON.parse(Cookie.dec(Cookie.get('myCookie')))
    this.getData()
  },

  methods: {
    getIMG(value) {
      if (value) {
        return process.env.VUE_APP_API_BASE + 'upload/userGambar/' + value
      } else {
        return process.env.VUE_APP_API_BASE + 'upload/userGambar/default.png'
      }
    },

    orgIMG(value) {
      if (value) {
        return process.env.VUE_APP_API_BASE + 'upload/organisasiGambar/' + value
      } else {
        return process.env.VUE_APP_API_BASE + 'upload/organisasiGambar/default.svg'
      }
    },

    getData() {
      this.http
        .get(process.env.VUE_APP_API_BASE + 'users/' + this.session.user_nama, {
          headers: {
            Authorization: 'Bearer ' + this.session.token
          }
        })
        .then(res => {
          refreshView.commit('refreshData', false)
          this.user = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
