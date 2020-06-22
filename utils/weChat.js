//使用promise包装WeChat官方api
function login() {
  return new Promise((resolve, reject) => {
    wx.login({ success: resolve, fail: reject })
  })
}

function getSetting(){
  return new Promise((resolve,reject) => {
    wx.getSetting({
      sucess:resolve,
      fail:reject
    })
  })
}

function getUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({ success: resolve, fail: reject })
  })
}

function setStorage(key, value) {
  return new Promise((resolve, reject) => {
    wx.setStorage({ key: key, data: value, success: resolve, fail: reject })
  })
}

function getStorage(key) {
  return new Promise((resolve, reject) => {
    wx.getStorage({ key: key, success: resolve, fail: reject })
  })
}

function getLocation(type) {
  return new Promise((resolve, reject) => {
    wx.getLocation({ type: type, success: resolve, fail: reject })
  })
}

module.exports = {
  login,
  getUserInfo,
  getSetting,
  setStorage,
  getStorage,
  getLocation
}