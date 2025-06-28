<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await api.post('/login', {
          username: this.username,
          password: this.password,
        });
        localStorage.setItem('user', response.data.token);
        this.$router.push('/home');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
