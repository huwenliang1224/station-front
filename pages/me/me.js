// pages/me/me.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var page = this;
    var accountId = wx.getStorageSync("accountId");

    if (!accountId) {
      app.login(function(accountId) {
        page.setData({
          accountId: accountId
        })
      })
    } else {
      page.setData({
        accountId: accountId
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  toAuthorization: function(e) {
    wx.navigateTo({
      url: '/pages/authorization/authorization'
    })
  },
  toShare: function(e) {
    wx.navigateTo({
      url: '/pages/share/share'
    })
  },
  toInstruction: function(e) {
    wx.navigateTo({
      url: '/pages/instruction/instruction'
    })
  },
  toGuide: function (e) {
    wx.navigateTo({
      url: '/pages/guide/guide'
    })
  },
  toSuggest: function (e) {
    wx.navigateTo({
      url: '/pages/suggest/suggest'
    })
  },
  copy: function (e) {
    var accountid = e.currentTarget.dataset.accountid;
    wx.setClipboardData({
      data: accountid
    })
  }
})