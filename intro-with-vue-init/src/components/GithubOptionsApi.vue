<script>
  export default {
    data() {
      return {
        name: 'Vue 3',
        login: 'vue',
        company: 'Acme Inc',
        bio: '...',
        searchInput: '',
        avatar_url: 'https://avatars.githubusercontent.com/u/6128107?v=4',
      }
    },
    methods: {
      async searchUser() {
        const res = await fetch(`https://api.github.com/users/${this.searchInput}`);
        const data = await res.json();
        this.name = data.name;
        this.login = data.login;
        this.company = data.company;
        this.bio = data.bio;
        this.avatar_url = data.avatar_url;
      }
    }
  }
</script>

<template>
  <div class="container">
    <div class="centered">
      <div id="app">
        <h2>GitHUb User Data</h2>
        <hr>

        <input class="centered" type="text" v-model="searchInput">
        <br>
        <button type="button" class="btn btn-primary" v-on:click="searchUser">
          Search User
        </button>
        <br>

        <br>
        <img v-bind:src="avatar_url">
        <hr><br>
        <strong>{{login}}</strong>

        <h1>{{name}}</h1>
        <h2>{{company}}</h2>
        <span>{{bio}}</span>
      </div>
    </div>
  </div>
</template>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .centered {
    text-align: center;
  }
</style>