import { call, put, takeEvery } from 'redux-saga/effects'

import BreedManagementDuck from '@reducers/pet/breed-manager-setting'

const { types } = BreedManagementDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })
    // const filters = yield select(selectors.filters)

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 1, species: 'Dog',breed: 'Affenpinscher', coloring: 'Black and White', weight_range: '', size: 'Small' },
          { id: 2,  species: 'Dog',breed: 'Affenpinscher-x', coloring: 'Brown', weight_range: '', size: 'Giant'  },
          { id: 3, species: 'Dog',breed: 'Afghan Hound', coloring: 'Blonde', weight_range: '', size: 'Small'  },
          { id: 4,species: 'Dog',breed: 'Afghan Hound-X', coloring: 'Black and White', weight_range: '', size: 'Large' },
          { id: 5, species: 'Dog',breed: 'Airedale Terrier', coloring: 'Gray', weight_range: '', size: 'Large' },
          { id: 6, species: 'Dog',breed: 'Airedale Terrier-X', coloring: 'Black and White', weight_range: '', size: 'Giant' }

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
