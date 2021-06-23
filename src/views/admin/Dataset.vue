<template>
  <div>
    <div>
      <v-card outlined class="py-3 px-5 mb-5 elevation-2">
        <v-row no-gutters>
          <h3 class="my-auto">Daftar Dataset</h3>
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

    <v-data-table :headers="headers" :items="datasets" item-key="name" class="elevation-1">
      <template v-slot:top>
        <CModalView />
        <CModalEdit />
        <CModalDelete />
      </template>
      <template v-slot:[`item.nomor`]="{ item }">
        {{
          datasets
            .map(function(x) {
              return x.dataset_id
            })
            .indexOf(item.dataset_id) + 1
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

import CModalAdd from '@/components/admin/dataset/modalAdd'
import CModalEdit from '@/components/admin/dataset/modalEdit'
import CModalDelete from '@/components/admin/dataset/modalDelete'
import CModalView from '@/components/admin/dataset/modalView'

import modalView from '@/store/dataset/modalView'
import modalEdit from '@/store/dataset/modalEdit'
import modalHapus from '@/store/dataset/modalHapus'
import refreshView from '@/store/dataset/viewDataset'

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

    datasets: [],
    dataset: {},

    viewIndex: '',
    editedIndex: '',
    dleteIndex: '',

    headers: [
      { text: 'Nomor', value: 'nomor', width: '50px', align: 'center', sortable: false },
      { text: 'Nama Dataset', align: 'start', value: 'dataset_nama' },
      { text: 'Organisasi', align: 'start', value: 'org_nama' },
      { text: 'Grup', align: 'start', value: 'grup_nama' },
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
        .get(process.env.VUE_APP_API_BASE + 'dataset/admin/getdata', {
          headers: {
            Authorization: 'Bearer ' + this.session.token
          }
        })
        .then(res => {
          refreshView.commit('refreshData', false)
          this.datasets = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },

    viewItem(item) {
      this.viewIndex = this.datasets.indexOf(item)
      this.dataset = Object.assign({}, item)
      modalView.commit('toggleModal', true)
      modalView.commit('viewModal', Object.assign({}, item))
    },

    editItem(item) {
      this.editedIndex = this.datasets.indexOf(item)
      this.dataset = Object.assign({}, item)
      modalEdit.commit('toggleModal', true)
      modalEdit.commit('viewModal', Object.assign({}, item))
    },

    deleteItem(item) {
      this.dleteIndex = this.datasets.indexOf(item)
      this.dataset = Object.assign({}, item)
      modalHapus.commit('toggleModal', true)
      modalHapus.commit('viewModal', Object.assign({}, item))
    }
  }
}
</script>
