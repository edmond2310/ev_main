// index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    recordsList: [],
  },

  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    });
  },

  onShow() {
    this.getTabBar().setData({
      selected: 2,
    });

    app.req('/charger/recodes').then(res => {
      console.log('/charger/recodes', res);
      this.setData({
        recordsList: res.data,
      });
    });
  },

  onLoad() {},
});
