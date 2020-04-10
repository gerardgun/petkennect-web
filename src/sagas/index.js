import { all } from 'redux-saga/effects'

import auth from './auth'
import client from './client'
import clientDetail from './client/detail'
import clientDocument from './client/document'
import clientDocumentDetail from './client/document/detail'
import clientInteraction from './client/interaction'
import clientInteractionDetail from './client/interaction/detail'
import clientPet from './client/pet'
import company from './company'
import companyDetail from './company/detail'
import organization from './organization'
import organizationDetail from './organization/detail'
import pet from './pet'
import petDetail from './pet/detail'
import user from './user'
import userDetail from './user/detail'

export default function* rootSaga() {
  yield all([
    ...auth,
    ...client,
    ...clientDetail,
    ...clientDocument,
    ...clientDocumentDetail,
    ...clientInteraction,
    ...clientInteractionDetail,
    ...clientPet,
    ...company,
    ...companyDetail,
    ...organization,
    ...organizationDetail,
    ...pet,
    ...petDetail,
    ...user,
    ...userDetail,
  ])
}
