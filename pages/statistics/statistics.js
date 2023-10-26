const app = getApp();

Page({
  data: {
    statisticsList: []
  },

  onShow() {
  },

  onLoad() {
    console.log(this.options);
    this.fetchStatisticsList(this.options.categoryId);
  },

  async fetchStatisticsList(categoryId) {
    try {
      const res = await app.req('/categoryStatistics/list', {categoryId});
      this.setData({
        statisticsList: res.data,
      });
    } catch (err) {
      console.error('获取数据失败：', err);
    }
  }
});
