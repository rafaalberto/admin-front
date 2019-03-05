<template>
   <div>
    <h3 class="title">Cadastro de Usuários</h3>
        <div class="btn-new">
            <router-link :to="{name: 'userForm', params: { id: 0 }}" class="btn btn-primary">
                <i class="fa fa-file"><span class="text-font">&nbsp;&nbsp;Novo</span></i>
            </router-link>
        </div>
    <br>
    <div class="box box-default">
         <div class="box-header with-border">
            <h3 class="box-title gray-color">
               <i class="fa fa-search"></i> &nbsp;Pesquisa
            </h3>
         </div>
         <div class="box-body">
            <div class="row">
               <div class="col-md-3">
                  <label>Usuário</label>
                  <input type="text" class="form-control" ref="username">
               </div>
               <div class="col-md-3">
                  <label>Nome</label>
                  <input type="text" class="form-control">
               </div>
               <div class="col-md-3">
                  <label>Perfil</label>
                  <select class="form-control">
                     <option value="">Selecione...</option>
                  </select>
               </div>
            </div>
         </div>
         <div class="box-footer text-center">
            <button type="button" class="btn btn-primary"><i class="fa fa-search"></i>&nbsp;Pesquisar</button>
         </div>
      </div>
      <div class="box box-default">
         <div class="box-header with-border">
            <h3 class="box-title gray-color">
               <i class="fa fa-table"></i> &nbsp;Lista
            </h3>
         </div>
         <div class="box-body table-responsive">
            <b-table responsive striped bordered :items="users" :fields="fields">
               <template slot="edit" slot-scope="data">
                  <div class="text-center-align">
                     <router-link :to="{name: 'userForm', params: { id: data.item.id }}" class="mr-2 btn btn-primary">
                        <i class="fa fa-pencil"></i>
                     </router-link>
                  </div>
               </template>
               <template slot="delete" slot-scope="data">
                  <div class="text-center-align">
                     <b-button class="mr-2 btn btn-default" @click="openDeleteModal(data.item)"><i class="fa fa-remove"></i></b-button>
                  </div>
               </template>
            </b-table>
            <div class="text-right">
                <b-pagination align="right" aria-label="Pagination" v-model="currentPage" 
                :total-rows="totalElements" :per-page="size"></b-pagination>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
import axios from 'axios'
import { baseApiUrl, showError } from '@/global'
import { mapState } from 'vuex'

export default {
    name: 'UserIndex',
    computed: mapState(['user']),
    data() {
        return {
            users: [],
            currentPage: 1,
            size: 5,
            totalElements: 0,
            fields: [
                { key: 'id', label: 'ID', sortable: true, thStyle: 'width: 15%' },
                { key: 'username', label: 'Usuário', sortable: true, thStyle: 'width: 30%' },
                { key: 'name', label: 'Nome', sortable: true, thStyle: 'width: 35%' },
                { key: 'profile', label: 'Perfil', sortable: true,
                    formatter: value => value === 'ROLE_ADMIN' ? 'Administrador' : 'Usuário',
                    thStyle: 'width: 20%' },
                { key: 'edit', label: 'Editar', thStyle: 'text-align: center; width: 5%' },
                { key: 'delete', label: 'Excluir', thStyle: 'text-align: center; width: 5%' }
            ]
        }
    },
    methods: {
        fetchUsers() {
            const page = this.currentPage - 1
            const url = `${baseApiUrl}/users?page=${page}&size=${this.size}`
            axios.get(url)
                .then(response => {
                    this.users = response.data.content
                    this.totalElements = response.data.totalElements
                })
                .catch(showError)
        },
        remove(item) {
            const userSession = this.user
            if(userSession.username === item.username){
                this.$toasted.global.defaultError({ msg: 'Usuário logado não pode ser excluído!' })
                return
            }
            const id = item.id
            axios.delete(`${baseApiUrl}/users/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.fetchUsers()
                })
                .catch(showError)
        },
        openDeleteModal(item) {
            this.$bus.$emit('modal-open', {
            title: 'Exclusão',
            description: 'Deseja realmente excluir este registro?',
            type: 'modal-primary',
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            confirmBefore: ()=> {},
            confirmAfter: () => {
               this.remove(item)
            },
            cancelBefore: () => {},
            cancelAfter: () => {},
            clickOverlay: () => {}
            })
        },
    },
    mounted() {
        this.fetchUsers()
        this.$refs.username.focus()
    },
    watch: {
        currentPage() {
            this.fetchUsers()
        }
    }
}
</script>

<style lang="css"></style>
