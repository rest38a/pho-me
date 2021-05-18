<template>
  <q-list
    bordered
    separator
  >
    <q-item
      v-for="user in users"
      :key="user.id"
      v-ripple
      clickable
      :to="`/user_setting/user/edit/${user.id}`"
    >
      <q-item-section>{{ user.name }}</q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.$axios.get('/api/staff/users')
      .then(({ data }) => {
        data = this.$toCamelCase(data);
        this.users.splice(0, this.users.length, ...data.users);
      });
  },
};
</script>

<style scoped>

</style>
