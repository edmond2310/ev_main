// app.js
import { promisifyAll, promisify } from './utils/wx-promise-pro';
promisifyAll(); // promisify all wx‘s api
import { wxReq, baseURL, wxPost } from './utils/req';

App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || [];
    // logs.unshift(Date.now());
    // wx.setStorageSync('logs', logs);

    // wx.getUserProfile({
    //   desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    //   success: res => {
    //     console.log(res);
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true,
    //     });

    //     app.globalData.avatarUrl = res.userInfo.avatarUrl;
    //     app.globalData.nickName = res.userInfo.nickName;

    //     app.req('/account/profile/update', {
    //       nickName: res.userInfo.nickName,
    //       avatarUrl: res.userInfo.avatarUrl,
    //       city: res.userInfo.city,
    //       country: res.userInfo.country,
    //       gender: res.userInfo.gender,
    //       language: res.userInfo.language,
    //       province: res.userInfo.province,
    //     });
    //   },
    //   fail: err => {
    //     wx.showModal({
    //       title: '提示',
    //       content: '您拒绝了授权，将无法使用小程序',
    //       showCancel: false,
    //     });
    //   },
    // });
  },

  wxReq,
  req: wxReq,
  post: wxPost,

  globalData: {
    avatarUrl: '',
    nickName: '',
    userInfo: null,
    hasUserInfo: false,

    baseURL,
    deviceCost: 0,
  },
});
