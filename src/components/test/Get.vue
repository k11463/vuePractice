<template lang="html">
  <div>
    <form>
      <input type="text" v-model="email">
      <input type="text" v-model="password">
      <button type="button" @click="postData">Login</button>
    </form>
    <h3>{{msg}}</h3>
    <pre>{{data}}</pre> <!--排列JSON檔-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [],
      email: "",
      password: "",
      msg: ""
    }
  },
  created(){
    this.axios.get('/getdata').then((result) => {
      this.data = result.data
    })
  },
  methods: {
    postData () {
      if (this.email == "" || this.password == ""){
        this.msg = "email password 不能為空"
      } else {
        this.axios.post('/member-register',{email: this.email, password: this.password}).then((result) => {
          this.$router.push('/shopping')
        }).catch((e) => {
          this.msg = '登入失敗'
        })
      }
    }
  }
}
</script>

<style lang="css">
</style>
