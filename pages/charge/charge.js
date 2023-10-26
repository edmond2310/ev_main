// logs.js
const util = require('../../utils/util.js');
const app = getApp();

Page({
  data: {
    deviceCost: 0,
    stationId: '',
    pricesList: [
      {
        minPower: 0,
        maxPower: 0,
        price: 0,
      },
      {
        minPower: 0,
        maxPower: 0,
        price: 0,
      },
      {
        minPower: 0,
        maxPower: 0,
        price: 0,
      },
    ],
  },

  onLoad() {
    this.setData({
      deviceCost: app.globalData.deviceCost,
    });

    this.setData({
      stationId: this.options.stationId,
    });

    this.getPrices(this.data.stationId);
  },

  getPrices(id) {
    app.req('/station/getPrices', { id: id }).then(res => {
      this.setData({
        pricesList: res.data,
      });
    });
  },

  changePrices() {
    app
      .req('/station/setPrices', {
        id: this.data.stationId,
        prices: this.data.pricesList,
      })
      .then(res => {
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000,
        });
      });
  },

  bindInput(e) {
    const dataset = e.currentTarget.dataset;
    const index = dataset.index;
    const value = e.detail.value;
    const name = dataset.name;

    const pricesList = this.data.pricesList;
    pricesList[index].price = value;

    this.setData({
      pricesList: pricesList,
    });
  },
});
