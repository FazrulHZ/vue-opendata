<template>
  <v-container fill-height fluid style="background: #F5F5F5;">
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" class="hidden-sm-and-down pa-6">
        <v-img src="@/assets/img/login.svg"></v-img>
      </v-col>
      <v-col cols="12" md="4">
        <v-card elevation="15">
          <v-card-text>
            <div class="ma-3">
              <p class="text-center" style="font-size:35px; color: #3c8dbc">
                <span class="font-weight-thin">OPEN </span>
                <span>Data</span>
              </p>
              <div class="text-center">
                Kota Gorontalo
              </div>
            </div>
            <v-divider></v-divider>
            <div class="mt-5 mb-5">
              <v-alert dense dismissible type="error" v-model="alertGagal">
                {{ pesanGagal }}
              </v-alert>
              <h3>LOGIN</h3>
            </div>
            <v-form ref="form">
              <div>
                <v-text-field v-model="user" outlined label="Username Atau Email" append-icon="mdi-account" :rules="userRules" autocomplete="off"></v-text-field>

                <v-text-field
                  v-model="user_password"
                  label="Password"
                  outlined
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  class="input-group--focused"
                  @click:append="show = !show"
                  :rules="passwordRules"
                  autocomplete="off"
                ></v-text-field>
              </div>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn v-if="loadingButton" class="mb-5" rounded large block outlined color="primary" @click="login()">
              Login
            </v-btn>
            <v-btn v-else class="mb-5" rounded large block outlined color="primary" loading>Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Cookie from '@/helper/cookie.js'

export default {
  data: () => ({
    valid: true,
    loadingButton: true,
    alertGagal: false,
    pesanGagal: '',
    show: false,

    user: '',
    userRules: [value => !!value || 'Username Atau Email Tidak Boleh Kosong'],

    user_password: '',
    passwordRules: [value => !!value || 'Password Tidak Boleh Kosong']
  }),
  methods: {
    validate() {
      return this.$refs.form.validate()
    },
    async login() {
      this.loadingButton = false
      this.validate()
      const url = process.env.VUE_APP_API_BASE + 'login'
      if (this.validate()) {
        const data = {
          user: this.user,
          user_password: this.user_password
        }
        try {
          const response = await this.http.post(url, data)
          if (response.data.success) {
            await Cookie.set(
              'myCookie',
              Cookie.enc(
                JSON.stringify({
                  session_ok: response.data.success,
                  user_nama: response.data.data.identitas.user_nama,
                  user_fullname: response.data.data.identitas.user_fullname,
                  user_foto: response.data.data.identitas.user_foto,
                  user_lvl: response.data.data.identitas.user_lvl,
                  token: response.data.data.token
                })
              )
            )
            this.alertGagal = false
            this.$router.push('/admin')
            this.loadingButton = true
          }
        } catch (error) {
          console.log(error)
          this.pesanGagal = error.response.data.message
          this.alertGagal = true
          this.loadingButton = true
          window.scrollTo(0, 0)
        }
      } else {
        this.loadingButton = true
      }
    }
  }
}
</script>
