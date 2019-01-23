//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  onLoad: function () {
    var page = this;
    var accountId = wx.getStorageSync("accountId");
    if (!accountId) {
      app.login(function (accountId) { })
    }
  }
})
