<template>
    <div>
        <h3 class="title">Cadastro de Usuários</h3>
        <div class="btn-new">
            <router-link :to="{name: 'userForm', params: { id: 0 }}" 
                class="btn btn-primary">
                <i class="fa fa-file"> Novo</i>
            </router-link>
        </div>
        <!-- <div class="btn-new">
            <router-link :to="{name: 'userForm', params: { id: 0 }}" 
                class="btn btn-primary">
                <i class="fa fa-file"> Novo</i>
            </router-link>
        </div>
        <p></p>
        <b-table responsive hover striped :items="users" :fields="fields">
            <template slot="actions" slot-scope="data">
                <router-link :to="{
                      name: 'userForm', params: { id: data.item.id }}" 
                    class="mr-2 btn btn-primary">
                    <i class="fa fa-pencil"></i>
                </router-link>
                <b-button class="mr-2" @click="remove(data.item)"><i class="fa fa-trash"></i></b-button>
            </template>
        </b-table>
        <b-pagination align="right" aria-label="Pagination" v-model="currentPage" 
            :total-rows="totalElements" :per-page="size"></b-pagination> -->
    </div>
</template>

<script>
// import axios from 'axios'
// import { baseApiUrl, showError } from '@/global'
// import { mapState } from 'vuex'

export default {
    name: 'UserIndex',
    // computed: mapState(['user']),
    // data() {
    //     return {
    //         users: [],
    //         currentPage: 1,
    //         size: 5,
    //         totalElements: 0,
    //         fields: [
    //             { key: 'id', label: 'ID', sortable: true, thStyle: 'width: 15%' },
    //             { key: 'username', label: 'Usuário', sortable: true, thStyle: 'width: 25%' },
    //             { key: 'name', label: 'Nome', sortable: true, thStyle: 'width: 25%' },
    //             { key: 'profile', label: 'Perfil', sortable: true,
    //                 formatter: value => value === 'ROLE_ADMIN' ? 'Administrador' : 'Usuário',
    //                 thStyle: 'width: 20%' },
    //             { key: 'actions', label: '', class: "btn-actions", thStyle: 'width: 15%' }
    //         ]
    //     }
    // },
    // methods: {
    //     fetchUsers() {
    //         // const page = this.currentPage - 1
    //         // const url = `${baseApiUrl}/users?page=${page}&size=${this.size}`
    //         // axios.get(url)
    //         //     .then(response => {
    //         //         this.users = response.data.content
    //         //         this.totalElements = response.data.totalElements
    //         //     })
    //         //     .catch(showError)
    //     },
    //     // remove(item) {
    //     //     const userSession = this.user
    //     //     if(userSession.username === item.username){
    //     //         this.$toasted.global.defaultError({ msg: 'Usuário logado não pode ser excluído!' })
    //     //         return
    //     //     }
    //     //     const id = item.id
    //     //     axios.delete(`${baseApiUrl}/users/${id}`)
    //     //         .then(() => {
    //     //             this.$toasted.global.defaultSuccess()
    //     //             this.fetchUsers()
    //     //         })
    //     //         .catch(showError)
    //     // }
    // },
    // mounted() {
    //     // this.fetchUsers()
    // },
    // watch: {
    //     // currentPage() {
    //     //     this.fetchUsers()
    //     // }
    // }
}
</script>

<style>
    .btn-new {
        text-align: right;
    }
    .btn-actions {
        text-align: center;
    }
</style>
