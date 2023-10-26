export default {
  '/account/wechat/login': {
    code: 200,
    msg: '登录成功',
    data: {
      id: 6,
      openid: 'fdsafd',
      cellphone: null,
      nickName: 'fdsafd',
      birthday: '19910804',
      gender: 2,
      province: null,
      city: null,
      country: null,
      avatarUrl: null,
      language: null,
      unionid: 'fdsa',
      createTime: null,
      updateTime: '2022-04-20T06:58:53.000+00:00',
      status: null,
      token: 'dd5acdb0d9150b820e9b89aafbb3b5b4',
    },
  },

  '/account/profile/update': {
    code: 200,
    msg: '更新成功',
    data: null,
  },

  '/charger/stationInfo': {
    code: 200,
    msg: '获取成功',
    data: {
      id: 11,
      name: '隔壁老王',
      codeNum: 123456,
      prices: [
        {
          minPower: 0,
          maxPower: 150,
          price: 0.5,
        },
        {
          minPower: 150,
          maxPower: 300,
          price: 0.6,
        },
        {
          minPower: 300,
          maxPower: 500,
          price: 0.8,
        },
      ],
      ports: [
        {
          portNum: 1,
          status: 1, //1空闲 2占用 3离线
        },
        {
          portNum: 2,
          status: 2, //1空闲 2占用 3离线
        },
        {
          portNum: 3,
          status: 2, //1空闲 2占用 3离线
        },
        {
          portNum: 4,
          status: 1, //1空闲 2占用 3离线
        },
        {
          portNum: 5,
          status: 3, //1空闲 2占用 3离线
        },
        {
          portNum: 6,
          status: 3, //1空闲 2占用 3离线
        },
        {
          portNum: 7,
          status: 3, //1空闲 2占用 3离线
        },
        {
          portNum: 8,
          status: 3, //1空闲 2占用 3离线
        },
        {
          portNum: 9,
          status: 1, //1空闲 2占用 3离线
        },
        {
          portNum: 10,
          status: 2, //1空闲 2占用 3离线
        },
        {
          portNum: 11,
          status: 1, //1空闲 2占用 3离线
        },
        {
          portNum: 12,
          status: 1, //1空闲 2占用 3离线
        },
      ],
    },
  },

  '/charger/start': {
    code: 200,
    msg: '提交成功',
    data: null,
  },

  '/charger/recodes': {
    code: 200,
    msg: '请求成功',
    data: [
      {
        id: 6,
        startTime: '2022-04-20 06:58:53',
        howLong: '1.2小时',
        status: 1,
        stationName: '隔壁老王',
        fee: 2.3,
      },
      {
        id: 6,
        startTime: '2022-04-20 06:58:53',
        howLong: '1.2小时',
        status: 1,
        stationName: '隔壁老王',
        fee: 2.3,
      },
      {
        id: 6,
        startTime: '2022-04-20 06:58:53',
        howLong: '1.2小时',
        status: 1,
        stationName: '隔壁老王',
        fee: 2.3,
      },
      {
        id: 6,
        startTime: '2022-04-20 06:58:53',
        howLong: '1.2小时',
        status: 1,
        stationName: '隔壁老王',
        fee: 2.3,
      },
      {
        id: 8,
        startTime: '2022-04-20 06:58:53',
        howLong: '1.2小时',
        status: 2,
        stationName: '隔壁老王',
        fee: 2.3,
      },
      {
        id: 18,
        startTime: '2022-04-20 06:58:53',
        howLong: '5.2小时',
        status: 1,
        stationName: '隔壁老王',
        fee: 5.3,
      },
    ],
  },

  '/wallet/balance': {
    code: 200,
    msg: '请求成功',
    data: {
      balance: 100.0,
      deviceCost: 0.0,
    },
  },

  '/wallet/details': {
    code: 200,
    msg: '请求成功',
    data: [
      {
        name: '充电',
        amt: 1.0,
        remark: '肚子好痛，充电一下',
        createTime: '2022-09-10 12:34:43',
      },
      {
        name: '充电',
        amt: 1.0,
        remark: '下班了，充电一下',
        createTime: '2022-09-10 12:34:43',
      },
      {
        name: '充电',
        amt: 1.0,
        remark: '一般都不会有备注的',
        createTime: '2022-09-10 12:34:43',
      },
    ],
  },

  '/station/add': {
    code: 200,
    msg: '添加成功',
    data: {
      id: '324u2074233',
      name: '后台自动生产的名字',
      codeNum: 12345699443343423,
    },
  },

  '/station/edit': {
    code: 200,
    msg: '添加成功',
    data: {
      id: '324u2074233',
      name: '修改--后台自动生产的名字',
      codeNum: 12345699443343423,
    },
  },

  '/station/info': {
    code: 200,
    msg: '添加成功',
    data: {
      id: 11,
      name: '隔壁老王大家都为访问',
      codeNum: 1298677653456,
      devices: [
        {
          positionNum: 1,
          deviceId: 'qw121323wejrweff213',
          deviceModel: 'M-2017',
          blueMac: '5467576576',
          status: 1,
        },
        {
          positionNum: 3,
          deviceId: 'qw121323wejrweff213',
          deviceModel: 'M-2017',
          blueMac: '5467576576',
          status: 1,
        },
      ],
    },
  },

  '/station/list': {
    code: 200,
    msg: '添加成功',
    data: [
      {
        id: 11,
        name: '隔壁老王',
        codeNum: 123456,
      },
      {
        id: 12,
        name: '隔壁老王2',
        codeNum: 234567,
      },
    ],
  },

  '/station/incomes': {
    code: 200,
    msg: '请求成功',
    data: [
      {
        id: 6,
        startTime: '2022-04-20 06:58:53',
        howLong: '1.2小时',
        status: 1,
        stationName: '隔壁老王',
        chargePower: 148,
        electricity: 0.3,
        fee: 2.3,
        otherFee: 1.1,
        incode: 1.2,
      },
      {
        id: 6,
        startTime: '2022-04-20 06:58:53',
        howLong: '1.2小时',
        status: 1,
        stationName: '隔壁老王',
        chargePower: 148,
        electricity: 0.3,
        fee: 2.3,
        otherFee: 1.1,
        incode: 1.2,
      },
    ],
  },
};
