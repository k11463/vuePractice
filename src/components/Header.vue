<template lang="html">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link to="/" tag="a" class="navbar-brand">首頁</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <router-link v-for="m in menuItem" :to="m.link" :key="m.title" class="nav-item" tag="li" activeClass="active">
            <a class="nav-link" href="#">{{m.title}}</a>
          </router-link>
          <!-- <li class="nav-item">
            <a class="nav-link" href="#">Features</a>
          </li> -->
        </ul>
      </div>
      <div class="logout" v-if="this.$store.state.isLogin" @click="logout">登出</div>
      <div class="welcome">歡迎光臨本站：{{ $store.state.user }}</div>
    </div>
</nav>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    menuItem(){
      let menuItem = [
        {title: '登入', link: '/login'},
        {title: '註冊', link: '/register'}
      ];

      if (this.$store.state.isLogin){
        menuItem = [
          {title: '會員中心', link: '/memberCenter'}
        ]
      }
      return menuItem;
    }
  },
  methods: {
    logout(){
      return this.$swal('成功', '已成功登出', 'success').then((result) => {
        this.$store.commit('chgLoginStatus', false);
        localStorage.clear('token');
        this.$router.push('/');
      })
    }
  }
}
</script>

<style lang="css" scoped>
.welcome{
  width: 320px;
  font-size: 18px;
  color: #66b3ff;
}
.logout{
  width: 100px;
  color: gray;
  cursor: pointer;
}
.logout:hover{
  color: black;
}
</style>
