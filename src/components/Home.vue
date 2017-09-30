<template lang="html">
  <div class="allPage">
    <div class="row">
      <div class="col-lg-3 left body"></div>
      <div class="col-lg-6 mid body">
        <center>
          <app-chg v-if="getChgAlert" content="123" @result="chg"></app-chg>
          <h1>首頁</h1>
          <button type="button" name="button" @click="on">註冊</button>
        </center>
      </div>
      <div class="col-lg-3 right body"></div>
    </div>
  </div>
</template>

<script>
import ChgMemberAlert from './ChgMemberDataAlert.vue';
export default {
  created(){
    this.$store.commit('saveMemberData');
    this.$store.dispatch('hasToken');
  },
  components: {
    appChg: ChgMemberAlert
  },
  computed: {
    getChgAlert(){
      return this.$store.state.chgMemberDataAlert;
    }
  },
  methods: {
    on(){
      this.$store.commit('setMemberDataAlert', true);
    },
    chg(result){
      if (result.value){
        console.log("1");
        console.log(result.data);
      }
      else{
        console.log("2");
      }
    }
  }
}
</script>

<style lang="css" scoped>
.body{
  height: 100vh;
}
</style>
