// pages/search/search.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    size:20,
    subtitle:'输入演员或片名',
    movies:[],
    search:'',
    hasMore:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  loadMore:function(){
    if(!this.data.hasMore) return

    this.setData({ subtitle:'加载中...' })

    return app.queryApi.find('search',this.data.page++,this.data.size,this.data.search)
      .then(d => {
        if(d.subjects.length){
          this.setData({ subtitle: d.title, movies: this.data.movies.concat(d.subjects) })
          if (d.subjects.length < that.data.size) { that.setData({ hasMore: false }) }
        }else{
          this.setData({ hasMore:false })
        }
      },() => {
        this.setData({ hasMore:false })
        wx.showToast({
          title: '出问题了！！！',
          icon: 'none'
        })
      })
      .catch(e => {
        this.setData({ subtitle:'获取数据异常',hasMore:false})
        wx.showToast({
          title: '出问题了！！！',
          icon: 'none'
        })
        console.error(e)
      })

  },

  handleSearch:function(e){
    if(!e.detail.value) return
    this.setData({ movies:[],page:1 })
    this.setData({ subtitle:'加载中...',hasMore:true,search:e.detail.value})
    this.loadMore()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({ movies:[],page:1 })
    this.loadMore()
      .then( () => wx.stopPullDownRefresh() )
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})