const got = require('got')
const { CookieJar } = require('tough-cookie')
const cookieJar = new CookieJar()

const config = require('./config')

const BASE_OPTIONS = {
  cookieJar,
  username: config.s4api.username,
  password: config.s4api.password
}

let token
const init = async () => {
  console.log(config)
  const response = await got.get(`https://${config.s4api.domain}/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV`, {
    ...BASE_OPTIONS,
    headers: { 'x-csrf-token': 'fetch' }
  })
  token = response.headers['x-csrf-token']

  console.log(token)
}

const post = async (req) => {
  try {

    console.log(`https://${config.s4api.domain}${req.originalUrl}`);
    const response = await got.post(`https://${config.s4api.domain}${req.originalUrl}`, {
      ...BASE_OPTIONS,
      headers: { 'x-csrf-token': token },
      json: req.body
    })
    return response.statusCode
  } catch (error) {
    
    return error.response.statusCode
  }
}

module.exports = {
  init,
  post
}
