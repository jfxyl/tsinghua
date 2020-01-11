<template>
  <div class="big-continer" id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'tsinghua',
    mounted(){
      let that = this;
      that.$nextTick(()=> {
        that.$utils.setScreen();
      })
    },
    methods: {
      // code判断
      returnCode (data,callback) {
        let code = parseInt(data.errcode);
        if(code === 200){
          callback();
        }else{
          if(data.msg != undefined){
            this.$utils.alertText(data.msg);
          }
        }
      }
    },
  }
</script>

<style>
  @import "./style/animate.css";
  @import "./style/style.css";
</style>
