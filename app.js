//app.js
App({
  onLaunch: function() {
  },
  globalData: {
    userInfo: null,
  },
  login: function(callback) {
    wx.login({
      success: res => {
        wx.request({
          url: 'https://www.huwenl.cn/login',
          data: {
            code: res.code
          },
          success(res) {
            if (res.data) {
              console.log("accountId: " + res.data)
              wx.setStorageSync("accountId", res.data)
              callback(res.data);
            }
          }
        })
      }
    })
  }
})