import axios from 'axios'
import urls from './urls'
const querystring = require("querystring");
const get = (url, params) => {
  return new Promise(resolve => {
    axios
      .get(url, {params: params})
      .then(response => resolve(response.data))
      .catch(err => console.log(err))
  })
}
const postUrl = (url, params) => {
  return new Promise(resolve => {
    axios
      .post(url, querystring.stringify(params))
      .then(response => resolve(response.data))
      .catch(err => console.log(err))
  })
}
const postJson = (url, params) => {
  return new Promise(resolve => {
    axios
      .post(url, params)
      .then(response => resolve(response.data))
      .catch(err => console.log(err))
  })
}
const api={
  ...urls
}
export {
  api,
  get,
  postUrl,
  postJson
}
