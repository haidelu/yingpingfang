// pages/list/list.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'正在上映的电影-成都',
    type:'in_theaters',
    hasMore:true,
    page:0,
    size:20,
    movies:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.categray){
      this.data.title = options.title 
      app.wechat.getStorage(options.categray)
        .then(res => {
          this.setData({ movies:res.data,hasMore:false })
         })
    }else{
      this.data.title = options.title || this.data.title
      this.data.type = options.type || this.data.type
      this.loadMore();
    }    
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.title,
    })
  },

  onPullDownRefresh:function(){
    this.setData({movies:[],page:1,hasMore:true})
    this.loadMore()
      .then( () => wx.stopPullDownRefresh())
  },

  onReachBottom: function() {
    if (this.data.type !== 'us_box') {
      this.loadMore();
    } else {
      this.setData({ hasMore: false })
    }
  },

  loadMore:function(){
    const that=this
    if(!that.data.hasMore) return;

    return app.queryApi.find(that.data.type,that.data.page++,
    that.data.size)
      .then(d => {
        if(d.subjects.length){
          that.setData({movies:that.data.movies.concat(d.subjects)})
          if(d.subjects.length<that.data.size){ that.setData({hasMore:false}) }
        }else{
          that.setData({hasMore:false})
        }
      })
      .catch(function(e){
        that.setData({hasMore:false})
        console.error(e)
      })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})