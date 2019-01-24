// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    share: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    var page = this;
    wx.request({
      url: 'https://www.huwenl.cn/getShares',
      data: {
        myAccountId: wx.getStorageSync("accountId")
      },
      success(res) {
        if (res.data) {
          page.setData({
            share: res.data
          })
        }
      }
    })
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
  switch2Change:function(e){
    var page = this;
    var shareAccountId = e.currentTarget.dataset.shareaccountid;
    var myAccountId = e.currentTarget.dataset.myaccountid;
    var status = e.detail.value ? 1 : 0;

    wx.request({
      url: 'https://www.huwenl.cn/updateFriend',
      data: {
        shareAccountId: shareAccountId,
        myAccountId: myAccountId,
        status: status
      },
      // success(res) {
      //   if (res.data) {
      //     page.setData({
      //       share: res.data
      //     })
      //   }
      // }
    })
  },
  instruct: function (e) {
    wx.showModal({
      title: '使用说明',
      content: '本页列出了所有给您授权的用户的列表，右侧的开关表示是否在图片页面显示该用户的相簿，默认是不显示，如需要显示，可打开开关后即可，如不需要显示，可关闭开关即可',
      showCancel: false
    })
  }
})