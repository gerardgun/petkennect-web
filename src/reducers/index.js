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
import pet from '@reducers/pet'
import petDetail from '@reducers/pet/detail'
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
  [pet.store]      : pet.reducer,
  [petDetail.store]: petDetail.reducer,
  [user.store]        : user.reducer,
  [userDetail.store]  : userDetail.reducer
})

export default createRootReducer