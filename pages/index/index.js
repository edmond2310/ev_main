// index.js

// 获取应用实例
const app = getApp();

const log = require('../../utils/log.js');

Page({
  data: {
    stationId: '', // 充电站点ID
    codeNum: '', // 充电站点编码
    portNum: '', // 站点充电口
    deviceId: '',
    showPricesDialog: false,
    paymentType: 0,
    devicesList: [{
        ports: [{
            portNum: 1,
            status: 1, //1空闲 2占用 3离线
          },
          {
            portNum: 2,
            status: 1, //1空闲 2占用 3离线
          },
          {
            portNum: 3,
            status: 1, //1空闲 2占用 3离线
          },
          {
            portNum: 4,
            status: 1, //1空闲 2占用 3离线
          },
        ],
        positionNum: 1,
        status: 1,
      },
      {
        ports: [{
            portNum: 1,
            status: 1, //1空闲 2占用 3离线
          },
          {
            portNum: 2,
            status: 1, //1空闲 2占用 3离线
          },
          {
            portNum: 3,
            status: 1, //1空闲 2占用 3离线
          },
          {
            portNum: 4,
            status: 1, //1空闲 2占用 3离线
          },
        ],
        positionNum: 2,
        status: 1,
      },
      {
        ports: [{
            portNum: 1,
            status: 1, //1空闲 2占用 3离线
          },
          {
            portNum: 2,
            status: 1, //1空闲 2占用 3离线
          },
          {
            portNum: 3,
            status: 1, //1空闲 2占用 3离线
          },
          {
            portNum: 4,
            status: 1, //1空闲 2占用 3离线
          },
        ],
        positionNum: 3,
        status: 1,
      },
      {
        ports: [{
            portNum: 1,
            status: 1, //1空闲 2占用 3离线
          },
          {
            portNum: 2,
            status: 1, //1空闲 2占用 3离线
          },
          {
            portNum: 3,
            status: 1, //1空闲 2占用 3离线
          },
          {
            portNum: 4,
            status: 1, //1空闲 2占用 3离线
          },
        ],
        positionNum: 4,
        status: 1,
      },
    ],
    prices: [{
      "maxPower": 180,
      "minPower": 0,
      "price": 0.55
    }, {
      "maxPower": 360,
      "minPower": 180,
      "price": 0.65
    }, {
      "maxPower": 540,
      "minPower": 360,
      "price": 0.85
    }, {
      "maxPower": 800,
      "minPower": 540,
      "price": 1.00
    }, {
      "maxPower": 1200,
      "minPower": 800,
      "price": 1.50
    }],
    paymentTypeArray: [
      // {
      //   type: 1,
      //   value: '先充后付',
      // },
      {
        type: 2,
        value: '账户余额',
      },
    ],
    abortMode: 0,
    abortModeArray: [{
        type: 0,
        value: '充满自停',
      },
      {
        type: 1,
        value: '0.5小时',
      },
      {
        type: 2,
        value: '1小时',
      },
      {
        type: 3,
        value: '1.5小时',
      },
      {
        type: 4,
        value: '2小时',
      },
      {
        type: 5,
        value: '2.5小时',
      },
      {
        type: 6,
        value: '3小时',
      },
      {
        type: 7,
        value: '3.5小时',
      },
      {
        type: 8,
        value: '4小时',
      },
      {
        type: 9,
        value: '4.5小时',
      },
      {
        type: 10,
        value: '5小时',
      },
      {
        type: 11,
        value: '5.5小时',
      },
      {
        type: 12,
        value: '6小时',
      },
      {
        type: 13,
        value: '6.5小时',
      },
      {
        type: 14,
        value: '7小时',
      },
      {
        type: 15,
        value: '7.5小时',
      },
      {
        type: 16,
        value: '8小时',
      },
      {
        type: 17,
        value: '8.5小时',
      },
      {
        type: 18,
        value: '9小时',
      },
      {
        type: 19,
        value: '9.5小时',
      },
      {
        type: 20,
        value: '10小时',
      },
    ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') &&
      wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    pwdVal: '', // 输入的密码
    pwdValText: [], // 用于展示的密码
    payFocus: false, // 文本框焦点
    focusIdx: null,
    isSubmit: false,
  },

  checkWxAuth() {
    // 若已登录则直接返回
    if (this.data.hasUserInfo) return true;

    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: res => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });

        return true;
      },
      fail: err => {
        console.log(err);
        return false;
      },
    });
  },

  bindPickerPricesChange(e) {
    this.setData({
      price: e.detail.value,
    });
  },

  bindPickerAbortModeChange(e) {
    const timeLimit = this.data.abortModeArray[e.detail.value].type;

    this.setData({
      // abortMode: timeLimit,
      abortMode: e.detail.value,
    });
  },

  bindPickerPaymentChange(e) {
    this.setData({
      paymentType: e.detail.value,
    });
  },

  selectPort(event) {
    const target = event.currentTarget.dataset;

    if (!this.data.codeNum) {
      wx.showToast({
        title: '请先输入充电口编号',
        icon: 'none',
        duration: 2000,
      });

      return;
    }

    if (target.positionstatus !== 1) {
      wx.showToast({
        title: '该充电口已下线',
        icon: 'none',
        duration: 2000,
      });

      return;
    }

    if (target.status !== 1 || target.portnum === 3) {
      wx.showToast({
        title: '该充电口已被占用',
        icon: 'none',
        duration: 2000,
      });

      return;
    }

    this.setData({
      portNum: event.currentTarget.dataset.portnum,
      positionNum: event.currentTarget.dataset.positionnum,
      deviceId: event.currentTarget.dataset.deviceid,
    });
  },

  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
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
    console.log(e);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },

  setPortStatus(status) {
    // 1空闲 2占用 3离线
    if (status === 1) return '';
    if (status === 2) return 'busy';
    if (status === 3) return 'offline';
  },

  getPorts(code) {
    app.req('/charger/stationInfo', {
      codeNum: code
    }).then(res => {
      this.setData({
        devicesList: res.data.devices,
        prices: res.data.prices,
        codeNum: res.data.codeNum,
        stationId: res.data.id,
      });
    });
  },

  toLogin() {
    wx.pro
      .request('/account/wechat/login', {
        name: 'john',
      })
      .then(res => {
        this.motto = res;
        console.log(res);
      });
  },

  submit() {
    // 放在最前面，防止重复提交
    if (this.data.isSubmit) return;

    if (!this.data.stationId && !this.data.codeNum) {
      wx.showToast({
        title: '请扫描站点编号',
        icon: 'none',
      });

      return;
    }

    if (!this.data.deviceId && !this.data.portNum) {
      wx.showToast({
        title: '请选择充电口',
        icon: 'none',
      });

      return;
    }

    const timeLimit = this.data.abortModeArray[this.data.abortMode].type;

    this.setData({
      isSubmit: true,
    });

    app
      .req('/charger/start', {
        stationId: this.data.stationId,
        codeNum: this.data.codeNum,
        deviceId: this.data.deviceId,
        portNum: this.data.portNum,
        timeLimit: timeLimit,
        paymentType: this.data.paymentType,
      })
      .then(res => {
        if (res.code === 200) {
          wx.requestSubscribeMessage({
            tmplIds: ['LhTVcRamzG0i5PsQGRKVhlBo1JrL6a_YFl2Fo8FuHyY'],
            success(res) {
              console.log(res);
            },
            fail(err) {
              console.log(err);
            },
            complete() {
              wx.switchTab({
                url: '/pages/bill/bill',
              });
            },
          });
        }
      })
      .catch(() => {
        wx.switchTab({
          url: '/pages/play/play',
        });
      })
      .finally(() => {
        this.setData({
          isSubmit: false,
        });
      });
  },

  onShow() {
    this.getTabBar().setData({
      selected: 0,
    });

    if (this.data.codeNum) {
      this.getPorts(this.data.codeNum);
    }
  },

  togglePricesDialog() {
    this.setData({
      showPricesDialog: !this.data.showPricesDialog,
    });
  },

  onLoad(options) {
    const _this = this;
    this.index = 0;

    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      });
    }

    // 登录
    wx.pro.login().then(res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId

      // todo: 1. 去后台换 token，然后存储到本地
      // todo: 2. 去后台换 token，然后存储到本地
      // todo: 3. 后面的接口都需要带上 token
      // todo: 4. 若 token 过期，则重新登录

      app.req('/account/wechat/login', {
        code: res.code,
      }).then(res => {
        wx.setStorageSync('token', res.data.token);

        app.globalData.userInfo = res.data;
        // 扫描小程序码
        console.log(options, res);
        log.info(options);

        if (options.q) {
          const pathDecode = decodeURIComponent(options.q); // 例如：isScan=1&storeId=28
          console.log(pathDecode);
          log.info(pathDecode);
          const scene = pathDecode.split("?")[1].split('=')[1];
          _this.setData({
            pwdVal: scene,
            payFocus: false,
            pwdValText: scene.split(''),
            focusIdx: null,
          });
          _this.inputBlur();
          _this.getPorts(scene);
          //&是我们定义的参数链接方式
          // let isScan = scene.split("&")[0].split('=')[1]
          // let storeId = scene.split('&')[1].split('=')[1]
          // console.log('Scan Qrcode Access Page Success.')
          // console.log('isScan', isScan)
          // console.log('storeId', storeId)
        }

      });
    });


  },

  resetInput() {
    const val = this.data.pwdVal;

    this.setData({
      payFocus: false,
      // pwdVal: '',
      // pwdValText: [],
      focusIdx: null,
    });
  },

  getFocus() {
    let idx = this.data.pwdVal.length || 0;

    if (idx >= 6) {
      idx = 5;
    }
    console.log('获取焦点', idx);

    this.setData({
      payFocus: true,
      focusIdx: idx
    });
  },

  inputPwd(e) {
    this.setData({
      pwdVal: e.detail.value
    });
    this.setData({
      pwdValText: e.detail.value.split('')
    });
    this.setData({
      focusIdx: e.detail.value.length
    });

    if (e.detail.value.length >= 6) {
      this.getPorts(this.data.pwdVal);
      this.resetInput();
    }
  },

  inputBlur(e) {
    this.setData({
      payFocus: false,
      focusIdx: null
    });
  },

  scanCode() {
    wx.pro.scanCode().then(res => {
      console.log(res);
      log.info(res);
      const pathDecode = decodeURIComponent(res.result);
      log.info(pathDecode);
      const val = pathDecode.split("?")[1].split('=')[1];
      if (val) {
        this.setData({
          pwdVal: val,
          payFocus: false,
          pwdValText: val.split(''),
          focusIdx: null,
        });
        this.inputBlur();
        this.getPorts(val);
      }
    });
  },
});