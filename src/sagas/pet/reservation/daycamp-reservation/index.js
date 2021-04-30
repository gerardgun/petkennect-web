import { call, put, select, takeEvery } from 'redux-saga/effects'
// import { Get } from '@lib/utils/http-client'
// import faker from 'faker'
// import moment from 'moment'

// import petDetailDuck from '@reducers/pet/detail'
import petDaycampReservationDuck from '@reducers/pet/reservation/daycamp-reservation'

const { types, selectors } = petDaycampReservationDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    const list = yield select(selectors.list)

    const meta = {
      current_page: 1,
      from        : 1,
      last_page   : 1,
      links       : { next: null, previous: null },
      page_size   : 5,
      to          : 5,
      total_items : 5 }

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 0, reserved_at: '03/16/2021', service: 'Day Camp', location: 'S Stadium', type: 'Full Day', yard_type: 'Medium', run: 'A5', addons: '$ 999.00', checkin_time: '9:00 AM', checkout_at: '5:00 PM' },
          { id: 1, reserved_at: '03/18/2021', service: 'Fitness', location: 'S Stadium', type: 'Half Day', yard_type: 'Small', run: '', addons: 'Add', checkin_time: '9:00 AM', checkout_at: '5:00 PM' },
          { id: 2, reserved_at: '03/21/2021', service: 'Dog Walking', location: 'R University', type: 'Appointment', yard_type: 'Large', run: '', addons: '$ 80.00', checkin_time: '12:00 AM', checkout_at: '6:00 PM' },
          { id: 3, reserved_at: '03/25/2021', service: 'Day Camp', location: 'R University', type: 'Half Day', yard_type: 'Large', run: 'A5', addons: 'Add', checkin_time: '12:00 AM', checkout_at: '6:00 PM' },
          { id: 4, reserved_at: '03/29/2021', service: 'Fitness', location: 'S Stadium', type: 'Full Day', yard_type: 'Small', run: '', addons: '$ 60.00', checkin_time: '9:00 AM', checkout_at: '5:00 PM' }
        ],
        pagination: {
          ...list.pagination,
          meta
        }
      }
    })
    // yield put({ type: types.GET_PENDING })

    // const petDetail = yield select(petDetailDuck.selectors.detail)
    // yield call(() => new Promise(resolve => setTimeout(resolve, 500)))
    // const filters = yield select(selectors.filters)
    // const list = yield select(selectors.list)

    // const { results, ...meta  } = yield call(Get, `/pets/${petDetail.item.id}/reservations/`,filters)
    // yield put({
    //   type   : types.GET_FULFILLED,
    //   payload: {
    //     items: results.filter(_ => _.service_type == 'D').map(({
    //   employee_first_name = '-', employee_last_name = '', reserved_at = '', ...rest })=> ({
    //       employee_fullname: `${employee_first_name} ${employee_last_name}`,
    //       ischeckOut       : faker.random.arrayElement([ 'true','false' ]),
    //       reserved_at      : `${reserved_at}`,
    //       checkout_at      : moment.utc(`${rest.daycamp && rest.daycamp.checkout_at}`).format('hh:mm:ss a'),
    //       checkout         : `${rest.daycamp && rest.daycamp.checkout_at}`,
    //       yard_type        : `${rest.daycamp && rest.daycamp.yard_type}`,
    //       type             : `${rest.daycamp && rest.daycamp.type}`,
    //       reserved_at_time : moment.utc(`${reserved_at}`).format('hh:mm:ss a'),
    //       ...rest
    //     })),
    //     pagination: {
    //       ...list.pagination,
    //       meta
    //     }
    //   }
    // })
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
