<template>
    <q-page class="">
        <q-table
                title="Промокоды"
                :data="promoCodes"
                :columns="columns"
                row-key="id"
                :pagination.sync="pagination"
                class="q-pb-xl"
        >
            <template v-slot:body-cell-preview="props">
                <q-td :props="props">
                    {{props.row.preview}}
                    <q-img
                            :src="`${api_link}/uploads/${props.row.preview}`"
                            spinner-color="white"
                            style="height: 140px; max-width: 150px"
                    />
                </q-td>
            </template>
            <template v-slot:body-cell-edit="props">
                <q-td :props="props">
                    <q-btn color="primary" label="редактировать"
                           @click="editCode(props.row.id)"/>
                </q-td>
            </template>
        </q-table>
        <q-btn round
               to="/promo-code/create"
               class='fixed-bottom-right q-mb-lg q-mr-lg'
               color="primary"
               icon="add" />
    </q-page>
</template>

<script>
export default {
  name: 'PromoCodePage',
  data() {
    return {
      promoCodes: [],
      pagination: {
        rowsPerPage: 10,
        page: 1,
      },
      columns: [
        {
          name: 'id',
          required: true,
          label: 'id',
          align: 'left',
          field: (row) => row.id,
          format: (val) => `${val}`,
          sortable: true,
        },
        { name: 'value', label: 'Код', field: 'value' },
        { name: 'limit', label: 'Лимит', field: 'limit' },
        { name: 'using', label: 'Использовано', field: () => 'хрен знает' },
        { name: 'product', label: 'Блюдо', field: (row) => (row.product.name) },
        { name: 'date_finish', label: 'Дата окончания', field: (row) => (row.dateFinish.substr(0, 10)) },
        { name: 'is_active', label: 'Активен', field: (row) => (row.isActive === null ? ' нет' : 'да') },
        { name: 'edit', label: 'Редактировать', field: 'edit' },
      ],
    };
  },
  methods: {
    editCode(orderId) {
      this.$router.push(`/promo-code/${orderId}`);
    },
  },
  mounted() {
    this.$axios.get('/api/promocodes')
      .then(({ data }) => {
        const camelData = this.$toCamelCase(data.promoCodes);
        this.promoCodes.splice(0, this.promoCodes.length, ...camelData);
      });
  },
};
</script>

<style scoped>

</style>
