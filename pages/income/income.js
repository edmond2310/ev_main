// logs.js
const util = require('../../utils/util.js');
const app = getApp();

Page({
  data: {
    beginDate: '',
    endDate: '',
    incomeList: [],
  },

  onShow() {
    
  },

  onLoad() {
    const currentTimeStamp = new Date().getTime();

    this.setData({
      beginDate: new Date(currentTimeStamp - 31 * 24 * 3600 * 1000)
        .toISOString()
        .split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
    });

    this.getIncomeList(this.options.stationId);
  },

  getIncomeList(stationId) {
    app
      .req('/income/details', {
        stationId,
        startTime: this.data.beginDate,
        endTime: this.data.endDate,
      })
      .then(res => {
        this.setData({
          incomeList: res.data,
        });
      });
  },

  bindBeginDateChange(e) {
    this.setData({
      beginDate: e.detail.value,
    });

    if (this.data.beginDate && this.data.endDate) {
      this.getIncomeList();
    }
  },

  bindEndDateChange(e) {
    this.setData({
      endDate: e.detail.value,
    });

    if (this.data.beginDate && this.data.endDate) {
      this.getIncomeList();
    }
  },
});
