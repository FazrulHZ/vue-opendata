<template>
  <div>
    <div>
      <v-card outlined class="py-3 px-5 mb-5 elevation-2">
        <v-row no-gutters>
          <h3 class="my-auto">Daftar Infografis</h3>
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

    <v-data-table :headers="headers" :items="infografiss" item-key="name" class="elevation-1">
      <template v-slot:top>
        <CModalView />
        <CModalEdit />
        <CModalDelete />
      </template>
      <template v-slot:[`item.nomor`]="{ item }">
        {{
          infografiss
            .map(function(x) {
              return x.infografis_id
            })
            .indexOf(item.infografis_id) + 1
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
import CModalAdd from '@/components/admin/infografis/modalAdd'
import CModalEdit from '@/components/admin/infografis/modalEdit'
import CModalDelete from '@/components/admin/infografis/modalDelete'
import CModalView from '@/components/admin/infografis/modalView'

import modalView from '@/store/infografis/modalView'
import modalEdit from '@/store/infografis/modalEdit'
import modalHapus from '@/store/infografis/modalHapus'
import refreshView from '@/store/infografis/viewInfografis'

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
    infografiss: [],
    infografis: {},

    viewIndex: '',
    editedIndex: '',
    dleteIndex: '',

    headers: [
      { text: 'Nomor', value: 'nomor', width: '50px', align: 'center', sortable: false },
      { text: 'Nama infografis', align: 'start', value: 'infografis_nama', width: '210px' },
      { text: 'Deskripsi infografis', align: 'start', value: 'infografis_deskripsi' },
      { text: 'Action', value: 'action', width: '100px' }
    ]
  }),

  mounted() {
    this.getData()
  },

  methods: {
    getData() {
      this.http
        .get(process.env.VUE_APP_API_BASE + 'infografis')
        .then(res => {
          refreshView.commit('refreshData', false)
          this.infografiss = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },

    viewItem(item) {
      this.viewIndex = this.infografiss.indexOf(item)
      this.infografis = Object.assign({}, item)
      modalView.commit('toggleModal', true)
      modalView.commit('viewModal', Object.assign({}, item))
    },

    editItem(item) {
      this.editedIndex = this.infografiss.indexOf(item)
      this.infografis = Object.assign({}, item)
      modalEdit.commit('toggleModal', true)
      modalEdit.commit('viewModal', Object.assign({}, item))
    },

    deleteItem(item) {
      this.dleteIndex = this.infografiss.indexOf(item)
      this.infografis = Object.assign({}, item)
      modalHapus.commit('toggleModal', true)
      modalHapus.commit('viewModal', Object.assign({}, item))
    }
  }
}
</script>
