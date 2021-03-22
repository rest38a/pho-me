<template>
    <q-page class="q-pb-xl">
        <q-table
                title="Интерьеры"
                :data="interiors"
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
               @click="addEntity()"/>
    </q-page>
</template>

<script>
import keysToCamel from '../../helpers/toCamelCase';

export default {
  name: 'Interiors',
  mounted() {
    this.$axios.get('/api/photo')
      .then(({ data }) => {
        const camelData = keysToCamel(data.photos);
        this.interiors.splice(0, this.interiors.length, ...camelData);
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
        { name: 'preview', label: 'Превью', field: 'preview' },
        { name: 'edit', label: 'редактировать', field: 'edit' },
      ],
      interiors: [
      ],
    };
  },
  methods: {
    editPromotio(productId) {
      this.$router.push(`/interior/${productId}`);
    },
    addEntity() {
      this.$router.push('/interior/create');
    },
  },
};
</script>

<style scoped>

</style>
