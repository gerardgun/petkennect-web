import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createReduxWaitForMiddleware from 'redux-wait-for-action'

import createRootReducer from '@reducers'
import rootSaga from '@sagas'

export const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()

const middlewares = [
  routerMiddleware(history), // for dispatching history actions
  sagaMiddleware,
  createReduxWaitForMiddleware()
]

const store = createStore(
  createRootReducer(history), // root reducer with router state
  {}, // Initial state
  compose(
    applyMiddleware(...middlewares)
  )
)

sagaMiddleware.run(rootSaga)

export default store
