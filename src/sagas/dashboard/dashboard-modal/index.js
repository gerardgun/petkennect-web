import { call, put, takeEvery } from 'redux-saga/effects'

import dashboardModalDuck from '@reducers/dashboard/dashboard-modal'

const { types } = dashboardModalDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 1, pet: { name: 'Boots', breed: 'Mixed Breed', image: '/images/dogboarding.png' },service: { name: 'Boarding', checkin: '02/02/21', checkout: '12/22/21', type: 'Full Day Boarding' }, client: { name: 'James back', phone: '314-757-2067' },report_card: 'Add/Edit' },
          { id: 2, pet: { name: 'Loki', breed: 'Mixed Breed', image: '/images/hydrobath.png' },service: { name: 'Grooming', checkin: '02/02/21', checkout: '12/22/21', type: 'Full Day Grooming' }, client: { name: 'Allseia Med', phone: '314-757-2067' },report_card: 'Add/Edit' },
          { id: 3, pet: { name: 'Terror', breed: 'Mixed Breed', image: '/images/DogDaycare_Color.png' },service: { name: 'Day Camp', checkin: '02/02/21', checkout: '12/22/21', type: 'Full Day Camp' }, client: { name: 'Jhon James', phone: '314-757-2067' },report_card: 'Add/Edit' },
          { id: 4, pet: { name: 'Tizen', breed: 'Mixed Breed', image: '/images/DogTraining_2.png' },service: { name: 'Training', checkin: '02/02/21', checkout: '12/22/21', type: 'Full Day Training' }, client: { name: 'Megan Justice', phone: '314-757-2067' },report_card: 'Add/Edit' },
          { id: 5, pet: { name: 'Hammer', breed: 'Mixed Breed', image: '/images/DogTraining_2.png' },service: { name: 'Training', checkin: '02/02/21', checkout: '12/22/21', type: 'Full Day Training' }, client: { name: 'Megan Justice', phone: '314-757-2067' },report_card: 'Add/Edit' }
        ]
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
