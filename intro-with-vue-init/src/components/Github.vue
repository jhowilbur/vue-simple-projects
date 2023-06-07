<script setup> // here is possible to put JS directly in the component
  import { reactive, ref } from 'vue'

  // with ref we can use primitive types
  const searchInput = ref('')

  const state = reactive({ // here we are always using an object
    name: '',
    login: '',
    company: '',
    bio: '',
    avatar_url: '',
    // searchInput: '',
    repos: []
  })

  async function fetchSearchUser() {
    // const res = await fetch(`https://api.github.com/users/${state.searchInput}`);
    const res = await fetch(`https://api.github.com/users/${searchInput.value}`); //to be able to manipulate the value of the ref we need to use .value
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

<!--        <input class="centered" type="text" v-model="state.searchInput">-->
        <input class="centered" type="text" v-model="searchInput">
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

        <h2>
          {{ state.repos.length > 0
            ? `Repositories (${state.repos.length})`
            : `No repositories in ${state.name}`
          }}
        </h2>

        <section v-if="state.repos.length > 0">
          <h3>Repositories</h3>
          <hr><br>

          <article v-for="repo in state.repos">
              <h4>{{repo.full_name}}</h4>
              <p>{{repo.description}}</p>
              <a :href="repo.html_url" target="_blank">Go to repository</a>
          </article>
        </section>

      </div>
    </div>
  </div>

</template>

<style scoped>

</style>