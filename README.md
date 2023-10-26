```js
wx.pro
  .request({
    url: 'https://dummyjson.com/products/1',
  })
  .then(res => {
    console.log('res', res);
  });
```

环境判断

```js
// 获取当前环境的环境变量
const envVersion = wx.getAccountInfoSync().miniProgram.envVersion;
// 配置开发、体验、正式版本的地址
const baseApi = {
  develop: 'http://develop.com',
  trial: 'http://trial.com',
  release: 'http://release.com',
};
// 根据环境设置基础地址
const baseUrl = baseApi[envVersion];
console.log(envVersion, baseUrl);
```
