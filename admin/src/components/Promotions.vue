<template>
    <q-page class="q-pb-xl">
      <router-view/>
        <q-table
                title="Акции"
                :data="promotions"
                :columns="columns"
                row-key="name"
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
                           @click="editPromotio(props.row.id)"/>
                </q-td>
            </template>
        </q-table>
        <q-btn color="primary" class='fixed-bottom-right q-ma-md' label="Добавить"
               @click="addPromotion()"/>
    </q-page>
</template>

<script>
import keysToCamel from '../helpers/toCamelCase';

export default {
  name: 'Promotions',
  mounted() {
    this.$axios.get('/api/promotionsAdmin')
      .then(({ data }) => {
        const camelData = keysToCamel(data.promotions);
        this.promotions.splice(0, this.promotions.length, ...camelData);
      });
  },
  data() {
    return {
      api_link: process.env.ADMIN_API_LINK,
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Название',
          align: 'left',
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'startime', align: 'center', label: 'Начало', field: 'startTime', sortable: true,
        },
        {
          name: 'finishTime', label: 'Конец', field: 'finishTime', sortable: true,
        },
        { name: 'preview', label: 'Превью', field: 'preview' },
        { name: 'edit', label: 'редактировать', field: 'edit' },
      ],
      promotions: [
      ],
    };
  },
  methods: {
    editPromotio(productId) {
      this.$router.push(`/promotions/${productId}`);
    },
    addPromotion() {
      this.$router.push('/promotions/create');
    },
  },
};
</script>

<style scoped>

</style>
