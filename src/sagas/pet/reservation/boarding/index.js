import { call, put, select, takeEvery } from 'redux-saga/effects'
// import { Get } from '@lib/utils/http-client'

// import petDetailDuck from '@reducers/pet/detail'

import petReservationBoardingDuck from '@reducers/pet/reservation/boarding'
// import moment from 'moment'

const { types, selectors } = petReservationBoardingDuck

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
        items: [ { id: 0, reserved: '03/16/2021', service: 'Day Camp', location_code: 'S Stadium',night: '10', type: 'Single',  run: 'A5', addons: '$ 40.00', check_in_date: '06/16/2021', checkout_at: '06/26/2021' },
          { id: 1, reserved: '03/18/2021', service: 'Fitness', location_code: 'S Stadium', night: '4',type: 'Single',  run: 'A6', addons: 'Add', check_in_date: '03/16/2021', checkout_at: '03/20/2021' },
          { id: 2, reserved: '03/21/2021', service: 'Dog Walking', location_code: 'R University',night: '6', type: 'Shared',  run: 'A5', addons: '$ 80.00',check_in_date: '04/1/2021', checkout_at: '01/7/2021'  }

        ],
        pagination: {
          ...list.pagination,
          meta
        }
      }
    })

    // const petDetail = yield select(petDetailDuck.selectors.detail)

    // const { results, ...meta  } = yield call(Get, `/pets/${petDetail.item.id}/reservations/`)

    // const  filterdResults = results.filter(_item => _item.service_type === 'B')
    // yield put({
    //   type   : types.GET_FULFILLED,
    //   payload: {
    //     items: filterdResults.map(({ employee_first_name = '-', employee_last_name = '',...rest })=> ({
    //       employee_fullname: `${employee_first_name} ${employee_last_name}`,
    //       is_pending       : moment.utc(rest.reserved_at, 'YYYY-MM-DD HH-mm:ss Z')
    //         .isSameOrAfter(moment(),'day'),
    //       reserved     : moment.utc(rest.reserved_at,'YYYY-MM-DD[T]HH:mm:ss').format('YYYY-MM-DD'),
    //       checkout_at  : moment.utc(rest.boarding.checkout_at,'YYYY-MM-DD[T]HH:mm:ss').format('YYYY-MM-DD'),
    //       check_in_date: moment.utc(rest.reserved_at,'YYYY-MM-DD[T]HH:mm:ss').format('YYYY-MM-DD'),

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
