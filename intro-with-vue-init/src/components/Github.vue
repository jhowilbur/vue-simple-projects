<script setup> // here is possible to put JS directly in the component
  import { reactive, ref, computed } from 'vue'

  const searchInput = ref('') // with ref we can use primitive types

  const state = reactive({ // here we are always using an object
    name: '',
    login: '',
    company: '',
    bio: '',
    avatar_url: '',
    repos: []
  })

  async function fetchSearchUser(event) {
    event.preventDefault();

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

  const reposCount = computed(() => { // computed properties are cached based on their reactive dependencies
    return state.repos.length > 0
        ? `${state.repos.length}`
        : `No repositories in ${state.name}`
  })

  const searchingUser = computed(() => { // we can do that using v-model because will generate errors
    return searchInput.value === ''
        ? `Waiting for search...`
        : `<p>Searching: <strong>https://api.github.com/users/${searchInput.value}</strong> </p>`
        // : `<p>Searching: <strong>https://api.github.com/users/{{ searchInput }}</strong> </p>`
  })
</script>

<template>

  <div class="container">
    <div class="centered">
      <div id="app">
        <h2>GitHub User Data</h2>
        <hr>

        <!-- v-html is a directive that allows us to pass HTML through to our templates. -->
<!--        <div v-html="searchingUser"></div>-->

        <p>
          Searching:<br>
          <strong v-if="searchInput !== '' ">
            https://api.github.com/users/{{ searchInput }}
          </strong>
        </p>
        <form @submit="fetchSearchUser">
          <!-- v-model is a directive that allows us to create two-way data bindings on form input, textarea, and select elements. -->
          <input class="centered" type="text" v-model="searchInput">

          <!-- v-model.lazy change instantaneously -->
<!--          <input class="centered" type="text" v-model.lazy="searchInput">-->
          <br>
          <button class="btn btn-primary"> Search User </button>
          <br><br>
        </form>

        <div v-if=" state.login !== '' ">
          <img :src="state.avatar_url">
          <hr>
          <strong>{{state.login}}</strong>

          <h1>{{state.name}}</h1>
          <h2>{{state.company}}</h2>
          <span>{{state.bio}}</span>
        </div>

        <section v-if="state.repos.length > 0">
          <br>
          <h3>Repositories</h3>
          <h4> {{ reposCount }} </h4>
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