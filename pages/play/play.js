// index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    payAmt: null,
    payActive: 50,
    payType: 2, // 1: 先充后付 2: 充值按次付费
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData:
      wx.canIUse('open-data.type.userAvatarUrl') &&
      wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
  },

  pickPayType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      payType: type,
    });
  },

  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    });
  },

  handlePayAmt(e) {
    const amt = e.detail.value;
    this.setData({
      payAmt: amt,
      payActive: 0,
    });
  },

  selectPayAmt(e) {
    const amt = e.currentTarget.dataset.amt;

    this.setData({
      payAmt: amt,
      payActive: amt,
    });
  },

  handlePayAmtFocus(e) {
    this.setData({
      payActive: 0,
      payAmt: e.detail.value,
    });
  },

  requestPlayParams() {
    app
      .req('/wallet/chargeMoney', {
        amt: this.data.payAmt,
      })
      .then(res => {
        wx.pro
          .requestPayment({
            timeStamp: res.data.timeStamp,
            nonceStr: res.data.nonceStr,
            package: res.data.packageStr,
            signType: res.data.signType,
            paySign: res.data.paySign,
          })
          .then(res => {
            wx.switchTab({
              url: '/pages/index/index',
            });
          })
          .catch(err => {
            wx.showModal({
              title: '支付失败',
              content: '支付失败，请重新支付',
              showCancel: false,
            });
          })
          .finally(() => {
            console.log('finally');
            console.log('complete', res);
          });
      });
  },

  onShow() {
    this.getTabBar().setData({
      selected: 1,
    });
  },

  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      });
    }
  },

  unbindWechatPay() {
    wx.showModal({
      title: '解绑微信支付',
      content: '解绑后，您将无法使用微信支付，是否继续？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      },
    });

    // wx.openBusinessView({
    //   businessType: 'wxpayScoreDisable',
    //   success(res) {
    //     //dosomething
    //   },
    // });
  },

  bindWechatPay() {
    wx.showModal({
      title: '绑定微信支付',
      content: '绑定后，您将可以使用微信支付，是否继续？',
      success(res) {
        if (res.confirm) {
          wx.openBusinessView({
            businessType: 'wxpayScoreEnable',
            success(res) {
              //dosomething
            },
          });
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      },
    });
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: res => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      },
    });
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },

  getUserPlayCredentials() {
    wx.openBusinessView({
      businessType: 'wxpayScoreEnable',
      extraData: {
        apply_permissions_token: '1230000109',
      },
      success(res) {
        //dosomething
        console.log('success', res);
      },
      fail(msg) {
        //dosomething
        console.log('fail', msg);
      },
      complete() {
        //dosomething
        console.log('complete');
      },
    });
  },
});
