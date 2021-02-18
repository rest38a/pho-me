<template>
  <q-list
    bordered
    separator
  >
    <q-item
      v-ripple
      clickable
      v-for="role in roles"
      :key="role.id"
      :to="`/user_setting/role/${role.id}`"
    >
      <q-item-section>{{role.name}}</q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'RoleList',
  mounted() {
    this.$axios.get('/api/roles')
      .then(({ data }) => {
        data = this.$toCamelCase(data);
        this.roles.splice(0, this.roles.length, ...data.roles);
      });
  },
  data() {
    return {
      roles: [],
    };
  },
};
</script>

<style scoped>

</style>
