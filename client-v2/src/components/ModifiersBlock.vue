<template>
  <div class="full-width modifiers-box">
    <div class="q-pb-sm row items-center display-none-mini-class">
      <div
        class="switch_area row col-grow items-center items-stretch "
        v-if="sizeModifiers.length > 1"
      >
        <div
          class="column justify-center col switch_item items-center content-center"
          v-for="modifierItem in sizeModifiers"
          :key="modifierItem.id"
          @click.stop="setModifierFunction(modifierItem, 'size')"
          :class="{
            active_switch:
              userModifiers.size.product.id === modifierItem.product.id,
          }"
        >
          {{ modifierItem.name || modifierItem.product.name }}
        </div>
      </div>
    </div>
    <div class="q-pb-sm row items-center display-none-maxi-class">
      <q-select class="select_area row col-grow items-center "
                 v-if="sizeModifiers.length > 1"
                 @input="(modifierItem) => setModifierFunction(modifierItem, 'size')"
                 :value="userModifiers.size"
                 :options="sizeModifiers"
                 option-label="name"
                 behavior="menu"
                 transition-show="scale"
                 outlined
                dense
        transition-hide="scale">
            </q-select>
    </div>
    <div
      class="switch_area row col-grow items-center display-none-mini-class items-stretch "
      v-if="mainModifiers.length > 1"
    >
      <div
        class="column justify-center col switch_item items-center content-center"
        v-for="modifierItem in mainModifiers"
        :key="modifierItem.id"
        @click.stop="setModifierFunction(modifierItem, 'main')"
        :class="{
          active_switch:
            userModifiers.main.product.id === modifierItem.product.id,
        }"
      >
        {{ modifierItem.name ? modifierItem.name : modifierItem.product.name }}
      </div>
    </div>
    <div class="q-pb-sm row items-center display-none-maxi-class">
       <q-select class="select_area row col-grow items-center "
                 v-if="mainModifiers.length > 1"
                 @input="(modifierItem) => setModifierFunction(modifierItem, 'main')"
                 :value="userModifiers.main"
                 :options="mainModifiers"
                 option-label="name"
                 behavior="menu"
                 transition-show="scale"
                 outlined
                 dense
        transition-hide="scale">
            </q-select>
    </div>
    <div
      class="wrapper-modifires"
      v-if="showAddModifiers && addModifiers.length > 0"
    >
      <div class="h-left-shavron mobile-hide" @click="goTo(step)">
        <!-- <img src="/statics/icons/left-add-shevron.svg" alt=""> -->
      </div>
      <div class="q-pr-md mobile-only"></div>
      <div class="track-wrapper">
        <div
          class="slide-track"
          :style="`transform: translateX(${translate}px)`"
        >
          <div
            class="add-modifire-card col-4"
            :key="modifierAddItem.product.id"
            v-for="modifierAddItem in addModifiers"
            v-ripple
            @click="setModifierFunction(modifierAddItem, 'add')"
            :class="{ 'add-modifire-card-active': added(modifierAddItem) }"
          >
            <div class="name-add-modifire">
              {{ modifierAddItem.name }}
            </div>
            <div>
            </div>
            <div class="row">
              <div class="col">{{ modifierAddItem.product.base_Price }} р</div>
              <div class="col-auto">
                <q-btn
                  flat
                  class="button-md full-width add-modifire-btn"
                  :class="{ 'add-modifire-btn-active': added(modifierAddItem) }"
                  size="md"
                >
                  <div class="row items-center justify-center">
                    <q-icon
                      class="plus_icon_mobile"
                      v-if="added(modifierAddItem)"
                      size="xs"
                      name="done"
                    />
                    <div v-else class="plus_icon_mobile">+</div>
                  </div>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-right-shavron mobile-hide" @click="goTo(-step)">
        <!-- <img src="/statics/icons/left-add-shevron.svg"
                     alt=""> -->
      </div>
    </div>
  </div>
</template>

<script>
import { dom } from 'quasar';

