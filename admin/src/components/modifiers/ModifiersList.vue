<template>
    <div class="q-gutter-md">
        <div class="text-h6">{{ ruName }}</div>
        <div class="row"
             :key="modifierItem.product.id"
             v-for="modifierItem in modifiersType">
            <div class="col-4" v-if="type !== 'size'">
                {{ modifierItem.name || modifierItem.product.name }}
                <span v-if="modifierItem.product.mName">({{ modifierItem.product.name }})</span>
                <span v-if="modifierItem.addPrice">
                    ({{ modifierItem.addPrice }})
                </span>
            </div>
            <div class="col-4" v-else>
                {{ modifierItem.product.name }}
                <span v-if="modifierItem.pName">
                    (позиция: {{ modifierItem.pName }})
                </span>
                <span v-if="modifierItem.addPrice">
                    (цена: {{ modifierItem.addPrice }})
                </span>
            </div>
            <div class="col-3">
                <q-btn color=""
                       class="text-amber"
                       cicle
                       @click="removeFunction(modifierItem)" icon="delete"/>
            </div>
        </div>
        <div class="row q-col-gutter-lg q-py-md">
            <div class="col-4">
                <q-select outlined
                          v-model="newModifier.product"
                          option-label="name"
                          option-value="id"
                          :options="products" :label="ruName"/>
            </div>
            <div class="col-3">
                <q-input outlined v-model="newModifier.name" label="Имя"/>
            </div>
            <div class="col-2">
                <q-input outlined v-model="newModifier.addPrice" label="Цена"/>
            </div>
        </div>
        <div class="row">
            <div class="col-3">
                <q-btn color="primary"
                       @click='proxyAddFunction(newModifier)' label="Добавить модификатор"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ModifiersList',
  props: {
    ruName: {
      type: String,
      default: () => 'Модификаторы',
    },
    products: {
      type: Array,
      default: () => [],
    },
    type: String,
    modifiersList: Array,
    addFunction: Function,
    removeFunction: Function,
  },
  data() {
    return {
      newModifier: {
        product: null,
        type: this.type,
        addPrice: 0,
        name: null,
      },
    };
  },
  computed: {
    modifiersType() {
      return this.modifiersList.filter((item) => {
        if (item.type === this.type) return true;

        if (this.type === 'main'
          && item.type === undefined) return true;
        return false;
      });
    },
  },
  methods: {
    proxyAddFunction() {
      const copyNewModifiers = JSON.parse(JSON.stringify(this.newModifier));
      copyNewModifiers.pName = copyNewModifiers.product.name;
      copyNewModifiers.product.name = this.newModifier.name;
      this.addFunction(copyNewModifiers);
      this.resetNewModifier();
    },
    resetNewModifier() {
      this.newModifier = {
        product: null,
        type: this.type,
        addPrice: 0,
      };
    },
  },
};
</script>

<style scoped>

</style>
