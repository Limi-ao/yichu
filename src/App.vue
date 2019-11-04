<template>
  <div id="app">
    <top v-if="$route.path !== '/login'"></top>
    <div v-if="$route.path !== '/login'" style="padding-top:60px;background:#ECECEC;height:calc(100vh)">
      <router-view/>
    </div>
    <div v-else  style="padding-top:60px;background:#002B5A;height:calc(100vh)">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import top from '@/components/top.vue'
export default {
  name: 'App',
  components:{
    top
  },
  watch:{
    '$route':function(){
      return this.$route
    }
  },
  methods:{
    promise(){
      return new Promise((resolve,reject)=>{
        reject('error')
      })
    }
  },
  created(){
    this.promise().then((v)=>{
      console.log(v)
    }).catch((v)=>{console.log(v)})
  }
}
</script>

<style>
#app {
  font-family: '微软雅黑';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #666;
  font-size: 14px;
  position: relative;
  height: 100%;
}
</style>
