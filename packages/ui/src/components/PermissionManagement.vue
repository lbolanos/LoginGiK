<template>
  <div>
    <h2>Permission Management</h2>
    <form @submit.prevent="createPermission">
      <input
        v-model="name"
        type="text"
        placeholder="Permission Name"
      >
      <button type="submit">
        Create Permission
      </button>
    </form>
    <ul>
      <li
        v-for="permission in permissions"
        :key="permission.id"
      >
        {{ permission.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      name: '',
      permissions: [],
    };
  },
  created() {
    this.fetchPermissions();
  },
  methods: {
    async createPermission() {
      try {
        const response = await api.post('/permissions', {
          name: this.name,
        });
        this.permissions.push(response.data);
        this.name = '';
      } catch (error) {
        console.error(error);
      }
    },
    async fetchPermissions() {
      try {
        const response = await api.get('/permissions');
        this.permissions = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
