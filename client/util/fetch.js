import 'whatwg-fetch'
/**
 * 
 * @param {STRING} url 
 * @param {OBJECT} option default Method is GET
 */
const _fetch = (url, option = {}) => new Promise((resolve, reject) => {
  const headers = {
    'Content-Type': 'application/json; charset=UTF-8'
  }
  if(option.method === undefined || option.method === 'GET' || option.method === 'DELETE') {
    fetch(url, {
      headers,
      credentials: 'include',
      method: option.method || 'GET'
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      } else {
        reject({ message: 'Failed' })
      }
    })
    .then(res => {
      if(res.message === 'Success') {
        return resolve(res.data)
      }else {
        return reject({ message: 'Failed' })
      }
    })
    .catch(err => {
      console.log(`fetch ${url} data error:${err}`) 
      return reject(err) 
    })
  } else {
    fetch(url, {
      headers,
      credentials: 'include',
      method: option.method,
      body: JSON.stringify(option.body)
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      } else {
        reject({ message: 'Failed' })
      }
    })
    .then(res => resolve(res.data))
    .catch(err => {
      console.log(`fetch ${url} data error:${err}`) 
      return reject(err) 
    })
  }
})


export default _fetch