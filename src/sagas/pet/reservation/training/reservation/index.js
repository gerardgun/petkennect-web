import { call, put, select, takeEvery } from 'redux-saga/effects'
import { Get } from '@lib/utils/http-client'
import faker from 'faker'
import petDetailDuck from '@reducers/pet/detail'
import petTrainingReservationDuck from '@reducers/pet/reservation/training/reservation'

const { types, selectors } = petTrainingReservationDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    // const petDetail = yield select(petDetailDuck.selectors.detail)

    // // const filters = yield select(selectors.filters)
    let id = 0
    const list = yield select(selectors.list)
    const meta = {
      current_page: 1,
      from        : 1,
      last_page   : 1,
      links       : { next: null, previous: null },
      page_size   : 5,
      to          : 7,
      total_items : 8 }

    // const { results, ...meta  } = yield call(Get, `/pets/${petDetail.item.id}/reservations/`)
    // console.log(results)

    // const filterdResults = results.filter(_item => _item.service_type === 'T')
    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type: types.GET_FULFILLED,
      // payload: {
      //   items: filterdResults.map(({ employee_first_name = '-', employee_last_name = '', reserved_at = '' ,...rest })=> ({
      //     employee_fullname: `${employee_first_name} ${employee_last_name}`,
      //     is_pending       : moment.utc(rest.reserved_at, 'YYYY-MM-DD HH-mm:ss Z')
      //       .isSameOrAfter(moment(),'day'),
      //     reserved_at     : `${reserved_at}`,
      //     reserved_at_time: moment(`${reserved_at}`).format('hh:mm:ss a'),
      //     ...rest
      //   })),
      //   pagination: {
      //     ...list.pagination,
      //     meta
      //   }
      // }

      payload: {
        items: Array.from({ length: 3 }, index => ({
          id           : id++,
          reserved_at  : faker.date.future(),
          program      : faker.random.arrayElement([ 'Private Lessons', 'Agility 1', '4 Week Day Train' ]),
          location_name: faker.random.arrayElement([ 'S-Stadium' ]),
          type         : faker.random.arrayElement([ 'Day Train', 'Appointment', 'Group Class' ]),
          status       : faker.random.arrayElement([ 'Makeup', 'Included', 'Rescheduled' ]),
          run          : faker.random.arrayElement([ 'A5', 'A6' ]),
          time_in      : faker.random.arrayElement([ '8:00 AM', '12:00 PM', '6:00 PM' ]),
          time_out     : faker.random.arrayElement([ '5:00 PM', '10:00 PM', '8:00 PM' ])

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
