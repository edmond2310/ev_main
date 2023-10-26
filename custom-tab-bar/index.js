const app = getApp();

Component({
  data: {
    selected: 0,
    color: '#7A7E83',
    selectedColor: '#3cc51f',
    list: [
      {
        index: 0,
        pagePath: '/pages/index/index',
        iconPath: '/images/bolt.svg',
        selectedIconPath: '/images/bolt-active.svg',
        text: '充电',
      },
      {
        index: 1,
        pagePath: '/pages/play/play',
        iconPath: '/images/sack-dollar.svg',
        selectedIconPath: '/images/sack-dollar-active.svg',
        text: '支付',
      },
      {
        index: 2,
        pagePath: '/pages/bill/bill',
        iconPath: '/images/file-invoice.svg',
        selectedIconPath: '/images/file-invoice-active.svg',
        text: '充电记录',
      },
      {
        index: 3,
        pagePath: '/pages/me/me',
        iconPath: '/images/user.svg',
        selectedIconPath: '/images/user-active.svg',
        text: '我的',
      },
    ],
  },
  attached() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;

      this.setData({
        selected: data.index,
      });

      wx.switchTab({
        url,
        success: res => {
          // const page = getCurrentPages().pop();
          // if (page == undefined || page == null) return;
          // page.onShow();
        },
      });

      // if (app.globalData.hasUserInfo) {
      //   const data = e.currentTarget.dataset;
      //   const url = data.path;

      //   this.setData({
      //     selected: data.index,
      //   });

      //   wx.switchTab({ url });
      //   return;
      // }
      // wx.getUserProfile({
      //   desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      //   success: res => {
      //     console.log(res);
      //     this.setData({
      //       userInfo: res.userInfo,
      //       hasUserInfo: true,
      //     });

      //     app.globalData.userInfo = res.userInfo;
      //     app.globalData.hasUserInfo = true;
      //     app.globalData.avatarUrl = res.userInfo.avatarUrl;
      //     app.globalData.nickName = res.userInfo.nickName;

      //     // app.req('/account/profile/update', {
      //     //   nickName: res.userInfo.nickName,
      //     //   avatarUrl: res.userInfo.avatarUrl,
      //     //   city: res.userInfo.city,
      //     //   country: res.userInfo.country,
      //     //   gender: res.userInfo.gender,
      //     //   language: res.userInfo.language,
      //     //   province: res.userInfo.province,
      //     // });

      //     const data = e.currentTarget.dataset;
      //     const url = data.path;

      //     this.setData({
      //       selected: data.index,
      //     });

      //     wx.switchTab({ url });
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
  },
});
