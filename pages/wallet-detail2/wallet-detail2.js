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

  onLoad() {
    app.req('/wallet/details2', {}).then(res => {
      this.setData({
        recordsList: res.data,
      });
    });
  },
});
