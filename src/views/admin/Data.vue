<template>
  <div>
    <div>
      <v-card outlined class="py-3 px-5 mb-5 elevation-2">
        <v-row no-gutters>
          <h3 class="my-auto">Daftar Data</h3>
          <v-spacer></v-spacer>
          <CModalAdd />
        </v-row>
      </v-card>
    </div>

    <div>
      <v-alert v-model="alertBerhasil" type="success" dense dismissible>
        {{ alertMassage }}
      </v-alert>
      <v-alert v-model="alertGagal" type="error" dense dismissible>
        {{ alertMassage }}
      </v-alert>
    </div>

    <v-data-table :headers="headers" :items="datas" item-key="name" class="elevation-1">
      <template v-slot:top>
        <CModalView />
        <CModalEdit />
        <CModalDelete />
      </template>
      <template v-slot:[`item.nomor`]="{ item }">
        {{
          datas
            .map(function(x) {
              return x.data_id
            })
            .indexOf(item.data_id) + 1
        }}
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-icon small class="mr-1" @click="viewItem(item)">
          mdi-archive
        </v-icon>
        <v-icon small class="mr-1" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Cookie from '@/helper/cookie.js'

import CModalAdd from '@/components/admin/data/modalAdd'
import CModalEdit from '@/components/admin/data/modalEdit'
import CModalDelete from '@/components/admin/data/modalDelete'
import CModalView from '@/components/admin/data/modalView'

import modalView from '@/store/data/modalView'
import modalEdit from '@/store/data/modalEdit'
import modalHapus from '@/store/data/modalHapus'
import refreshView from '@/store/data/viewData'

export default {
  components: {
    CModalAdd,
    CModalEdit,
    CModalDelete,
    CModalView
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
      this.getData()
      setTimeout(() => {
        this.alertGagal = false
        this.alertBerhasil = false
      }, 5000)
    }
  },

  data: () => ({
    session: '',

    datas: [],
    data: {},

    viewIndex: '',
    editedIndex: '',
    dleteIndex: '',

    headers: [
      { text: 'Nomor', value: 'nomor', width: '50px', align: 'center', sortable: false },
      { text: 'Nama Data', align: 'start', value: 'data_nama' },
      { text: 'Tahun', align: 'start', value: 'data_tahun' },
      { text: 'Dataset', align: 'start', value: 'dataset_nama' },
      { text: 'Action', value: 'action', width: '100px' }
    ]
  }),

  async mounted() {
    this.session = await JSON.parse(Cookie.dec(Cookie.get('myCookie')))
    this.getData()
  },

  methods: {
    getData() {
      this.http
        .get(process.env.VUE_APP_API_BASE + 'data/admin/getdata', {
          headers: {
            Authorization: 'Bearer ' + this.session.token
          }
        })
        .then(res => {
          refreshView.commit('refreshData', false)
          this.datas = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },

    viewItem(item) {
      this.viewIndex = this.datas.indexOf(item)
      this.data = Object.assign({}, item)
      modalView.commit('toggleModal', true)
      modalView.commit('viewModal', Object.assign({}, item))
    },

    editItem(item) {
      this.editedIndex = this.datas.indexOf(item)
      this.data = Object.assign({}, item)
      modalEdit.commit('toggleModal', true)
      modalEdit.commit('viewModal', Object.assign({}, item))
    },

    deleteItem(item) {
      this.dleteIndex = this.datas.indexOf(item)
      this.data = Object.assign({}, item)
      modalHapus.commit('toggleModal', true)
      modalHapus.commit('viewModal', Object.assign({}, item))
    }
  }
}
</script>
