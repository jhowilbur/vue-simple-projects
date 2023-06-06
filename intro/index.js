const app = Vue.createApp({
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
});

app.mount('#app');