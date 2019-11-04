<template>
  <button  :style="{width:size+'px',cursor:disabled?'not-allowed':'pointer'}" :disabled="disabled" >
    <slot></slot>
  </button>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      size: {
        default: '120',
        type: String
      },
      disabled:{
        default: false,
        type: Boolean
      }
    },
    computed: {

    },

    created() {
    }
  }
</script>

<style scoped >


  button {
    height: 30px;
    background-color: #3d4749;
    cursor: pointer;
    color: #fff;
    border: none;
  }

</style>
