<template>
    <div>
        <h3 class="title">Cadastro de Usuários</h3>
        <hr>
        <form>
            <div class="form-group row" v-if="userId">
              <label for="name" class="col-sm-2 col-form-label">ID</label>
                <div class="col-sm-2">
                  <input type="text" class="form-control" id="id" ref="id" v-model="user.id" readonly>
                </div>
            </div>
            <div class="form-group row">
              <label for="name" class="col-sm-2 col-form-label">Nome</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" id="name" ref="name" v-model="user.name">
                </div>
            </div>
            <div class="form-group row">
              <label for="username" class="col-sm-2 col-form-label">Usuário</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" id="username" v-model="user.username">
                </div>
            </div>
            <div class="form-group row">
              <label for="password" class="col-sm-2 col-form-label">Senha</label>
                <div class="col-sm-6">
                  <input type="password" class="form-control" id="password" v-model="user.password">
                </div>
            </div>
            <div class="form-group row">
              <label for="profile" class="col-sm-2 col-form-label">Perfil</label>
                <div class="col-sm-6">
                  <select class="custom-select my-1 mr-sm-2" id="profile" v-model="user.profile">
                    <option value="ROLE_ADMIN">Administrador</option>
                    <option value="ROLE_USER">Usuário</option>
                  </select>
                </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-10">
                <button type="submit" class="btn btn-primary" @click.prevent="save">Salvar</button>
                <button type="button" class="btn btn-default" @click.prevent="back">Voltar</button>
              </div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, showError } from '@/global'
export default {
    name: 'UserForm',
    props: {
          id: String,
    },
    data() {
        return {
            user: {},
            userId: this.$route.params.id,
        }
    },
    methods: {
      save() {
        const method = this.user.id ? 'put' : 'post'
        const id = this.user.id ? `${this.user.id}` : ''
        const url = `${baseApiUrl}/users/${id}`
        axios[method](url, this.user)
          .then(() => {
            this.$toasted.global.defaultSuccess()
            this.$router.push({ path: '/user' })
          }).catch(showError)
      },
      back() {
        this.$router.push({ path: '/user' })
      },
      loadUser() {
        const url = `${baseApiUrl}/users/${this.user.id}`
        axios.get(url)
          .then(res => this.user = res.data)
          .catch(showError)
      }
    },
    mounted() {
      if(this.userId !== 0) {
        this.user.id = this.userId
        this.loadUser()
      } 
      this.$refs.name.focus()
    }
}
</script>

<style></style>
