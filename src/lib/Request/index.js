import axios from 'axios'

import { parsePayload } from '@lib/utils/functions'

let _source
let beforeRoute

function verifyRequestCancel(route) {
  if(beforeRoute === route) {
    if(_source !== undefined) _source.cancel('Operation canceled due to new instance.')
  } else {
    beforeRoute = route
  }
}

require('axios-debug-log')

export default class Request {
  constructor(url) {
    this.url = url
    this.instance = null

    this.http()
  }

  http = function() {
    const config = {
      baseURL: this.url
      // mode   : 'no-cors'
    }

    if(this.token)
      config.headers = {
        Authorization            : `JWT ${this.token}`,
        'Tenant-subdomain-prefix': 'joker'
      }

    this.instance = axios.create(config)
  }

  Put = (route, payload = {}) => {
    return new Promise((resolve, reject) => {
      verifyRequestCancel(route)
      this.instance
        .put(route, parsePayload(payload))
        .then(res => resolve(res.data))
        .catch(e => {
          reject({ type: axios.isCancel(e) ? 'cancel' : 'err', ...e })
        })
    })
  }

  Delete = (route, payload = {}) => {
    return new Promise((resolve, reject) => {
      verifyRequestCancel(route)
      this.instance
        .delete(route, { data: payload })
        .then(res => resolve(res.data))
        .catch(e => {
          reject({ type: axios.isCancel(e) ? 'cancel' : 'err', ...e })
        })
    })
  }

  Patch = (route, payload = {}) => {
    return new Promise((resolve, reject) => {
      verifyRequestCancel(route)
      this.instance
        .patch(route, parsePayload(payload))
        .then(res => resolve(res.data))
        .catch(e => {
          reject({ type: axios.isCancel(e) ? 'cancel' : 'err', ...e })
        })
    })
  }

  Post = (route, payload = {}) => {
    return new Promise((resolve, reject) => {
      verifyRequestCancel(route)
      this.instance
        .post(route, parsePayload(payload))
        .then(res => resolve(res.data))
        .catch(e => {
          reject({ type: axios.isCancel(e) ? 'cancel' : 'err', ...e })
        })
    })
  }

  Get = (route, payload = {}) => {
    return new Promise((resolve, reject) => {
      verifyRequestCancel(route)
      this.instance
        .get(route, {
          params: payload
        })
        .then(res => {
          resolve(res.data)
        })
        .catch(e => {
          reject({ type: axios.isCancel(e) ? 'cancel' : 'err', ...e })
        })
    })
  }

  reHydrateToken = token => {
    this.token = token
    this.http()
  }
}
