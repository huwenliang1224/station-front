// pages/authorization/authorization.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalhidden: true,
    nocancel: false,
    friends: [],
    inputvalue1: "",
    inputvalue2: ""
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
      url: 'https://www.huwenl.cn/getFriends',
      data: {
        myAccountId: wx.getStorageSync("accountId")
      },
      success(res) {
        if (res.data) {
          page.setData({
            friends: res.data
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
  delFriend: function(e) {
    var page = this;
    var friendaccountid = e.currentTarget.dataset.friendaccountid;
    var name = e.currentTarget.dataset.name;

    wx.showModal({
      title: '提示',
      content: '是否要删除好友【' + name + '】',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: 'https://www.huwenl.cn/delFriend',
            data: {
              myAccountId: wx.getStorageSync("accountId"),
              friendAccountId: friendaccountid
            },
            success(res) {
              if (res.data) {
                page.setData({
                  friends: res.data
                })
              }
            }
          })
        }
      }
    })
  },
  createFriend: function(e) {
    this.setData({
      modalhidden: false,
      inputvalue1: "",
      inputvalue2: ""
    })
  },
  cancel: function(e) {
    this.setData({
      modalhidden: true
    })
  },
  confirm: function(e) {
    var page = this;
    var inputvalue1 = this.data.inputvalue1.trim();
    if (inputvalue1 == '') {
      wx.showToast({
        title: '好友昵称不能为空',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    var inputvalue2 = this.data.inputvalue2.trim();
    if (inputvalue2 == '') {
      wx.showToast({
        title: '好友账号不能为空',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    if (inputvalue2 == wx.getStorageSync("userid")) {
      wx.showToast({
        title: '好友账号不正确',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    wx.request({
      url: 'https://www.huwenl.cn/userexist',
      data: {
        accountId: inputvalue2
      },
      success(res) {
        console.log(res)
        if (res.data && res.data > 0) {
          wx.request({
            url: 'https://www.huwenl.cn/insertFriend',
            data: {
              myAccountId: wx.getStorageSync("accountId"),
              friendAccountId: inputvalue2,
              name: inputvalue1
            },
            success(res) {
              if (res.data) {
                page.setData({
                  friends: res.data,
                  modalhidden: true
                })
              }
            }
          })
        } else {
          wx.showToast({
            title: '好友账号不正确',
            icon: 'none',
            duration: 3000
          })
        }
      }
    })
  },
  input1: function(e) {
    this.setData({
      inputvalue1: e.detail.value
    })
  },
  input2: function(e) {
    this.setData({
      inputvalue2: e.detail.value
    })
  }
})