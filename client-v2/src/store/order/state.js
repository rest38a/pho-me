export default function () {
  return {
    defaultState: [],
    orderProducts: [],
    orderMenu: [],
    categoriesMenu: [],
    promoCodes: [],
    promoCode: {
      value: null,
      product: null,
      hasUsed: false,
    },
    currentOrder: {
      id: null,
      sourceId: process.env.sourceList.SITE,
      comment: null,
      isDelete: false,
      isApprove: false,
      needConfirm: true,
      fullForm: true,
      clientInfo: {
        client: {
          id: null,
          name: null,
          // hash: sha256(new Date().toString()).toString(),
          token: null,
        },
        phone: '+7 (',
        phoneString: null,
        addressString: null,
        address: {
          id: null,
          apartment: null,
          floor: null,
          entrance: null,
          dadata: null,
          type: null,
        },
      },
      deliveryInfo: {
        date: null,
        time: null,
        isCheck: false,
        dateCheck: null,
        type: process.env.DELIVERY_TYPE_LIST.DELIVERY,
        department: null,
      },
      payments: [
        {
          type: { id: process.env.PAIMENT_TYPES.CASH },
          sum: null,
          paymentLink: null,
          name: '',
        },
      ],
      discount: null,
      orderStatuses: [],
      products: [],
      forks: '',
      early: true,
    },
  };
}
