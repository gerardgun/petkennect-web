import _times from 'lodash/times'
import faker from 'faker'
import {  put,  takeEvery, select } from 'redux-saga/effects'

import dayCampPackageDuck from '@reducers/pet/day-camp-package'

const { types, selectors } = dayCampPackageDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const list = yield select(selectors.list)

    const meta = {
      current_page: 1,
      from        : 1,
      last_page   : 1,
      links       : { next: null, previous: null },
      page_size   : 15,
      to          : 14,
      total_items : 14 }

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: _times(5, index => ({
          id          : index,
          package_type: faker.random.arrayElement([ 'FullDay','HalfDay' ]),
          date        : faker.random.arrayElement([ '10/22/2018','11/22/2020','11/22/2019' ]),
          price       : faker.random.arrayElement([ 30,78,90,89 ]),
          location    : faker.random.arrayElement([ 'S12','Street1','B45','3vp' ]),
          allow_days  : faker.random.arrayElement([ 6,5,7 ]),
          days        : faker.random.arrayElement([ 2,3,5,6, 4 ]),
          used        : faker.random.arrayElement([ 2,1,3, 0 ]),
          reservations: faker.random.arrayElement([ 4 ]),
          remaining   : faker.random.arrayElement([ 4 ])

        })),
        pagination: {
          ...list.pagination,
          meta
        }
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
