<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input
        v-model="username"
        type="text"
        placeholder="Username"
      >
      <input
        v-model="password"
        type="password"
        placeholder="Password"
      >
      <button type="submit">
        Login
      </button>
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
        localStorage.setItem('token', response.data.token);
        this.$router.push('/home');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
