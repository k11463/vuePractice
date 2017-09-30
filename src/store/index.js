import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    title: "123",
    user: "",
    isLogin: false,
    memberID: "",
    phone: "",
    email: "",
    account: "",
    chgMemberDataAlert: false,
    isAlertTxt: true,
    isAlertTxtPass: false,
  },
  mutations: { // $store.commit
    // saveUser(state, payload){
    //   state.user = payload;
    // },
    setMemberDataAlert(state, payload){
      state.chgMemberDataAlert = payload;
    },
    setAlertTxt(state, payload){
      if (payload == 1){
        state.isAlertTxtPass = false;
        state.isAlertTxt = true;
      }
      else if (payload == 2){
        state.isAlertTxt = false;
        state.isAlertTxtPass = true
      }
      else{
        state.isAlertTxt = false;
        state.isAlertTxtPass = false;
      }
    },
    chgLoginStatus(state, payload){
      if (payload){
        state.user = window.localStorage.getItem('name');
      }
      else{
        state.user = "訪客";
      }
      state.isLogin = payload;
    },
    saveMemberData(state){
      Vue.axios.post('/getMember', {token: window.localStorage.getItem('token')}).then((result) => {
        //console.log(result);
        state.user = result.data[0].name;
        state.account = result.data[0].account;
        state.memberID = result.data[0].memberID;
        state.phone = result.data[0].phone;
        state.email = result.data[0].email;
      }).catch((err) => {
        this.$swal('錯誤', "您沒有登入", 'error');
      })
    }
  },
  actions: {  // $store.dispatch
    hasToken({commit}){
      if (window.localStorage.length != 0){
        commit('chgLoginStatus', true);
        console.log("true");
      }
      else{
        console.log("false");
        commit('chgLoginStatus', false);
      }
    }
  },
  getters: {
    p456(){
      return store.state.title + "456"
    }
  }
})
