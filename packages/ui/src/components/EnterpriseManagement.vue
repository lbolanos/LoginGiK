<template>
  <div>
    <h2>Enterprise Management</h2>
    <form @submit.prevent="createEnterprise">
      <input
        v-model="name"
        type="text"
        placeholder="Enterprise Name"
      >
      <button type="submit">
        Create Enterprise
      </button>
    </form>
    <ul>
      <li
        v-for="enterprise in enterprises"
        :key="enterprise.id"
      >
        {{ enterprise.name }}
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
      enterprises: [],
    };
  },
  created() {
    this.fetchEnterprises();
  },
  methods: {
    async createEnterprise() {
      try {
        const response = await api.post('/enterprises', {
          name: this.name,
        });
        this.enterprises.push(response.data);
        this.name = '';
      } catch (error) {
        console.error(error);
      }
    },
    async fetchEnterprises() {
      try {
        const response = await api.get('/enterprises');
        this.enterprises = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
