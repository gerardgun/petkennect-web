import { all } from 'redux-saga/effects'

import auth from './auth'
import client from './client'
import clientDetail from './client/detail'
import clientInteraction from './client/interaction'
import clientInteractionDetail from './client/interaction/detail'
import user from './user'
import userDetail from './user/detail'

export default function* rootSaga() {
  yield all([
    ...auth,
    ...client,
    ...clientDetail,
    ...clientInteraction,
    ...clientInteractionDetail,
    ...user,
    ...userDetail,
  ])
}
