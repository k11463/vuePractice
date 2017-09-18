<template lang="html">
  <div class="divSoto">
    <form class="form-control f1">
      <div class="divAll">
        <h3>登入</h3>
      </div>
      <div class="divAll">
        帳號：<input type="text" class="form-control txtControl" v-model="ac">
      </div>
      <div class="divAll">
        密碼：<input type="password" class="form-control txtControl" v-model="pw">
      </div>
      <div class="msg">
        {{ msg }}
      </div>
      <div class="divAll">
        <input type="button" class="btnLogin" value="登入" @click="login">
      </div>
      <div class="divAll">
        還沒加入會員？ <a href="/register">點此註冊</a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      ac: "",
      pw: "",
      msg: ""
    }
  },
  created(){
    return this.$store.dispatch('hasToken');
  },
  methods: {
    login(){
      if (this.ac == "" || this.pw == ""){
        this.msg = "帳號或密碼未填入";
      }
      else{
        this.axios.post('/loginData', {
          ac: this.ac,
          pw: this.pw
        }).then((result) => {
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('name', result.data.res[0].name);
            this.$swal('登入成功', '即將回到首頁', 'success').then((result) => {
              setTimeout(() => {
                this.$router.push('/');
              }, 1400);
            })
            console.log(result);
        }).catch((err) => {
          this.$swal('登入失敗', err.request.response, 'error');
        })
      }
    }
  }
}
</script>

<style lang="css" scoped>
.divSoto{
  width: 100vw;
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.divAll{
  height: 18%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.msg{
  height: 4%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f24;
}
.f1{
  margin-top: 5%;
  width: 600px;
  height: 600px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, .4);
  transition: 1.2s;
}
.f1:hover{
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
}
.txtControl{
  width: 200px;
  height: 30px;
  display: inline;
  font-size: 19px;
}
.btnLogin{
  width: 90px;
  height: 28px;
  border-radius: 5px;
  background-color: #f8f8ff;
}
.btnLogin:active{
  background-color: #dcdcdc;
}
</style>
