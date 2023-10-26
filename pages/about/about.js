// logs.js
const util = require('../../utils/util.js');
const app = getApp();

Page({
  data: {
    showPayPwdInput: false, // 是否展示密码输入层
    pwdVal: '', // 输入的密码
    pwdValText: [], // 用于展示的密码
    payFocus: false, // 文本框焦点
    focusIdx: null,
  },

  onLoad: function () {},

  resetInput: function () {
    const val = this.data.pwdVal;

    wx.showToast({
      title: val,
    });

    this.setData({
      payFocus: false,
      pwdVal: '',
      pwdValText: [],
      focusIdx: null,
    });
  },

  getFocus: function () {
    const idx = this.data.pwdVal.length || 0;
    this.setData({ payFocus: true, focusIdx: idx });

    if (this.data.pwdVal.length === 6) {
      this.setData({ focusIdx: 5 });
    }
  },

  inputPwd: function (e) {
    console.log('输入密码监听', e);
    this.setData({ pwdVal: e.detail.value });
    this.setData({ pwdValText: e.detail.value.split('') });
    this.setData({ focusIdx: e.detail.value.length });

    if (e.detail.value.length >= 6) {
      this.resetInput();
    }
  },

  inputBlur: function () {
    this.setData({ payFocus: false, focusIdx: null });
  },

  scanCode() {
    wx.pro.scanCode().then(res => {
      const val = res.result;
      this.setData({
        pwdVal: val,
      });

      this.setData({ pwdValText: val.split('') });

      wx.showToast({
        title: this.data.pwdVal,
      });
    });
  },
});
