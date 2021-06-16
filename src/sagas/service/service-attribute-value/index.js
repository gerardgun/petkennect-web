import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import serviceAttributeValueDuck from '@reducers/service/service-attribute-value'

const { types } = serviceAttributeValueDuck

function* get({ payload }) {
  try {
    yield put({ type: types.GET_PENDING })

    const serviceAttributes = yield call(Get, '/service-attributes/')

    let ServiceAttributesValues = []

    serviceAttributes.results.filter(_ => _.id == payload)
      .forEach(_attributeValue => {
        _attributeValue.values.forEach(_values => {
          let attributeValue = {
            value_display    : _values.value_display,
            id               : _values.id,
            service_attribute: _values.service_attribute,
            value            : _values.value,
            type             : _attributeValue.type
          }
          ServiceAttributesValues.push(attributeValue)
        })
      })

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: ServiceAttributesValues
      }
    })
  } catch (e) {
    yield put({
      type : types.GET_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.GET, get)
]
