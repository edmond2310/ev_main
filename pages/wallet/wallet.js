// logs.js
const util = require('../../utils/util.js');
const app = getApp();

Page({
  data: {
    logs: [],
    balance: 0,
  },

  onLoad() {
    // 获取路由参数
    this.setData({
      balance: this.options.balance,
    });

    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log,
        };
      }),
    });
  },

  viewDetail(e) {
    const { timeStamp } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/wallet-detail/wallet-detail?timeStamp=${timeStamp}`,
    });
  },

  viewPlayTab(e) {
    wx.switchTab({
      url: '/pages/play/play',
    });
  },
});
