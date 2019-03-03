<template>
  <div id="app">
    <div class="wrapper">
      <Header/>
      <Menu />
      <Content />
    </div>
<!--     
    <Loading v-if="validToken" />
    <Content v-else /> -->
  </div>
</template>

<script>
// import axios from 'axios'
// import { baseApiUrl, userKey } from '@/global'
// import { mapState } from 'vuex'
  import Header from '@/components/template/Header'
  import Menu from '@/components/template/Menu'
// import Loading from '@/components/template/Loading'
 import Content from '@/components/template/Content'

export default {
  name: 'App',
  components: { Header, Content, Menu }
  // computed: mapState(['user']),
  // data() {
  //   return {
  //     validToken: true
  //   }
  // },
  // methods: {
  //   async validateToken() {
  //     // this.validToken = true
  //     // const json = localStorage.getItem(userKey)
  //     // const userData = JSON.parse(json)
  //     // this.$store.commit('setUser', null)
  //     // if(!userData) {
  //     //   this.validToken = false
  //     //   this.$router.push({ name: 'auth'})
  //     //   return
  //     // }
  //     // const token = userData.token
  //     // const res = await axios.get(`${baseApiUrl}/auth/token/validate/${token}`)
  //     // if(res.data.isValid){
  //     //   this.$store.commit('setUser', userData)
  //     // }else{
  //     //   localStorage.removeItem(userKey)
  //     //   this.$router.push({ name: 'auth' })
  //     // }
  //     // this.validToken = false
  //   }
  // },
  // created() {
  //   this.validateToken()
  // }
}
</script>

<style>
  
</style>