export default {
  name: 'ModifiersBlock',
  props: {
    modifiers: {
      type: Array,
    },
    userModifiers: {
      type: Object,
    },
    setModifierFunction: {
      type: Function,
    },
    showAddModifiers: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      translate: 0,
      step: 87,
      selectedSize: {},
      selectedMain: {},
      selected_val: [],
    };
  },
  computed: {
    mainModifiers() {
      return this.modifiers.filter((item) => {
        if (item.type === undefined) return true;
        if (item.type === 'main') return true;
        return false;
      });
    },
    sizeModifiers() {
      return this.modifiers.filter((item) => {
        if (item.type === undefined) return true;
        if (item.type === 'size') return true;
        return false;
      });
    },
    addModifiers() {
      return this.modifiers.filter((item) => {
        if (item.type === undefined) return true;
        if (item.type === 'add') return true;
        return false;
      });
    },
    widthDom() {
      return dom.width(window);
    },
  },
  methods: {
    goTo(step) {
      const needRight = this.translate >= (this.addModifiers.length - 3) * -this.step;
      if (this.translate !== 0 && step > 0) {
        this.translate += step;
      }
      if (needRight && step < 0) {
        this.translate += step;
      }
    },
    added(modifire) {
      // eslint-disable-next-line
      const needModifire = this.userModifiers.add.filter((item) => {
        return item.product.id === modifire.product.id;
      });
      return needModifire.length > 0;
    },
    setLastSizeModifier() {
      if (this.sizeModifiers.length) {
        const lastModifier = this.sizeModifiers[this.sizeModifiers.length - 1];
        this.setModifierFunction(lastModifier, 'size');
      }
    },
    changeSizeOption(event) {
      console.log(event.target.value);
    },
  },
  mounted() {
    this.setLastSizeModifier();
  },
};
</script>

<style scoped lang="scss">
.modifiers-box {
  margin-bottom: 10px;
}

select:focus {
  outline: none;
}
.name-add-modifire {
  font-size: 12px;
  line-height: 10px;
  text-overflow: ellipsis;
}
.add-modifire-card {
  width: 80px;
  position: relative;
  height: 122px;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15), 0px 4px 3px rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  margin-right: 8px;
  margin-bottom: 8px;
  padding: 12px 7px 5px 10px;
  float: left;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  transition-duration: 1s;
}
.add-modifire-card-active {
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.15), 0px 0px 0px rgba(0, 0, 0, 0.03);
}
@mixin white-gradient {
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
}
.wrapper-modifires {
  position: relative;
  display: flex;
  width: calc(100% + 20px);
  margin-top: 10px;
  margin-right: -10px;
  margin-left: -30px;
  flex-direction: row;
  justify-items: center;
}
.track-wrapper {
  padding: 5px 0 0 5px;
  position: relative;
  width: calc(100% - 20px);
  overflow: hidden;
  flex-direction: row;
  justify-items: center;
  &::after {
    @include white-gradient;
    content: '';
    height: 100%;
    position: absolute;
    width: 50px;
    z-index: 2;
  }
  &::after {
    right: -15px;
    top: 0;
    transform: rotateZ(180deg);
  }
}
$animationSpeed: 40s;
.slide-track {
  display: flex;
  width: 100000000px;
  transition-duration: 0.2s;
}
.h-left-shavron {
  display: flex;
  flex-direction: row;
  justify-items: center;
  padding: 0 12px 0;
  opacity: 0.3;
}
.h-left-shavron:hover {
  opacity: 1;
  cursor: pointer;
}
.h-right-shavron {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-items: center;
  padding: 0 10px 0 15px;
  z-index: 100;
  transform: rotate(180deg);
}
.h-right-shavron:hover {
  opacity: 1;
  cursor: pointer;
}
.plus_icon_mobile {
  margin-top: -15px;
  padding: 2px;
  font-size: 20px;
}
.add-modifire-btn {
  width: 23px;
  height: 23px;
  background: #fabd00;
  border-radius: 8px;
}
.add-modifire-btn-active {
  background: #12d31a;
}
.switch_item {
  cursor: pointer;
  font-family: lcm;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  font-weight: 500;
}

.switch_area {
  background: #f2f2f2;
  border-radius: 10px;
  font-size: 12px;
  line-height: 22px;
  text-align: center;
  letter-spacing: 0.05em;
  color: #828282;
  padding: 3px;
  font-family: aer;
}

.select_area {
  background: white;
  border-radius: 10px;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: #828282;
  padding: 3px;
  font-family: tr;
  font-weight: 500;
}

.active_switch {
  background: #fff;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.15);
  border-radius: 9px;
  padding: 4px;
  cursor: pointer;
  color: #333333;
}
.display-none-maxi-class {
  display: none;
}
@media (max-width: 1023px) {
  .display-none-mini-class {
    display: none;
  }
  .display-none-maxi-class {
    display: flex;
  }
}
</style>
