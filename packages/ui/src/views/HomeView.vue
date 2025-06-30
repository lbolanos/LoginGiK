<template>
  <div>
    <h1>Welcome to the Admin Panel</h1>
    <button @click="logout">
      Logout
    </button>
    <div>
      <h2>Enterprises</h2>
      <ul>
        <li
          v-for="enterprise in enterprises"
          :key="enterprise.id"
        >
          {{ enterprise.name }}
        </li>
      </ul>
    </div>
    <div>
      <UserManagement />
      <EnterpriseManagement />
      <RoleManagement />
      <PermissionManagement />
    </div>
  </div>
</template>

<script>
import api from '../services/api';
import UserManagement from '../components/UserManagement.vue';
import EnterpriseManagement from '../components/EnterpriseManagement.vue';
import RoleManagement from '../components/RoleManagement.vue';
import PermissionManagement from '../components/PermissionManagement.vue';

export default {
  components: {
    UserManagement,
    EnterpriseManagement,
    RoleManagement,
    PermissionManagement,
  },
  data() {
    return {
      enterprises: [],
    };
  },
  async created() {
    try {
      const response = await api.get('/enterprises');
      this.enterprises = response.data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  },
};
</script>
