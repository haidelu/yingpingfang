/**
 * 
 */
const fetch = require('./fetch')

const api = 'https://api.map.baidu.com'
const path = 'geocoder/v2/'

module.exports=function(latitude,longitude){
  const params = { 
      location: `${latitude},${longitude}`, 
      output: 'json',
      ak: 'B61195334f65b9e4d02ae75d24fa2c53'
    }
  return fetch(api,path,params)
    .then(res => res.data.result.addressComponent.city)
}

