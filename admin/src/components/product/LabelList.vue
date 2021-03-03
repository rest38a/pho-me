<template >
    <div class="q-gutter-md">
        <div class="text-h6">{{ name }}</div>
        <div class="row"
             :key="labelItem.id"
             v-for="labelItem in productLabels">
            <div class="col-4">
                {{ labelItem.name }}
            </div>
            <div class="col-3">
                <q-btn color=""
                       class="text-amber"
                       cicle
                       @click="removeFunction(labelItem)" icon="delete"/>
            </div>
        </div>
        <div class="row q-col-gutter-lg q-py-md">
            <div class="col-4">
                <q-select outlined
                          v-model="newLabel"
                          option-label="name"
                          option-value="id"
                          :options="labels" :label="name"/>
            </div>
        </div>
        <div class="row">
            <div class="col-3">
                <q-btn color="primary"
                       @click='proxyAddFunction(newLabel)' label="Добавить ярлык"/>
            </div>
        </div>
    </div>
</template >

<script >
export default {
  name: 'LabelList',
  props: {
    name: String,
    productLabels: {
      Array,
      default: () => [],
    },
    labels: {
      Array,
      default: () => [],
    },
    addFunction: Function,
    removeFunction: Function,
  },
  data() {
    return {
      newLabel: {
        name: '',

      },
    };
  },
  methods: {
    proxyAddFunction() {
      const copyNewModifiers = JSON.parse(JSON.stringify(this.newLabel));
      this.addFunction(copyNewModifiers);
      this.resetNewModifier();
    },
    resetNewModifier() {
      this.newLabel = {
        name: '',
      };
    },
  },
};
</script >

<style scoped >

</style >
