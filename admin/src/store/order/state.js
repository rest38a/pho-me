export default function () {
  return {
    currentOrder: {
      id: null,
      sourceId: process.env.sourceList.PHONE,
      comment: null,
      isDelete: false,
      isApprove: false,
      clientInfo: {
        client: {
          id: null,
          name: null,
          hash: null,
        },
        phone: '+7 (',
        phoneString: null,
        addressString: null,
        address: { id: null },
      },
      deliveryInfo: {
        date: null,
        time: null,
        isCheck: false,
        dateCheck: null,
        type: process.env.DELIVERY_TYPE_LIST.DELIVERY,
      },
      payments: [],
      orderStatuses: [],
      products: [],
      error: null,
      fullQuery: null,
    },
    newPayment: {
      type: null,
      sum: null,
      isPay: false,
      hash: (new Date()).getTime(),
    },
    isNewProductClean: true,
    nearTime: {
      isCheck: false,
      dateCheck: null,
      time: [],
    },
  };
}
