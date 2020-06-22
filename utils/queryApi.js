/**
 * 获取豆瓣影评接口
 */
const fetch = require('./fetch.js')

// const api = 'https://douban.uieee.com/v2/movie'
const api = 'https://api.douban.com/v2/movie'

/**
 * 获取多条数据
 * type为接口查询类型，
 * page为查询页数
 * count为查询数量
 * search为查询关键字
 */
function find(type, page = 1, count = 20, search = '') {
  const params = { apikey: '0b2bdeda43b5688921839c8ecb20399b',start: (page - 1) * count, count: count, city: getApp().globalData.currentCity }
  return fetch(api,type, search ? Object.assign(params, { q: search }) : params)
    .then(res => res.data)
}

//查询一条数据
function findOne(id) {
  return fetch(api, 'subject/' + id + '?apikey=0b2bdeda43b5688921839c8ecb20399b')
    .then(res => res.data)
}

module.exports={ 
  find,
  findOne
  }