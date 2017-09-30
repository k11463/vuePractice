<template lang="html">
  <div>
    <div class="all">
      <app-alert v-if="isAlert" :content="this.content" @result="getAlertData"></app-alert>
      <div class="title">
        修改會員資料
      </div>
      <div class="body">
        <div class="component">
          <div class="circle"></div>會員編號：{{$store.state.memberID}}
        </div>
        <div class="component">
          <div class="circle"></div>姓名：{{$store.state.user}}<div class="fa fa-pencil icon" @click="chgMode('name', 'text')">
          </div>
        </div>
        <div class="component">
          <div class="circle"></div>會員帳號：{{$store.state.account}}
        </div>
        <div class="component">
          <div class="circle"></div>E-mail：{{$store.state.email}}<div class="fa fa-pencil icon" @click="chgMode('email', 'text')">
          </div>
        </div>
        <div class="component">
          <div class="circle"></div>會員電話：{{$store.state.phone}}<div class="fa fa-pencil icon" @click="chgMode('phone', 'text')">
          </div>
        </div>
        <div class="component">
          <div class="circle"></div>會員密碼：<a @click="chgMode('password', 'password')">點我更改密碼</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chgAlert from '../ChgMemberDataAlert.vue';
export default {
  data(){
    return {
      content: "",
      count: 0,
      type: "",
      pw1: "",
      pw2: "",
      returnTxt: "",
    }
  },
  components: {
    appAlert: chgAlert
  },
  created(){
    if (!this.$store.state.isLogin){
      this.$router.push('/');
    }
  },
  methods: {
    getAlertData(result){
      console.log(this.returnTxt);
      this.count++;
      if (result.value){
        if (this.type == "password"){
          if (this.count == 1){
            this.pw1 = result.data;
            this.content = '請輸入新的密碼';
          }
          else if (this.count == 2){
            this.pw2 = result.data;
            this.$store.commit('setAlertTxt', 3);
            this.content = '確定要更改嗎?';
          }
          else{
            this.axios.post('/chgMember', {pw1: this.pw1, pw2: this.pw2, ac: this.$store.state.account, type: this.type, token: window.localStorage.getItem('token')}).then((result1) => {
              this.$store.commit('setMemberDataAlert', false);
              this.$swal('成功', '變更會員資料成功', 'success');
              this.count = 0;
              this.$store.commit('setAlertTxt', 1);
              this.$router.push('/memberCenter/chgMember');
            }).catch((err) => {
              console.log(err);
              this.count = 0;
              this.$store.commit('setMemberDataAlert', false);
              this.$swal('錯誤', err.request.response, 'error');
            });
          }
        }
        else{
          if (this.count == 1){
            this.returnTxt = result.data;
            this.$store.commit('setAlertTxt', 3);
            this.content = "確定要更改嗎?";
          }
          else{
            this.axios.post('/chgMember', {ac: this.$store.state.account, value: this.returnTxt, type: this.type, token: window.localStorage.getItem('token')}).then((result1) => {
              this.$swal('成功', '變更會員資料成功', 'success');
              this.$store.commit('setMemberDataAlert', false);
              this.count = 0;
              this.$store.commit('setAlertTxt', 1);
              this.returnTxt = "";
              this.$router.push('/');
            }).catch((err) => {
              this.$store.commit('setMemberDataAlert', false);
              this.$swal('錯誤', err.request.response, 'error');
            })
          }
        }
      }
      else{
        console.log("cancel");
        this.returnTxt = "";
        this.count = 0;
        this.$store.commit('setAlertTxt', 1);
      }
    },
    chgMode(index, type){
      if (index == 'name'){
        this.content = '請輸入您的新名稱';
        this.type = 'name';
      }
      if (index == 'password'){
        this.content = '請輸入原本的密碼'
        this.type = 'password';
        this.$store.commit('setAlertTxt', 2);
      }
      if (index == 'email'){
        this.content = '請輸入新的E-mail';
        this.type = 'email';
      }
      if (index == 'phone'){
        this.content = '請輸入新的電話號碼';
        this.type = 'phone';
      }
      this.$store.commit('setMemberDataAlert', true);
    }
  },
  computed: {
    isAlert(){
      return this.$store.state.chgMemberDataAlert;
    }
  }
}
</script>

<style lang="css" scoped>
*{
  margin: 0;
  padding: 0;
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
.body{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-55%, -55%);
}
.component{
  width: 800px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border: 1px solid gray;
  border-radius: 10px;
  margin-top: 6%;
}
.component a {
  cursor: pointer;
  color: #ff7575;
}
.component a:hover{
  color: #ce0000
}
.circle{
  width: 18px;
  height: 18px;
  border-radius: 40px;
  background-color: #f24;
  margin-right: 15px;
  margin-top: 3px;
}
.icon{
  margin-left: 20px;
  cursor: pointer;
}
</style>
