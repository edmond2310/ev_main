import database from '../database';
const baseURL = 'https://www.energyhx.com/charger-api';

function showError(err, successCB) {
  wx.showModal({
    title: '提示',
    content: err.data || err.msg || '网络异常，请稍后重试',
    confirmText: '我知道了',
    showCancel: false,
    success: successCB
  });
}

const wxReq = (url, data, method = 'POST') => {
  return new Promise((resolve, reject) => {
    // 若是开发环境则返回mock
    const doneApiLists = [
      // '/account/wechat/login', // 微信登录
      // '/account/profile/update', //个人信息更新（废弃）
      // '/charger/stationInfo', // 充电站点信息
      // '/charger/start', // 提交开始充电
      // '/charger/recodes', // 充电记录
      // '/wallet/balance', // 我的余额
      // '/wallet/details', // 钱包明细
      // '/station/add', // 新建站点
      // '/station/edit', // 修改站点
      // '/station/info', // 获取站点信息
      // '/station/list', // 获取站点列表
      // '/station/setPrices', // 修改站点价格
      // '/station/getPrices', // 获取站点价格
      // '/station/incomes', // 我的收益
    ];
    const envVersion = wx.getAccountInfoSync().miniProgram.envVersion;
    if (envVersion === 'develop' && doneApiLists.includes(url)) {
      return resolve(database[url]);
    }

    // let payload = {
    //   code: wx.getStorageSync('token') || '',
    // };
    // payload = Object.assign(payload, data);
    wx.showLoading({
      title: '加载中...',
    });

    // 正式环境则请求接口
    wx.pro
      .request({
        url: `${baseURL}${url}`,
        data,
        method,
        header: {
          token: wx.getStorageSync('token') || '',
          'content-type': 'application/json',
        },
      })
      .then(res => {
        console.log('=====================================================');
        console.log(`接口 => ${url} 请求入参=> `, data);
        console.log(`接口 => ${url} 返回结果=> `, res.data);
        console.log('=====================================================');

        if (res.statusCode === 200 && res.data.code === 200) {
          resolve(res.data);
        } else {
          showError(res.data, () => {
            reject(res);
          });
        }
      })
      .catch(err => {
        showError(err);
        reject(err);
      })
      .finally(() => {
        wx.hideLoading();
      });
  });
};

const wxPost = (url, data, method = 'POST') => {
  console.log('wxPost', url, data, method);

  return new Promise((resolve, reject) => {
    // wx.showLoading({
    //   title: '加载中',
    // });

    // 若是开发环境则返回mock
    const envVersion = wx.getAccountInfoSync().miniProgram.envVersion;
    if (envVersion === 'develop') {
      return resolve(database[url]);
    }

    // let payload = {
    //   code: wx.getStorageSync('token') || '',
    // };
    // payload = Object.assign(payload, data);
    wx.showLoading({
      title: '加载中',
    });

    // 正式环境则请求接口
    wx.pro
      .request({
        url: `${baseURL}${url}`,
        data,
        method,
        header: {
          'access-token': wx.getStorageSync('token') || '',
          'content-type': 'application/json',
        },
      })
      .then(res => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      })
      .catch(err => {
        reject(err);
      })
      .finally(() => {
        wx.hideLoading();
      });
  });
};

module.exports = {
  wxReq,
  wxPost,
  baseURL,
};
