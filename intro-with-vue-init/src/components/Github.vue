<script setup> // here is possible to put JS directly in the component
  import { reactive } from 'vue'

  const state = reactive({
    name: '',
    login: '',
    company: '',
    bio: '',
    searchInput: '',
    avatar_url: '',
    repos: []
  })

  async function fetchSearchUser() {
    const res = await fetch(`https://api.github.com/users/${state.searchInput}`);
    const data = await res.json();

    state.name = data.name;
    state.login = data.login;
    state.company = data.company;
    state.bio = data.bio;
    state.avatar_url = data.avatar_url;

    await fetchRepos(state.login);
  }

  async function fetchRepos(username) {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await res.json();

    state.repos = data;
  }

</script>

<template>

  <div class="container">
    <div class="centered">
      <div id="app">
        <h2>GitHub User Data</h2>
        <hr>

        <input class="centered" type="text" v-model="state.searchInput">
        <br>
        <button type="button" class="btn btn-primary" @click="fetchSearchUser">
          Search User
        </button>
        <br><br>

        <div v-if=" state.login !== '' ">
          <img :src="state.avatar_url">
          <hr>
          <strong>{{state.login}}</strong>

          <h1>{{state.name}}</h1>
          <h2>{{state.company}}</h2>
          <span>{{state.bio}}</span>
        </div>

        <section v-if="state.repos.length > 0">
          <h3>Repositories</h3>
          <hr><br>
<!--          <ul>-->
<!--            <li v-for="repo in state.repos">-->
<!--              <a :href="repo.html_url" target="_blank">{{repo.name}}</a>-->
<!--            </li>-->
<!--          </ul>-->
          <article v-for="repo in state.repos">
<!--            <div v-if="repo.full_name !== 'jhowilbur/Angular2-Game-DoYouWanToMillionaire'">-->
              <h4>{{repo.full_name}}</h4>
              <p>{{repo.description}}</p>
              <a :href="repo.html_url" target="_blank">Go to repository</a>
<!--            </div>-->
          </article>
        </section>

      </div>
    </div>
  </div>

</template>

<style scoped>

</style>