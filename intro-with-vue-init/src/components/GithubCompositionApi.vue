<script setup> // here is possible to put JS directly in the component
  import { reactive } from 'vue'

  const state = reactive({
    name: 'Vue 3',
    login: 'vue',
    company: 'Acme Inc',
    bio: '...',
    searchInput: '',
    avatar_url: 'https://avatars.githubusercontent.com/u/6128107?v=4',
  })

  async function fetchSearchUser() {
    const res = await fetch(`https://api.github.com/users/${state.searchInput}`);
    const data = await res.json();

    state.name = data.name;
    state.login = data.login;
    state.company = data.company;
    state.bio = data.bio;
    state.avatar_url = data.avatar_url;
  }

</script>

<template>

  <div class="container">
    <div class="centered">
      <div id="app">
        <h2>GitHUb User Data</h2>
        <hr>

        <input class="centered" type="text" v-model="state.searchInput">
        <br>
        <button type="button" class="btn btn-primary" v-on:click="fetchSearchUser">
          Search User
        </button>
        <br>

        <br>
        <img v-bind:src="state.avatar_url">
        <hr><br>
        <strong>{{state.login}}</strong>

        <h1>{{state.name}}</h1>
        <h2>{{state.company}}</h2>
        <span>{{state.bio}}</span>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>