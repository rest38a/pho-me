<template>
  <div>
  <div>
    <q-btn
      flat
      class="column q-ml-lg q-px-sm pho-btn pho-btn-delivery-zones"
      no-caps
      @click="showMap = !showMap"
    >
      <img src="/icons/location-baloon.svg" alt="" class="q-mr-sm"/>
      <div>Зона доставки</div>
    </q-btn>
  </div>
  <q-dialog v-model="showMap">
    <q-card style="min-width: 80%">
      <q-card-section>
        <div class="text-h6">
          Зона доставки
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="row">
          <div class="row items-center">
            <div class="yellow-zone"/>
            <div>от 800 руб</div>
          </div>
          <div class="row items-center">
            <div class="blue-zone pl-3"/>
            <div>от 1100 руб</div>
          </div>
          <div class="row items-center q-ml-md-md">
            <div class="purple-zone pl-3"/>
            <div>от 1400 руб</div>
          </div>
          <div class="row items-center">
            <div class="green-zone pl-3"/>
            <div>от 1700 руб</div>
          </div>
        </div>
        <yandex-map
          :coords="centerMap"
          style="width: 100%; height: 600px"
          zoom="12"
        >
          <ymap-marker
            v-for="(item, index) in dsZonesPriced.features"
            :key="index"
            :balloon="{
                body: item.properties.description,
              }"
            :coords="getPriceZoneCoords(item)"
            :marker-fill="{
                color: item.properties.fill,
                opacity: item.properties['fill-opacity'],
              }"
            :marker-stroke="{
                color: item.properties.stroke,
                width: item.properties['stroke-width'],
                opacity: item.properties['stroke-opacity'],
              }"
            :marker-id="'m' + index"
            marker-type="Polygon"
          />
          <ymap-marker
            v-if="coords.length !== 0"
            :coords="[coords[0], coords[1]]"
            marker-id="42m"
            marker-type="Placemark"
          />
          <ymap-marker
            :coords="[ourDepartment[0], ourDepartment[1]]"
            marker-id="ourMap"
            hint-content="Pho Me"
            marker-type="Placemark"
            :properties="departmentProperty"
          />
        </yandex-map>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn v-close-popup flat label="OK" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
  </div>
</template>

<script>
import YmapConstructor from 'boot/yandex-map-constructor.json';
import { loadYmap } from 'vue-yandex-maps';

export default {
  name: 'DeliveryZones',
  data() {
    return {
      showMap: false,
      isMounted: false,
      centerMap: [52.286191, 104.297709],
      ourDepartment: [52.27333480057664, 104.29042273754133],
      dsZonesPriced: YmapConstructor,
      coords: [],
      departmentProperty: {
        description: 'Наш ресторан',
        iconCaption: 'Фо Ми',
        'marker-color': '#f371d1',
      },
    };
  },
  methods: {
    getPriceZoneCoords(item) {
      const result = item.geometry.coordinates[0];
      return [result];
    },
  },
  async mounted() {
    const settings = {
      apiKey: '7df138bc-f837-4e1b-b1c3-9790e63279b0',
      lang: 'ru_RU',
      coordorder: 'latlong',
      version: '2.1',
    };
    await loadYmap(settings);
    // eslint-disable-next-line
    this.ymapsObj = ymaps;

    await this.dsZonesPriced.features.forEach((feature, featureInd) => {
      if (
        Array.isArray(
          this.dsZonesPriced.features[featureInd].geometry.coordinates[0],
        )
      ) {
        this.dsZonesPriced.features[featureInd].geometry.coordinates[0].forEach(
          (item, idex) => {
            const temp0 = item[0];
            const temp1 = item[1];
            this.dsZonesPriced.features[featureInd].geometry.coordinates[0][
              idex][0] = temp1;
            this.dsZonesPriced.features[featureInd].geometry.coordinates[0][
              idex][1] = temp0;
          },
        );
      }
    });
  },
};
</script>

<style scoped>
.pho-btn-delivery-zones {
  line-height: 30px;
  height: 49px;
}

.pho-btn {
  margin: 10px 10px 10px 0px;
  border-radius: 10px;
  background: #fcd000;
  border: 2px solid #fcd000;
  color: #4f4f4f;
  font-size: 22px;
  font-family: lcm;
  font-weight: 500;
}

.yellow-zone {
  width: 50px;
  height: 30px;
  border-radius: 20px;
  background: #ffd21e;
  margin: 20px 10px 20px 0;
}

.blue-zone {
  width: 50px;
  height: 30px;
  border-radius: 20px;
  background: #82cdff;
  margin: 20px 10px 20px 20px;
}

.purple-zone {
  width: 50px;
  height: 30px;
  border-radius: 20px;
  background: #f371d1;
  margin: 20px 10px 20px 0px;
}

.green-zone {
  width: 50px;
  height: 30px;
  border-radius: 20px;
  background: #56db40;
  margin: 20px 10px 20px 20px;
}
</style>
