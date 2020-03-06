import { call, put, select, takeEvery } from 'redux-saga/effects'
import faker from 'faker'
import _times from 'lodash/times'

import { Get } from '@lib/utils/http-client'

import clientDocumentDuck from '@reducers/client/document'

const { types, selectors } = clientDocumentDuck

function* get({ payload }) {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)
    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))
    // const documents = yield call(Get, '/client/{}/documents')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: _times(filters.page_size, index => ({
          id: (index + 1),
          owner: faker.name.firstName() + ' ' + faker.name.lastName(),
          document: faker.lorem.word() + '.pdf',
          document_type: 'Medication Instructions',
          document_type_id: 1,
          description: faker.lorem.words(8),
          user: faker.name.firstName() + ' ' + faker.name.lastName(),
          uploaded_at: faker.date.past().toISOString().split('T')[0],
        })) 
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
