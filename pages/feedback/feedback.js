// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  bindFormSubmit:function(e){
    if (e.detail.value.textarea){
      wx.showToast({
        title: '提交成功',
      })
    }else{
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
      })
    }   
  } ,

})