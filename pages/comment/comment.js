// pages/comment/comment.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    movieName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中'
    })
    app.queryApi.findOne(options.id)
      .then(data => {
        this.setData({ movieName: data.title, movie: data })
        wx.setNavigationBarTitle({
          title: data.title
        })
        wx.hideLoading()
      })

  },

  bindFormSubmit:function(e){
    if (e.detail.value.comText) {
      wx.getUserInfo({
        success: res => {
          const popular_reviews = this.data.movie.popular_reviews
          const newObject = {
            author: { avatar: res.userInfo.avatarUrl, name: res.userInfo.nickName },
            summary: e.detail.value.comText
            }
          popular_reviews.push(newObject);
          this.setData({ movie: this.data.movie})
          wx.showToast({
            title: '发送成功',
          })
        }
      })
    } else {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
      })
    }   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  
})