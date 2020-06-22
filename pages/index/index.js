//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    indicatorDots: true,
    indicatorColor: "rgba(255,255,255,1)",
    indicatorActiveColor: "#3fbc54",
    movies: [],
    loading: false
  },

  handleStart(){
    wx.switchTab({
      url: '../board/board'
    })
  },

  swiperChange(event) {
    // console.log(event)
  },

  swiperAnimationFinish(event) {
    // console.log(event)
  },

  getCache() {
    return new Promise(resolve => {
      app.wechat.getStorage('last_splash_data')
        .then(res => {
          const { movies, expires } = res.data
          // 有缓存，判断是否过期
          if (movies && expires > Date.now()) {
            return resolve(res.data)
          }
          // 已经过期
          console.log('last_splash_data outdated')
          return resolve(null)
        })
        .catch(e => resolve(null))
    })
  },

  onLoad(){
    this.getCache()
      .then(cache => {
        if (cache) {
          return this.setData({ movies: cache.movies, loading: true })
        }

        app.queryApi.find('coming_soon', 1, 3)
          .then(d => {
            this.setData({ movies: d.subjects, loading: true })
            return app.wechat.setStorage('last_splash_data', {
              movies: d.subjects,
              expires: Date.now() + 1 * 24 * 60 * 60 * 1000
            })
          })
          .then(() => {
            console.log('seted last_splash_data')
          })
      })
  }
})
