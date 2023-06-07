<script setup>
  import GithubOptionsApi from "./components/GithubOptionsApi.vue";
  import GithubCompositionApi from "./components/GithubCompositionApi.vue";
  import Github from "./components/Github.vue";
  import {ref} from "vue";

  // export default {
  //   components: {
  //     // GithubOptionsApi,
  //     // GithubCompositionApi,
  //     Github,
  //   },
  // }

  // to test mount and unmount
  const isOpen = ref(true)
</script>

<template>
<!--  <GithubOptionsApi />-->
<!--  <GithubCompositionApi />-->
<!--  <Github />-->

<!--  to test mount and unmount-->
  <div class="container">
    <input type="checkbox" v-model="isOpen" > {{ isOpen }}
  </div>
  <Github v-if="isOpen"/>
</template>

<style>

</style>