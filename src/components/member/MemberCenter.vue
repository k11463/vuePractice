<template lang="html">
  <div class="row">
    <div class="col-lg-3 left">
      <div class="leftBar">
        <router-link class="divAll" to="/memberCenter/chgMember" tag="div">
          <div class="component">
            修改會員資料
          </div>
        </router-link>
        <router-link class="divAll" to="/memberCenter/delMember" tag="div">
          <div class="component">
            刪除會員
          </div>
        </router-link>
      </div>
    </div>
    <div class="col-lg-7 mid">
      <router-view></router-view>
    </div>
    <div class="col-lg-2 right">123</div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      // chgMember: true,
      // delMember: false
    }
  },
  created(){
    if (!this.$store.state.isLogin){
      this.$router.push('/');
    }
    this.$router.push('/memberCenter/chgMember');
  },
  methods: {
    // changeMember(){
    //   this.chgMember = true;
    //   this.delMember = false;
    // },
    // deleteMember(){
    //   this.delMember = true;
    //   this.chgMember = false;
    // }
  }
}
</script>

<style lang="css" scoped>
*{
  width: 100vw;
  height: 100vh;
}
.left{
}
.leftBar{
  width: 380px;
  height: 100vh;
  margin-left: 10%;
}
.divAll{
  width: 380px;
  height: 120px;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.component{
  background-color: #ecf5ff;
  border-radius: 0 50px 50px 0;
  border: 1px solid #c4e1ff;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, .2);
  cursor: pointer;
  transition: 0.8s;
  width: 200px;
  height: 60px;
  letter-spacing: 6px;
  font-size: 20px;
  font-family: "標楷體";
  display: flex;
  align-items: center;
  justify-content: center;
}
.component:hover{
  box-shadow: 0 0 0 rgba(0,0,0,0);
}
.title{
  width: 1000px;
  height: 100px;
  font-size: 30px;
  border-bottom: 1px solid gray;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
