import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    username:""
  },
  mutations: {
    login(state,username){
      state.username = username
    },
    logout(state){
      state.username=""
    }
  },
  actions:{
    login(context,username){
      context.commit('login',username)
    },
    logout(context){
      context.commit('logout')
    }
  },
  getters: {},
  modules: {}
})

export default store
