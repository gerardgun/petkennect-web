import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import auth from '@reducers/auth'
import client from '@reducers/client'
import clientDetail from '@reducers/client/detail'
import clientInteraction from '@reducers/client/interaction'
import clientInteractionDetail from '@reducers/client/interaction/detail'
import user from '@reducers/user'
import userDetail from '@reducers/user/detail'

const createRootReducer = history => combineReducers({
  form                : formReducer,
  router              : connectRouter(history),
  [auth.store]        : auth.reducer,
  [client.store]      : client.reducer,
  [clientDetail.store]: clientDetail.reducer,
  [clientInteraction.store]: clientInteraction.reducer,
  [clientInteractionDetail.store]: clientInteractionDetail.reducer,
  [user.store]        : user.reducer,
  [userDetail.store]  : userDetail.reducer
})

export default createRootReducer