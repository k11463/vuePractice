<template lang="html">
  <div>
    <div class="title">
      修改會員資料
    </div>
    <div class="body">
      <div class="component">
        <div class="circle"></div>會員編號：{{$store.state.memberID}}<div class="fa fa-pencil icon">
        </div>
      </div>
      <div class="component">
        <div class="circle"></div>姓名：{{$store.state.user}}<div class="fa fa-pencil icon">
        </div>
      </div>
      <div class="component">
        <div class="circle"></div>會員帳號：{{$store.state.account}}<div class="fa fa-pencil icon">
        </div>
      </div>
      <div class="component">
        <div class="circle"></div>E-mail：{{$store.state.email}}<div class="fa fa-pencil icon">
        </div>
      </div>
      <div class="component">
        <div class="circle"></div>會員電話：{{$store.state.phone}}<div class="fa fa-pencil icon">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created(){
    if (this.$store.state.isLogin){
      return this.$store.commit('saveMemberData');
    }
    else{
      this.$router.push('/');
    }
  }
}
</script>

<style lang="css" scoped>
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
  margin-top: 10%;
}
.circle{
  width: 20px;
  height: 20px;
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
