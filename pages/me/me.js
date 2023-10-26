// logs.js
const util = require('../../utils/util.js');
const app = getApp();

Page({
  data: {
    balance: 0,
    deviceCost: 0,
    userInfo: {
    },
    avatarUrl: '',
    nickName: '',
  },

  onShow() {
    this.getTabBar().setData({
      selected: 3,
    });

    app.req('/wallet/balance', {}).then(res => {
      this.setData({
        balance: res.data.balance,
        deviceCost: res.data.deviceCost,
      });

      app.globalData.deviceCost = res.data.deviceCost;

      // if (app.globalData.hasUserInfo) {
      //   this.setData({
      //     userInfo: app.globalData.userInfo,
      //     avatarUrl: app.globalData.avatarUrl,
      //     nickName: app.globalData.nickName,
      //   });
      // }
    });
  },

  onLoad() {
    this.setData({
      userInfo: app.globalData.userInfo,
    });
    // this.getUserProfile();
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return {
    //       date: util.formatTime(new Date(log)),
    //       timeStamp: log,
    //     };
    //   }),
    // });
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail;
    this.setData({
      avatarUrl,
    });
  },

  navToAbout() {
    wx.navigateTo({
      url: '/pages/about/about',
    });
  },

  navToContact() {
    wx.navigateTo({
      url: '/pages/contact/contact',
    });
  },

  navToSite() {
    wx.navigateTo({
      url: '/pages/siteMain/siteMain',
    });
  },

  // getUserProfile(e) {
  //   wx.getUserProfile({
  //     desc: '展示用户信息',
  //     success: res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true,
  //       });
  //     },
  //   });
  // },
});
