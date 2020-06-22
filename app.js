//app.js
const wechat = require('./utils/weChat.js')
const getCityName = require('./utils/getCityName.js')
const queryApi = require('./utils/queryApi.js')

App({
  globalData:{
    currentCity:'成都',
    userInfo:''
  },
  wechat:wechat,
  getCityName:getCityName,
  queryApi:queryApi,
  onLaunch: function () {

    // 登录
    wx.login({
      success: res => {
      }
    })

    wechat.getLocation()
      .then(res => {
          const { latitude, longitude } = res //es6语法
          return getCityName(latitude,longitude)      
      })
      .then(cityName => {
        if(cityName){
          this.globalData.currentCity = cityName.replace('市','')
        }
      })
      .catch(err =>{
        this.globalData.currentCity = '成都'
        console.error(err)
      })

      wx.setStorage({
        key: 'myLike',
        data: []
      })
      wx.setStorage({
        key: 'myWant',
        data: []
      })
      wx.setStorage({
        key: 'mySeen',
        data: []
      })
    wx.setStorage({
      key: 'myLikedail',
      data: []
    })
    wx.setStorage({
      key: 'myWantdail',
      data: []
    })
    wx.setStorage({
      key: 'mySeendail',
      data: []
    })

  } 
})