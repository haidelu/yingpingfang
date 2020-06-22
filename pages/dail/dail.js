// pages/dail/dail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLike: false,
    isWant: false,
    isSeen: false,
    movie:{},
    movieName:''
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
        this.isInit()
      })
    
  },

  viewPostImg: function (e) {
    const src = e.currentTarget.dataset.src;
    wx.previewImage({
      urls: [src],
    })
  },
  /**
   * 实现切换是否“喜欢”“想看”“看过”功能
   */
  isLike:function(){
    if (this.data.isLike) {
      this.setData({ isLike: false })
    } else {
      this.setData({ isLike: true })
    }
    this.isToggle(this.data.isLike,'myLike')   
  },
  isWant: function () {
    if (this.data.isWant) {
      this.setData({ isWant: false })
    } else {
      this.setData({ isWant: true })
    }
    this.isToggle(this.data.isWant, 'myWant')
  },
  isSeen: function () {
    if (this.data.isSeen) {
      this.setData({ isSeen: false })
    } else {
      this.setData({ isSeen: true })
    }
    this.isToggle(this.data.isSeen, 'mySeen')
  },
  /**
   * 初始化是否“喜欢”“想看”“看过”模块
   */
  isInitJudge:function(key){
    const that = this
    const movieId = this.data.movie.id
    app.wechat.getStorage(key)
      .then(res => {
        const index = res.data.indexOf(movieId)
        if (index != -1) {
          switch (key) {
            case 'myLike':
              that.setData({ isLike: true });
              break;
            case 'myWant':
              that.setData({ isWant: true });
              break;
            case 'mySeen':
              that.setData({ isSeen: true });
              break;
            default:
              break;
          }
        }
      })
  },

  isInit:function(){
    const arr = ['myLike','myWant','mySeen']
    for(var key of arr){
      this.isInitJudge(key)
    }
  },
  /**
   * “mypage”模块数据持久化
   */
  isToggle:function (flag,categray){
    if(flag){
      const movie = this.data.movie
      app.wechat.getStorage(categray)
        .then(res => {
          res.data.push(movie.id)
          const sum = res.data
          wx.setStorage({
            key: categray,
            data: sum,
          })
        }) 
        app.wechat.getStorage(categray+'dail')
          .then(res => {
            res.data.push({ 
              id: movie.id, 
              images: { large: movie.images.large},
              title: movie.title,
              rating: { stars: movie.rating.stars, average: movie.rating.average } 
            })    
            const sum = res.data
            wx.setStorage({
              key: categray+'dail',
              data: sum
            })
          })
      }else{
      const movieId = this.data.movie.id
      app.wechat.getStorage(categray)
        .then(res => {
          const index = res.data.indexOf(movieId)
          if(index != -1){ res.data.splice(index,1) }
          const sum = res.data
          wx.setStorage({
            key: categray,
            data: sum
          })
        })
      app.wechat.getStorage(categray + 'dail')
        .then(res => {
          const sum = res.data.filter(function(item){
            if(item.id != movieId) return item
          })
          // const sum = res.data
          wx.setStorage({
            key: categray + 'dail',
            data: sum
          })
        })
    }
  },
  toComment:function(){
    wx.navigateTo({
      url: '../comment/comment?id=' + 26900949 //+this.data.movie.id,
    })
  }
  
})