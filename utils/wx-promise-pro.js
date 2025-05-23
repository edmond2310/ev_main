function e(e, t) {
  var o = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t &&
      (a = a.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      o.push.apply(o, a);
  }
  return o;
}
function t(t) {
  for (var a = 1; a < arguments.length; a++) {
    var r = null != arguments[a] ? arguments[a] : {};
    a % 2
      ? e(Object(r), !0).forEach(function (e) {
          o(t, e, r[e]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
      : e(Object(r)).forEach(function (e) {
          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
        });
  }
  return t;
}
function o(e, t, o) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: o,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = o),
    e
  );
}
var a = [
  'canvasGetImageData',
  'canvasPutImageData',
  'canvasToTempFilePath',
  'setEnableDebug',
  'startAccelerometer',
  'stopAccelerometer',
  'getBatteryInfo',
  'getClipboardData',
  'setClipboardData',
  'startCompass',
  'stopCompass',
  'addPhoneContact',
  'startGyroscope',
  'stopGyroscope',
  'startBeaconDiscovery',
  'stopBeaconDiscovery',
  'getBeacons',
  'startLocalServiceDiscovery',
  'stopLocalServiceDiscovery',
  'startDeviceMotionListening',
  'stopDeviceMotionListening',
  'getNetworkType',
  'makePhoneCall',
  'scanCode',
  'getSystemInfo',
  'vibrateShort',
  'vibrateLong',
  'getExtConfig',
  'chooseLocation',
  'getLocation',
  'openLocation',
  'chooseMessageFile',
  'loadFontFace',
  'chooseImage',
  'previewImage',
  'getImageInfo',
  'saveImageToPhotosAlbum',
  'compressImage',
  'chooseVideo',
  'saveVideoToPhotosAlbum',
  'downloadFile',
  'request',
  'connectSocket',
  'closeSocket',
  'sendSocketMessage',
  'uploadFile',
  'login',
  'checkSession',
  'chooseAddress',
  'authorize',
  'addCard',
  'openCard',
  'chooseInvoice',
  'chooseInvoiceTitle',
  'getUserInfo',
  'requestPayment',
  'getWeRunData',
  'showModal',
  'showToast',
  'hideToast',
  'showLoading',
  'hideLoading',
  'showActionSheet',
  'pageScrollTo',
  'startPullDownRefresh',
  'stopPullDownRefresh',
  'setBackgroundColor',
  'setBackgroundTextStyle',
  'setTabBarBadge',
  'removeTabBarBadge',
  'showTabBarRedDot',
  'hideTabBarRedDot',
  'showTabBar',
  'hideTabBar',
  'setTabBarStyle',
  'setTabBarItem',
  'setTopBarText',
  'saveFile',
  'openDocument',
  'getSavedFileList',
  'getSavedFileInfo',
  'removeSavedFile',
  'getFileInfo',
  'getStorage',
  'setStorage',
  'removeStorage',
  'clearStorage',
  'getStorageInfo',
  'closeBLEConnection',
  'closeBluetoothAdapter',
  'createBLEConnection',
  'getBLEDeviceCharacteristics',
  'getBLEDeviceServices',
  'getBluetoothAdapterState',
  'getBluetoothDevices',
  'getConnectedBluetoothDevices',
  'notifyBLECharacteristicValueChange',
  'openBluetoothAdapter',
  'readBLECharacteristicValue',
  'startBluetoothDevicesDiscovery',
  'stopBluetoothDevicesDiscovery',
  'writeBLECharacteristicValue',
  'getHCEState',
  'sendHCEMessage',
  'startHCE',
  'stopHCE',
  'getScreenBrightness',
  'setKeepScreenOn',
  'setScreenBrightness',
  'connectWifi',
  'getConnectedWifi',
  'getWifiList',
  'setWifiList',
  'startWifi',
  'stopWifi',
  'getBackgroundAudioPlayerState',
  'playBackgroundAudio',
  'pauseBackgroundAudio',
  'seekBackgroundAudio',
  'stopBackgroundAudio',
  'getAvailableAudioSources',
  'startRecord',
  'stopRecord',
  'setInnerAudioOption',
  'playVoice',
  'pauseVoice',
  'stopVoice',
  'getSetting',
  'openSetting',
  'getShareInfo',
  'hideShareMenu',
  'showShareMenu',
  'updateShareMenu',
  'checkIsSoterEnrolledInDevice',
  'checkIsSupportSoterAuthentication',
  'startSoterAuthentication',
  'navigateBackMiniProgram',
  'navigateToMiniProgram',
  'setNavigationBarTitle',
  'showNavigationBarLoading',
  'hideNavigationBarLoading',
  'setNavigationBarColor',
  'redirectTo',
  'reLaunch',
  'navigateTo',
  'switchTab',
  'navigateBack',
];
Promise.prototype.finally ||
  (Promise.prototype.finally = function (e) {
    var t = this.constructor;
    return this.then(
      function (o) {
        return t.resolve(e()).then(function () {
          return o;
        });
      },
      function (o) {
        return t.resolve(e()).then(function () {
          throw o;
        });
      }
    );
  });
var r = function (e) {
    return function () {
      var o =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      return new Promise(function (a, r) {
        e(t({ fail: r, success: a }, o));
      });
    };
  },
  n = function () {
    (wx.pro = {}),
      Object.keys(wx).forEach(function (e) {
        a.indexOf(e) >= 0
          ? (wx.pro[e] = r(wx[e]))
          : 'createSignal' !== e && 'lanDebug' !== e && (wx.pro[e] = wx[e]);
      });
  };
export { r as promisify, n as promisifyAll };
//# sourceMappingURL=wx-promise-pro.js.map
