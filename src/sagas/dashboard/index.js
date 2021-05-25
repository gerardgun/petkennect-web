import { call, put, select, takeEvery } from 'redux-saga/effects'

import dashboardDuck from '@reducers/dashboard'

const { selectors, types } = dashboardDuck

function* get() {
  try {
    const filters = yield select(selectors.filters)
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    const result =  [ { id: 1, pet: { name: 'Boots', breed: 'Mixed Breed', image: '/images/dogboarding.png' },service: { name: 'Boarding', checkin: '02/02/21', checkout: '12/22/21', type: 'Full Day Boarding' }, client: { name: 'James back', phone: '314-757-2067' },report_card: '' },
      { id: 2, pet: { name: 'Loki', breed: 'Mixed Breed', image: '/images/hydrobath.png' },service: { name: 'Grooming', checkin: '02/02/21', checkout: '12/22/21', type: 'Full Day Grooming' }, client: { name: 'Allseia Med', phone: '314-757-2067' },report_card: '' },
      { id: 3, pet: { name: 'Terror', breed: 'Mixed Breed', image: '/images/DogDaycare_Color.png' },service: { name: 'Day Care', checkin: '02/02/21', checkout: '12/22/21', type: 'Full Day Camp' }, client: { name: 'Jhon James', phone: '314-757-2067' },report_card: '' },
      { id: 4, pet: { name: 'Tizen', breed: 'Mixed Breed', image: '/images/DogTraining_2.png' },service: { name: 'Training', checkin: '02/02/21', checkout: '12/22/21', type: 'Full Day Training' }, client: { name: 'Megan Justice', phone: '314-757-2067' },report_card: '' },
      { id: 5, pet: { name: 'Hammer', breed: 'Mixed Breed', image: '/images/DogTraining_2.png' },service: { name: 'Training', checkin: '02/02/21', checkout: '12/22/21', type: 'Full Day Training' }, client: { name: 'Megan Justice', phone: '314-757-2067' },report_card: '' },
      { id: 6, pet: { name: 'Terror', breed: 'Mixed Breed', image: '/images/DogDaycare_Color.png' },service: { name: 'Day Care', checkin: '02/02/21', checkout: '12/22/21', type: 'Full Day Camp' }, client: { name: 'Jhon James', phone: '314-757-2067' },report_card: '' }

    ]
    let finalResult
    if(filters.search == '' || filters.search == 'All')
      finalResult = result
    else
      finalResult = result && result.filter((item)=>item.service.name === filters.search)
    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: finalResult
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
