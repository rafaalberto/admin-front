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
                  <label>Nome</label>
                  <input type="text" class="form-control custom-filter campo-pesquisa" data-field="nome">
               </div>
               <div class="col-md-3">
                  <label>E-mail</label>
                  <input type="text" class="form-control custom-filter campo-pesquisa" data-field="email">
               </div>
               <div class="col-md-3">
                  <label>Perfil</label>
                  <select class="form-control custom-filter campo-pesquisa" data-field="perfil">
                     <option value="">Selecione...</option>
                  </select>
               </div>
               <div class="col-md-3">
               </div>
            </div>
         </div>
         <div class="box-footer text-center">
            <button type="button" id="btnPesquisaDataTable" class="btn btn-primary">
            <i class="fa fa-search"></i>&nbsp;Pesquisar
            </button>
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
                     <b-button class="mr-2 btn btn-default" @click="remove(data.item)"><i class="fa fa-remove"></i></b-button>
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
        }
    },
    mounted() {
        this.fetchUsers()
    },
    watch: {
        currentPage() {
            this.fetchUsers()
        }
    }
}
</script>

<style>
    .btn-actions {
        text-align: center;
    }
    .btn-new {
        float: right;
        margin-top: -35px;
    }
    .b-table.table>tfoot>tr>th[aria-sort][aria-sort=ascending]:after, 
    .b-table.table>thead>tr>th[aria-sort][aria-sort=ascending]:after {
        opacity: 1;
        content: "\2193";
    }
    .b-table.table>tfoot>tr>th[aria-sort]:after, 
    .b-table.table>thead>tr>th[aria-sort]:after {
        position: inherit;
        margin: 1em;
        bottom: 0;
        right: .35em;
        padding-bottom: inherit;
        font-size: inherit;
        line-height: inherit;
        opacity: .4;
        content: "\2195";
    }
    .table > thead > tr > th {
        vertical-align: bottom;
        border-bottom: 3px solid #ddd;
    }
    .text-center-align {
        text-align: center;
    }
    .box-title {
        display: inline-block;
        font-size: 16px !important;
        margin: 0;
        line-height: 1;
    }
    .box-body {
        padding: 15px;
        padding-top: 5px;
        color: #2a3f54;
        font-size: 14px;
    }
    table {
        font-size: 14px;
        border: 1px solid black;
        color: #2a3f54;
    }
    .table-bordered {
        border: 1px solid #ddd;
    }
    .table-bordered > thead > tr > th, 
    .table-bordered > tbody > tr > th, 
    .table-bordered > tfoot > tr > th, 
    .table-bordered > thead > tr > td, 
    .table-bordered > tbody > tr > td, 
    .table-bordered > tfoot > tr > td {
        border: 1px solid #ddd;
    }
    .table > thead > tr > th {
        vertical-align: bottom;
        border-bottom: 3px solid #ddd;
    }
    .box {
        position: relative;
        background: #ffffff;
        border-top: 1px solid #d2d6de;
        margin-bottom: 20px;
        width: 100%;
    }
    .btn-default {
        background-color: #dddddd;
        color: #444;
        border-color: #b3b3b3;
    }
    .title {
        font-size: 18px;
        color: #2a3f54;
    }
    .content-header > h1 {
        margin: 2px !important;
    }
    .gray-color {
        color: gray;
    }
</style>
