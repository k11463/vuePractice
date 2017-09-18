<template lang="html">
  <div class="mask">
    <div class="alert">
      <div class="close">
        <div class="fa fa-times xx"></div>
      </div>
      <div class="content">
        {{content}}
      </div>
      <div class="text">
        <input type="text" class="form-control txt">
      </div>
      <div class="button">
        <input type="button" class="btn btn-primary mybtn" value="更改">
        <input type="button" class="btn btn-primary mybtn" value="取消">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      content: "預設內容"
    }
  }
}
</script>

<style lang="css" scoped>
.mask{
  background-color: #bebebe;
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 0px;
  position: fixed;
  opacity: 0.4;
}
.alert{
  border: 4px solid;
  border-radius: 10px;
  width: 500px;
  height: 360px;
  box-shadow: 5px 5px 5px rgba(0,0,0,.5);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #dcffff;
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
  float: left;
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.txt{
  width: 200px;
  height: 30px;
  border: 1px solid;
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
  margin-left: 80px;
  margin-top: 50px;
}
</style>
