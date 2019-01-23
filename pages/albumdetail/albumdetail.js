// pages/albumdetail/albumdetail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    albumid: -1,
    albumaccountid: "",
    owner: true,
    items: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var albumid = options.albumid;
    var albumaccountid = options.albumaccountid;
    var albumname = options.albumname;
    var accountId = wx.getStorageSync("accountId");

    this.setData({
      albumid: albumid,
      albumaccountid: albumaccountid,
      owner: accountId == albumaccountid
    })

    wx.setNavigationBarTitle({
      title: albumname
    })
  },
  onShow: function () {
    var page = this;
    wx.request({
      url: 'https://www.huwenl.cn/getPictures',
      data: {
        accountId: page.data.albumaccountid,
        albumId: page.data.albumid
      },
      success(res) {
        if (res.data) {
          page.setData({
            items: res.data
          })
        }
      }
    })
  },
  previewimg: function(e) {
    var page = this;
    var img = e.currentTarget.dataset.img;
    wx.previewImage({
      current: img,
      urls: page.data.items
    })
  },
  upload: function(e){
    var page = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        const tempFilePaths = res.tempFilePaths
        wx.showLoading({
          title: 'Loading',
          mask: true
        })

        for (var i = 0; i < tempFilePaths.length; i++){
          wx.uploadFile({
            url: 'https://www.huwenl.cn/upload',
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {
              albumId: page.data.albumid,
              accountId: wx.getStorageSync("accountId")
            }
          })
        }

        var time = 1000 * tempFilePaths.length;
        setTimeout(function () {
          wx.request({
            url: 'https://www.huwenl.cn/getPictures',
            data: {
              albumId: page.data.albumid,
              accountId: wx.getStorageSync("accountId")
            },
            success(res) {
              console.log(res.data)
              if (res.data) {
                page.setData({
                  items: res.data
                })
              }
              wx.hideLoading()
            },
            fail(res) {
              wx.hideLoading()
            }
          })
        }, time);
      }
    })
  }
})