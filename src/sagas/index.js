import { all } from 'redux-saga/effects'

import auth from './auth'
import client from './client'
import clientDetail from './client/detail'
import user from './user'
import userDetail from './user/detail'

export default function* rootSaga() {
  yield all([
    ...auth,
    ...client,
    ...clientDetail,
    ...user,
    ...userDetail,
  ])
}
