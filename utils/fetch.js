/**
 * request方法是异步方法，需要使用promise封装
 * 模块提供一个向网络接口发送请求的方法
 * api为网络接口
 * path为具体的请求路径
 * params为具体请求参数
 * 
 */
module.exports = function(api,path,params){
  return new Promise(function(resolve,reject){
    wx.request({
      url: `${api}/${path}`,
      data:Object.assign({},params),//es6新增api
      header:{'Content-Type':'json'},
      success:resolve,
      fail:reject
    })
  })
}