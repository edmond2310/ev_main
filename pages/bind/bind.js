// logs.js
const util = require('../../utils/util.js');
const app = getApp();

Page({
  data: {
    isAddNewStation: false,
    stationName: '',
    stationId: '',
    categoryId: '',
    codeNum: '',
    codeUrl: '',
    showQRCode: false,
    qrCodeData: {},
    deviceCost: 0,
    devices: [
      {
        positionNum: 1,
        deviceId: '',
        deviceModel: '',
        blueMac: '',
        status: 1,
      },
      // {
      //   positionNum: 2,
      //   deviceId: '',
      //   deviceModel: '',
      //   blueMac: '',
      //   status: '',
      // },
      // {
      //   positionNum: 3,
      //   deviceId: '',
      //   deviceModel: '',
      //   blueMac: '',
      //   status: '',
      // },
      // {
      //   positionNum: 4,
      //   deviceId: '',
      //   deviceModel: '',
      //   blueMac: '',
      //   status: '',
      // },
    ],
  },

  onLoad() {
    this.setData({
      stationId: this.options.stationId,
      isAddNewStation: !!this.options.isAddNewStation,
    });

    wx.setNavigationBarTitle({
      title: this.data.isAddNewStation ? '新增站点' : '编辑站点',
    });
  },

  onShow() {
    // 新增站点状态（点击上一页的新增站点按钮）
    if (!this.data.isAddNewStation) {
      this.getStationList();
    }
  },

  navToIncome() {
    wx.navigateTo({
      url: '../income/income?stationId=' + this.data.stationId,
    });
  },

  // 扫码即可绑定
  addStation(device) {
    app
      .req('/station/add', {
        // id: this.data.stationId,
        // name: this.data.stationName,
        devices: [device],
      })
      .then(res => {
        this.setData({
          stationId: res.data.id,
          stationName: res.data.name,
        });

        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000,
        });

        this.getStationList();
      });
  },

  // 编辑站点
  editStation(portNum, deviceId) {
    const portInfo = {
      positionNum: portNum,
      deviceId: deviceId,
    };

    app
      .req('/station/edit', {
        id: this.data.stationId,
        name: this.data.stationName,
        devices: [portInfo],
      })
      .then(res => {
        this.getStationList();
      });
  },

  // 获取站点信息
  getStationList() {
    app.req('/station/info', { id: this.data.stationId }).then(res => {
      if (!res.data) return;

      // let arr = res.data.devices;
      // res.data.devices.forEach(item => {
      //   const current = arr[item.positionNum - 1];

      //   current.deviceId = item.deviceId;
      //   current.deviceModel = item.deviceModel;
      //   current.blueMac = item.blueMac;
      //   current.status = item.status;
      // });

      let arr = res.data.devices;
      this.setData({
        stationId: res.data.id,
        categoryId: res.data.categoryId,
        codeNum: res.data.codeNum,
        stationName: res.data.name,
        deviceCost: res.data.deviceCost,
        devices: arr,
      });

      // 如果都满了，就新增一个
      // this.appendDevice();
    });
  },

  // 扫描 ==> 获取deviceId 调用 /station/edit 接口
  scanCode(e) {
    const positionNum = e.currentTarget.dataset.positionnum;
    const index = positionNum - 1;

    wx.pro
      .scanCode()
      .then(res => {
        const device = {
          positionNum: positionNum,
          deviceId: res.result,
        };

        this.setData({
          qrCodeData: device,
        });

        // 编辑站点
        if (this.data.stationId) {
          this.editStation(device.positionNum, device.deviceId);
        }

        // 首次绑定
        if (!this.data.stationId) {
          this.addStation(device);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },

  appendDevice() {
    let arr = this.data.devices;

    // 如果端口都绑定满了，就新增一个
    const allHaveDeviceId = this.data.devices.every(
      device => device.deviceId !== '',
    );

    if (allHaveDeviceId) {
      const newDevice = {
        positionNum: this.data.devices.length + 1,
        deviceId: '',
        deviceModel: '',
        blueMac: '',
        status: '',
      };
      arr.push(newDevice);
    }

    this.setData({
      devices: arr,
    });
  },

  getQRCode() {
    app.req('/station/qrcode', { id: this.data.stationId }).then(res => {
      if (!res.data) return;

      this.setData({
        showQRCode: true,
        codeUrl: res.data,
      });
    });
  },

  toggleShowQRCode() {
    this.setData({
      showQRCode: !this.data.showQRCode,
    });
  },

  navToSiteName() {
    wx.navigateTo({
      url: '../siteName/siteName?stationId=' + this.data.stationId + '&stationName=' + this.data.stationName,
    });
  },

  navToCharge() {
    wx.navigateTo({
      url: '../charge/charge?stationId=' + this.data.stationId,
    });
  },

  navToEditCategory() {
    wx.navigateTo({
      url: '../editCategory/editCategory?stationId=' + this.data.stationId + '&categoryId=' + this.data.categoryId,
    });
  },

  // 将base64图片文件保存至用户系统相册
  downloadQRCode() {
    const imgSrc = this.data.codeUrl; // base64编码
    const save = wx.getFileSystemManager(); // 获取文件管理器对象
    const number = Math.random();

    save.writeFile({
      filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png', // 表示生成一个临时文件名
      data: imgSrc.split('data:image/jpeg;base64,')[1],
      encoding: 'base64',
      success: res => {
        wx.saveImageToPhotosAlbum({
          filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
          success: function (res) {
            wx.showToast({
              title: '保存成功',
            });
          },
          fail: function (err) {
            console.log(err);
          },
        });
        console.log(res);
      },
      fail: err => {
        console.log(err);
      },
    });
  },
});
