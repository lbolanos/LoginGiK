<template>
  <div>
    <h1>Welcome to the Admin Panel</h1>
    <button @click="logout">Logout</button>
    <div>
      <UserManagement />
      <EnterpriseManagement />
      <RoleManagement />
      <PermissionManagement />
    </div>
  </div>
</template>

<script>
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
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  },
};
</script>
