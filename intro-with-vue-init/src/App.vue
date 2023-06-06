<script>
  export default {
    // name: 'App',
    data() {
      return {
        count: 0
      }
    }
  }
</script>

<template>
  <button v-on:click="count++">You clicked me {{ count }} times.</button>
</template>

<style>
  #app {
    display: grid;
    place-content: center;
    height: 100vh;
  }

  button {
    font-size: 2rem;
  }
</style>