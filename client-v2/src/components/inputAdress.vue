<template>
    <div>
        <div>
            <div class="relative-position">
                <input type="text"
                          :value="inputValue"
                          @input="proxyInputFunc"
                          @blur="blurForm"
                          class="inputAddress"
                       :class="{'has-error': errors.length > 0}"
                />
                <div class="state_icon" v-if="valid">
                    <q-icon v-if="errors.length === 0"
                            size="xs"
                            class="text-positive"
                            name="done"
                    />
                    <q-icon v-if="errors.length > 0"
                            size="xs"
                            class="text-negative"
                            name="error"
                    />
                </div>
            </div>
            <div class="relative-position">
                <div class="autocomplete" v-if="showHint">
                    <div class="autocomplete-item"
                         v-for="itemHint in options"
                         :key="itemHint.value"
                         @click="chooseAddress(itemHint)"
                    >
                        {{ itemHint.value }}
                    </div>
                </div>
            </div>
            <div>
                <div class='error'
                     v-for="error in errors"
                     :key="error">
                    {{ error }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'inputAddress',
  props: {
    inputFunc: {
      type: Function,
      required: true,
    },
    inputValue: {
      type: String,
      required: false,
      default: null,
    },
    options: {
      type: Array,
      required: false,
      default: () => [],
    },
    valid: {
      type: Boolean,
      required: true,
    },
    hasHouse: {
      type: Boolean,
      required: true,
    },
    isInZone: {
      type: Boolean,
      required: false,
      default: true,
    },
    startBreak: {
      type: Date,
      required: false,
    },
    finishBreak: {
      type: Date,
      required: false,
    },
    getPriceZoneCoords: {
      type: Function,
    },
    isInAdditionalZone: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
    //   usersCoordsLat: this.currentOrder.clientInfo.address.dadata.data.
      errors: [],
      showDate: false,
      proxyDate: new Date(),
      showHint: false,
    };
  },
  watch: {
    valid(newState) {
      if (newState === false) {
        this.errors = [];
        this.errors.push('Выберите адрес из списка');
      } else {
        this.errors = [];
      }
    },
    isInZone(newState) {
      if (newState === false && this.isInAdditionalZone) {
        this.errors = [];
        const startHours = this.startBreak.getHours();
        const startMinutes = this.startBreak.getMinutes();
        const finishHours = this.finishBreak.getHours();
        const finishMinutes = this.finishBreak.getMinutes();
        this.errors.push(`Мы можем доставить до вашего адреса до ${startHours}:${startMinutes} или после ${finishHours}:${finishMinutes} `);
      } else if (newState === false && !this.isInAdditionalZone) {
        this.errors = [];
        this.errors.push('К сожалению, мы не доставляем заказы на ваш адрес. Но вы можете забрать пиццу самовывозом.');
      } else {
        this.errors = [];
      }
    },
    hasHouse(newState) {
      if (newState === false) {
        this.errors = [];
        this.errors.push('Укажите, пожалуйста, адрес вместе с номером дома');
      } else {
        this.errors = [];
      }
    },
  },
  methods: {
    ...mapMutations('order', ['setAddressDadata']),
    proxyInputFunc(element) {
      this.showHint = true;
      this.inputFunc(element);
    },
    chooseAddress(dadataAddress) {
      this.setAddressDadata(dadataAddress);
      this.validForm();
      this.showHint = false;
    },
    validForm() {
      if (this.valid === false) {
        this.errors = [];
        this.errors.push('Выберите адрес из списка');
      }
      if (!this.isInZone && this.isInAdditionalZone) {
        this.errors = [];
        const startHours = this.startBreak.getHours();
        const startMinutes = this.startBreak.getMinutes();
        const finishHours = this.finishBreak.getHours();
        const finishMinutes = this.finishBreak.getMinutes();
        this.errors.push(`Мы можем доставить до вашего адреса до ${startHours}:${startMinutes} или после ${finishHours}:${finishMinutes} `);
      } else if (!this.isInZone && !this.isInAdditionalZone) {
        this.errors = [];
        this.errors.push('К сожалению, пока, мы не доставляем на ваш адрес. Но вы можете забрать пиццу самовывозом.');
      }
      if (this.hasHouse === false) {
        this.errors = [];
        this.errors.push('Укажите пожалуйста адрес вместе с номером дома');
      }
    },
    blurForm() {
      setTimeout(() => {
        this.showHint = false;
        this.validForm();
      }, 500);
    },
  },
};
</script>

<style scoped>
    .autocomplete {
        position: absolute;
        background: #fff;
        z-index: 1000000000;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2),
        0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
    }
    .autocomplete-item{
        padding: 10px 20px;
    }
    .autocomplete-item:hover {
        background: #d4d4d4;
    }
    .bee-input{
        padding-right: 10px;
    }

    .bee-input::-moz-focus-inner {
        border: 0;
        border: 1px solid #FABD00;
    }
    .bee-input.has-error, .bee-input.has-error {
        outline: none;
        border: 1px solid red;
    }
    .error {
        padding: 3px 0 0 5px;
        color: red;
        font-size: 11px;
        transition-duration: .2s;
    }
    .state_icon {
        position: absolute;
        right: 10px;
        top: 10px;
        background: #fff;
        padding-left: 5px;
    }

.inputAddress {
    width: 100%;
    height: 40px;
    padding: 0 12px;
    border-radius: 4px;
    border: 1px solid #bbbbbb;
    outline: #1976D2;
}
.inputAddress:hover {
    border-color: black;
    border-width: 1px;
}
</style>
