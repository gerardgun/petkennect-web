import { put, select, takeEvery } from 'redux-saga/effects'
import faker from 'faker'
import reservationGroomingDuck from '@reducers/pet/reservation/grooming'

const { types, selectors } = reservationGroomingDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })
    let id = 0

    const meta = {
      current_page: 1,
      from        : 1,
      last_page   : 1,
      links       : { next: null, previous: null },
      page_size   : 5,
      to          : 7,
      total_items : 8 }

    // const petDetail = yield select(petDetailDuck.selectors.detail)

    // const filters = yield select(selectors.filters)
    const list = yield select(selectors.list)

    // const { results, ...meta  } = yield call(Get, `/pets/${petDetail.item.id}/reservations/`)

    yield put({
      type   : types.GET_FULFILLED,
      // payload: {
      //   items: results.filter(_item => _item.service_type === 'G').map(({ employee_first_name = '-',
      // employee_last_name = '', reserved_at = '',...rest })=> ({
      //     employee_fullname: `${employee_first_name} ${employee_last_name}`,
      //     is_pending       : moment.utc(rest.reserved_at, 'YYYY-MM-DD HH-mm:ss Z')
      //       .isSameOrAfter(moment(),'day'),
      //     reserved_at     : `${reserved_at}`,
      //     reserved_date   : moment.utc(`${reserved_at}`,'YYYY-MM-DD[T]HH:mm:ss').format('YYYY-MM-DD'),
      //     reserved_at_time: moment.utc(`${reserved_at}`).format('hh:mm:ss a'),
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
          service      : faker.random.arrayElement([ 'Bath Brush', 'Hair Cut', 'Nails Only' ]),
          location_name: faker.random.arrayElement([ 'S-Stadium' ]),
          type         : faker.random.arrayElement([ '', 'Appointment', '' ]),
          other_service: faker.random.arrayElement([ 'Boarding', 'DayCamp', 'Training' ]),
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
