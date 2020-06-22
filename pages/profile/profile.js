// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  // 页面的初始数据
  data: {
    title: '豆瓣影评',
    titleText: '利用豆瓣、百度位置等API整合微信小程序上,用户在小程序上查看电影榜单、搜索电影、查看电影信息及影评。',
    author: 'liu penghui',
    github: 'https://github.com/liuvigongzuoshi',
    myHomepage: 'http://www.yinwubang.top/',
    dskbDhz: 'ViCode',
    khcode: '../../images/khcode.jpg'
  },

  getUserInfo: function getUserInfo() {
    // app.wechat.getUserInfo().then(res => {
    //   return that.setData({ userInfo: res.userInfo });
    // });
  },


  // 生命周期函数--监听页面加载
  onLoad: function onLoad() {
    // app.wechat.login().then(function (res) {
    //   if (res.code) {
    //     console.log('登录成功！' + res.code);
    //   } else {
    //     console.error('获取用户登录态失败！' + res.errMsg);
    //   }
    // });
  },
  
  imgTap: function imgTap(){
    wx.previewImage({
      current: 'http://www.yinwubang.top/others/khcode.jpg', // 当前显示图片的http链接
      urls: ['http://www.yinwubang.top/others/khcode.jpg',''] // 需要预览的图片http链接列表
    })
  }
});

