// pages/suggest/suggest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindFormSubmit(e) {
    var page = this;
    var content = e.detail.value.textarea;
    if (content == '') {
      wx.showToast({
        title: '不能为空',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    wx.request({
      url: 'https://www.huwenl.cn/insertSuggest',
      method: "POST",
      data: {
        accountId: wx.getStorageSync("accountId"),
        content: content
      },
      complete(res) {
        wx.showToast({
          title: '您的建议已提交',
          icon: 'success',
          duration: 5000
        })

        page.setData({
          content: ""
        })
      }
    })
  }
})