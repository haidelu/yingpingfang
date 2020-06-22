// pages/board/board.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    boards: [
      { key: 'in_theaters' },
      { key: 'coming_soon' },
      { key: 'top250' },
      { key: 'us_box', }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBoard()
  },

  getBoard:function(){
    wx.showLoading({
      title: '加载中',
    })

    const tasks = this.data.boards.map(board => {
      return app.queryApi.find(board.key, 1, 8)
        .then(data => {
          board.title = data.title
          board.movies = data.subjects
          return board
        })
    })

    Promise.all(tasks).then(boards => {
      this.setData({ boards: boards })
      wx.hideLoading()
    })
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
    this.getBoard()
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

  }
})