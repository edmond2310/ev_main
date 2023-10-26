// pages/siteName/siteName.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedIndex: null,
    categoryList: [],
    stationId: 0,
    categoryId: 0,
    categoryName: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log(this.options);
    this.setData({
      categoryId: this.options.categoryId,
      stationId: this.options.stationId
    });
    this.fetchCategoryList();
  },

  async fetchCategoryList() {
    try {
      const res = await app.req('/stationCategory/list', {});
      let index = res.data.length;
      for (let i in res.data) {
        if (res.data[i].id == this.data.categoryId) {
          index = i;
          break;
        }
      }
      res.data.push({id: 0, name: "添加新类别"});
      this.setData({
        categoryList: res.data,
        selectedIndex: index
      });
    } catch (err) {
      console.error('获取站点类别时出错：', err);
    }
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

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      selectedIndex: e.detail.value
    });
  },

  // 编辑目录
  editCategory() {
    let categoryId = this.data.categoryList[this.data.selectedIndex].id
    app
      .req('/station/editCategory', {
        id: this.data.stationId,
        categoryId: categoryId,
        categoryName: this.data.categoryName,
      })
      .then(res => {
        wx.navigateBack();
      });
  },
})