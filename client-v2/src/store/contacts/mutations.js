import YmapConstructor from 'boot/yandex-map-constructor.json';

export function setContacts(state, contacts) {
  state.contacts = contacts;
}

export function setMap(state) {
  const dsZonesPriced = YmapConstructor;
  dsZonesPriced.features.forEach((feature, featureInd) => {
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
            idex
          ][0] = temp1;
          this.dsZonesPriced.features[featureInd].geometry.coordinates[0][
            idex
          ][1] = temp0;
        },
      );
    }
  });
  state.zonesPriced = [...this.dsZonesPriced];
}

export function mapIsLoad(state) {
  state.mapLoad = true;
}
