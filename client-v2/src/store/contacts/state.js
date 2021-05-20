const zonesPriced = require('boot/yandex-map-constructor.json');

zonesPriced.features.forEach((feature, featureInd) => {
  if (
    Array.isArray(
      zonesPriced.features[featureInd].geometry.coordinates[0],
    )
  ) {
    zonesPriced.features[featureInd].geometry.coordinates[0].forEach(
      (item, idex) => {
        const temp0 = item[0];
        const temp1 = item[1];
        zonesPriced.features[featureInd].geometry.coordinates[0][
          idex
        ][0] = temp1;
        zonesPriced.features[featureInd].geometry.coordinates[0][
          idex
        ][1] = temp0;
      },
    );
  }
});

export default function () {
  return {
    contacts: {},
    dsZonesPriced: zonesPriced,
  };
}
