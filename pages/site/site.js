// logs.js
const util = require('../../utils/util.js');
const app = getApp();

Page({
  data: {
    logs: [],
    stationList: [],
    deviceCost: 0,
    categoryId: 0
  },

  onShow() {
  },

  onLoad() {
    // this.setData({
    //   deviceCost: app.globalData.deviceCost,
    // });
    // console.log(this.options);
    this.fetchStationList(this.options.categoryId);
  },

  async fetchStationList(categoryId) {
    console.log(categoryId);
    try {
      const res = await app.req('/station/list', {categoryId});
      this.setData({
        stationList: res.data,
        categoryId: categoryId
      });
    } catch (err) {
      console.error('获取站点列表时出错：', err);
    }
    
  },

  scanCode() {
    wx.pro.scanCode().then(res => {
      console.log(res);
      const pathDecode = decodeURIComponent(res.result);
      console.log(pathDecode);
      const val = pathDecode.split("?")[1].split('=')[1];
      if (!val) {
        wx.showToast({
          title: '输入错误',
          icon: 'none',
        });
        return;
      }
      app.req('/station/add', {
        codeNum: val,
      }).then(res => {
        console.log(res);
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000,
        });
        this.fetchStationList();
      });
    });
  },

  addStation() {
    wx.navigateTo({
      url: '../bind/bind?isAddNewStation=true',
    });
  },

  navToIncome() {
    wx.navigateTo({
      url: '../income/income',
    });
  },

  navToCostDetails2() {
    wx.navigateTo({
      url: '../wallet-detail2/wallet-detail2',
    });
  },

  navToBind(e) {
    const { stationid } = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../bind/bind?stationId=' + stationid,
    });
  },
});
