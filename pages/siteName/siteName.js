// pages/siteName/siteName.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    stationName: '',
    stationId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      stationId: this.options.stationId,
      stationName: this.options.stationName,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 编辑站点
  editStation() {
    app
      .req('/station/edit', {
        id: this.data.stationId,
        name: this.data.stationName,
        devices: [],
      })
      .then(res => {
        wx.navigateBack();
      });
  },
})