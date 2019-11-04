<template>
  <div class="login" :style="{backgroundImage:'url('+bg+')'}">
    <div class="container">
      <transition>
    <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
  import bg from './assets/img/login.jpg'

  export default {
        data() {
            return {
              bg
            }
        },
        created() {
        }
    }
</script>

<style scoped>
  .container {
    position: relative;
  }
  .login {
    position: absolute;
    padding-top: 40px;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .v-enter
  {
    opacity: 0;
    transform: translateY(-100px);
  }

  .v-enter-active
  {
    transition: all 0.4s ease;
  }
</style>
