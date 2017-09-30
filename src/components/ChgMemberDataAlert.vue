<template lang="html">
  <transition name="bounce">
    <div class="mask">
      <transition>
        <div class="alert">
          <div class="close">
            <div class="fa fa-times xx" @click="close"></div>
          </div>
          <div class="content">
            {{content}}
          </div>
          <div class="text">
            <input type="password" class="form-control txt" v-model="data" v-if="isTxtPass">
            <input type="text" class="form-control txt" v-model="data" v-if="isTxt">
          </div>
          <div class="button">
            <input type="button" class="btn btn-primary mybtn left" value="更改" @click="chg">
            <input type="button" class="btn btn-primary mybtn right" value="取消" @click="cancel">
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['content'],
  data(){
    return {
      data: "",
    }
  },
  created(){

  },
  methods: {
    chg(){
      this.$emit('result', {value: true, data: this.data});
      this.data = "";
    },
    cancel(){
      this.$emit('result', {value: false});
      this.$store.commit('setMemberDataAlert', false);
    },
    close(){
      this.$emit('result', {value: false});
      this.$store.commit('setMemberDataAlert', false);
    }
  },
  computed: {
    isTxt(){
      return this.$store.state.isAlertTxt;
    },
    isTxtPass(){
      return this.$store.state.isAlertTxtPass;
    }
  }
}
</script>

<style lang="css" scoped>
*{
  z-index: 99999;
}
.mask{
  background-color: rgba(191,191,191,.4);
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 0px;
  position: fixed;
}
.alert{
  border: 1px solid gray;
  border-radius: 10px;
  width: 500px;
  height: 360px;
  box-shadow: 5px 5px 5px rgba(0,0,0,.5);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #ecf5ff;
}
.close{
  width: 100%;
  height: 50px;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
}
.xx{
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 85%;
  border-radius: 50px;
  background-color: gray;
  cursor: pointer;
}
.content{
  width: 100%;
  height: 100px;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}
.text{
  position: absolute;
  float: left;
  height: 50px;
  width: 100%;
  top: 45%;
  left: 0.1%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.txt{
  width: 200px;
  height: 30px;
  border: 1px solid;
  font-size: 22px;
}
.button{
  width: 100%;
  height: 100px;
  float: left;
}
.mybtn{
  width: 100px;
  padding: 0px;
  height: 30px;
  margin-top: 95px;
  cursor: pointer;
}
.left{
  margin-left: 80px;
}
.right{
  margin-left: 90px;
}
/* 讓整個頁面慢慢浮現出來 */
.fade-enter-active, .fade-leave-active{
  transition: .8s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
/**/
.bounce-enter-active{
  animation: bounce-in .5s;
}
.bounce-leave-active{
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in{
  0%{
    transform: scale(0);
  }
  50%{
    transform: scale(1.1);
  }
  100%{
    transform: scale(1);
  }
}
</style>
