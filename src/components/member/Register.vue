<template lang="html">
  <div class="divSoto">
    <form class="form-control f1">
      <div class="divAll">
        <h3>註冊</h3>
      </div>
      <div class="divAll">
        申請帳號：<input type="text" class="form-control txtControl" v-model="ac">
      </div>
      <div class="divAll">
        申請密碼：<input type="password" class="form-control txtControl" v-model="pw">
      </div>
      <div class="divAll">
        確認密碼：<input type="password" class="form-control txtControl" v-model="pw2">
      </div>
      <div class="divAll">
        真實姓名：<input type="text" class="form-control txtControl" v-model="name">
      </div>
      <div class="divAll">
        電話號碼：<input type="text" class="form-control txtControl" v-model="phone">
      </div>
      <div class="divAll">
        電子信箱：<input type="text" class="form-control txtControl" v-model="email">
      </div>
      <div class="msg">
        {{ msg }}
      </div>
      <div class="divAll">
        <input type="button" class="btnLogin" @click="regis" value="註冊">
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
      pw2: "",
      name: "",
      phone: "",
      email: "",
      msg: ""
    }
  },
  methods: {
    regis(){
      if (this.ac == "" || this.pw == "" || this.pw2 == "" || this.phone == "" || this.email == "" || this.name == ""){
        this.msg = "有表格未填入資料";
        setTimeout(() => {
          this.msg = "";
        }, 3000);
      }
      else if (this.pw != this.pw2){
        this.msg = "請確認密碼填入一致";
      }
      else if (this.phone.length < 9 || this.phone.length > 14){
        if (this.phone.length < 9){
          this.msg = "電話號碼不可能小於9個字";
        }
        else{
          this.msg = "電話號碼不可能大於14個字";
        }
      }
      else{
        this.axios.post('/memberRegis' ,{
          ac: this.ac,
          pw: this.pw,
          phone: this.phone,
          email: this.email,
          name: this.name
        }).then((result) => {
          this.$swal('註冊成功', '您已經註冊成功，歡迎您加入智善大家族。', 'success').then((result) => {
            setTimeout(() => {
              this.$router.push('/login');
            }, 1400);
          })
        }).catch((err) => {
          console.log(err);
          this.$swal('失敗', '註冊失敗', 'error');
          location.reload();
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
  height: 12%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.msg{
  height: 4%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f24
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
  width: 160px;
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
