<template lang="html">
  <div class="allPage">
    <div class="row">
      <div class="col-lg-3 left body"></div>
      <div class="col-lg-6 mid body">
        <center>
          <h1>首頁</h1>
          <button type="button" name="button" @click="gg">註冊</button>
        </center>
      </div>
      <div class="col-lg-3 right body"></div>
    </div>
  </div>
</template>

<script>
export default {
  created(){
    return this.$store.dispatch('hasToken');
  },
  methods: {
    gg(){
      console.log(window.localStorage.length);
    }
  }
}
</script>

<style lang="css" scoped>
.body{
  height: 100vh;
}
</style>
