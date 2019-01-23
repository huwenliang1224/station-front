// pages/album/album.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    edit: false,
    modalhidden: true,
    chkall: false,
    nocancel: false,
    album: [],
    inputvalue: "",
    selected: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var page = this;
    var accountId = wx.getStorageSync("accountId");
    if (!accountId) {
      app.login(function (accountId) {
        wx.request({
          url: 'https://www.huwenl.cn/getAlbums',
          data: {
            accountId: wx.getStorageSync("accountId")
          },
          success(res) {
            console.log("album.js->getAlbums")
            console.log(res.data)
            wx.setStorageSync('album', res.data)
            if (res.data) {
              page.setData({
                album: res.data
              })
            }
          }
        })
      })
    }
  },
  onShow: function() {
    var page = this;

    var accountId = wx.getStorageSync("accountId");
    if (accountId) {
      wx.request({
        url: 'https://www.huwenl.cn/getAlbums',
        data: {
          accountId: wx.getStorageSync("accountId")
        },
        success(res) {
          console.log("album.js->getAlbums")
          console.log(res.data)
          wx.setStorageSync('album', res.data)
          if (res.data) {
            page.setData({
              album: res.data
            })
          }
        }
      })
    }
  },
  toAlbumDetail: function(e) {
    if (this.data.edit) {
      return
    }
    var albumid = e.currentTarget.dataset.albumid;
    var albumname = e.currentTarget.dataset.albumname;
    var albumaccountid = e.currentTarget.dataset.albumaccountid;

    wx.navigateTo({
      url: '/pages/albumdetail/albumdetail?albumid=' + albumid + "&albumaccountid=" + albumaccountid + "&albumname=" + albumname
    })
  },
  create: function(e) {
    this.setData({
      modalhidden: false,
      inputvalue: ""
    })
  },
  edit: function(e) {
    this.setData({
      edit: true
    })
  },
  editcancel: function(e) {
    this.setData({
      edit: false,
      chkall: false
    })
  },
  checkboxChange: function(e) {
    if (e.detail.value.length > 0) {
      this.selected = e.detail.value
    }
  },
  deleteAlbum: function(e) {
    var page = this;
    var albumids = this.selected;

    if (!albumids || albumids.length == 0) {
      return;
    }

    wx.showModal({
      title: '提示',
      content: '删除后无法恢复，是否确认删除相簿?',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: 'Loading',
            mask: true
          })
          wx.request({
            url: 'https://www.huwenl.cn/delAlbum',
            method: "POST",
            data: {
              accountId: wx.getStorageSync("accountId"),
              ids: albumids
            },
            success(res) {
              wx.setStorageSync('album', res.data)
              if (res.data) {
                page.setData({
                  album: res.data,
                  edit: false,
                  chkall: false
                })
              }
            },
            complete(res){
              wx.hideLoading()
            }
          })
        }
      }
    })
  },
  cancel: function(e) {
    this.setData({
      modalhidden: true,
      inputvalue: ""
    })
  },
  input: function(e) {
    this.setData({
      inputvalue: e.detail.value
    })
  },
  confirm: function(e) {
    var page = this;
    if (!page.data.inputvalue) {
      this.setData({
        inputvalue: "新建相簿"
      })
    }

    wx.request({
      url: 'https://www.huwenl.cn/createAlbum',
      data: {
        accountId: wx.getStorageSync("accountId"),
        name: page.data.inputvalue
      },
      success(res) {
        wx.setStorageSync('album', res.data)
        if (res.data) {
          page.setData({
            album: res.data,
            modalhidden: true,
            inputvalue: ""
          })
        }
      }
    })
  }
})