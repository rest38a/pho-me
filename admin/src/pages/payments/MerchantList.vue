<template >
    <q-page class="">
        <q-table
                title="Мерчанты"
                :data="paymentTypes"
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
                           @click="editFeedback(props.row.id)"/>
                </q-td>
            </template>
        </q-table>
        <q-btn color="primary" class='fixed-bottom-right q-ma-md' label="Добавить"
               @click="createItem"/>
    </q-page>
</template >

<script >
export default {
  name: 'MerchantList',
  data() {
    return {
      paymentTypes: [],
      columns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          field: (row) => row.id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'name',
          label: 'Название',
          align: 'center',
          field: 'name',
        },
        {
          name: 'isActive',
          align: 'center',
          label: 'Работает',
          field: (row) => (row.isActive === 0 ? ' нет' : 'да'),
        },
        {
          name: 'edit',
          align: 'center',
          label: 'редактировать',
          field: 'edit',
        },
      ],
    };
  },
};
</script >

<style scoped >

</style >
