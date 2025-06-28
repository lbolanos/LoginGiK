<template>
  <div>
    <h2>Role Management</h2>
    <form @submit.prevent="createRole">
      <input type="text" v-model="name" placeholder="Role Name" />
      <button type="submit">Create Role</button>
    </form>
    <ul>
      <li v-for="role in roles" :key="role.id">{{ role.name }}</li>
    </ul>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      name: '',
      roles: [],
    };
  },
  methods: {
    async createRole() {
      try {
        const response = await api.post('/user-groups', {
          name: this.name,
        });
        this.roles.push(response.data);
        this.name = '';
      } catch (error) {
        console.error(error);
      }
    },
    async fetchRoles() {
      try {
        const response = await api.get('/user-groups');
        this.roles = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.fetchRoles();
  },
};
</script>
