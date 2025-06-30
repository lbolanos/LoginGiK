<template>
  <div>
    <h2>User Management</h2>
    <form @submit.prevent="createUser">
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
        Create User
      </button>
    </form>
    <ul>
      <li
        v-for="user in users"
        :key="user.id"
      >
        {{ user.username }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      username: '',
      password: '',
      users: [],
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async createUser() {
      try {
        const response = await api.post('/users', {
          username: this.username,
          password: this.password,
        });
        this.users.push(response.data);
        this.username = '';
        this.password = '';
      } catch (error) {
        console.error(error);
      }
    },
    async fetchUsers() {
      try {
        const response = await api.get('/users');
        this.users = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
