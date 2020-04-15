import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import auth from '@reducers/auth'
import client from '@reducers/client'
import clientDetail from '@reducers/client/detail'
import clientDocument from '@reducers/client/document'
import clientDocumentDetail from '@reducers/client/document/detail'
import clientInteraction from '@reducers/client/interaction'
import clientInteractionDetail from '@reducers/client/interaction/detail'
import clientPet from '@reducers/client/pet'
import company from '@reducers/company'
import companyDetail from '@reducers/company/detail'
import organization from '@reducers/organization'
import organizationDetail from '@reducers/organization/detail'
import organizationCompany from '@reducers/organization/company'
import pet from '@reducers/pet'
import petDetail from '@reducers/pet/detail'
import transaction from '@reducers/transaction'
import transactionDetail from '@reducers/transaction/detail'
import user from '@reducers/user'
import userDetail from '@reducers/user/detail'

const createRootReducer = history => combineReducers({
  form                : formReducer,
  router              : connectRouter(history),
  [auth.store]        : auth.reducer,
  [client.store]      : client.reducer,
  [clientDetail.store]: clientDetail.reducer,
  [clientDocument.store]: clientDocument.reducer,
  [clientDocumentDetail.store]: clientDocumentDetail.reducer,
  [clientInteraction.store]: clientInteraction.reducer,
  [clientInteractionDetail.store]: clientInteractionDetail.reducer,
  [clientPet.store]   : clientPet.reducer,
  [company.store]: company.reducer,
  [companyDetail.store]: companyDetail.reducer,
  [organization.store]      : organization.reducer,
  [organizationDetail.store]: organizationDetail.reducer,
  [organizationCompany.store]      : organizationCompany.reducer,
  [pet.store]      : pet.reducer,
  [petDetail.store]: petDetail.reducer,
  [transaction.store]      : transaction.reducer,
  [transactionDetail.store]: transactionDetail.reducer,
  [user.store]        : user.reducer,
  [userDetail.store]  : userDetail.reducer
})

export default createRootReducer