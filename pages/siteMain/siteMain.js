// logs.js
const util = require('../../utils/util.js');
const app = getApp();

Page({
  data: {
    logs: [],
    categoryList: [],
    stationList: [],
    deviceCost: 0,
  },

  onShow() {
    this.fetchCategoryList();
    this.fetchStationList();
  },

  onLoad() {
  },

  async fetchCategoryList() {
    try {
      const res = await app.req('/stationCategory/list', {});
      this.setData({
        categoryList: res.data,
      });
    } catch (err) {
      console.error('获取站点类别时出错：', err);
    }
  },

  async fetchStationList() {
    try {
      const res = await app.req('/station/list', {categoryId: 0});
      this.setData({
        stationList: res.data,
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
