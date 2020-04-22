import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import createReduxWaitForMiddleware from 'redux-wait-for-action'

import createRootReducer from '@reducers'
import rootSaga from '@sagas'

export const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()

const middlewares = [
  routerMiddleware(history), // for dispatching history actions
  sagaMiddleware,
  createLogger({
    collapsed: true,
    duration : true
  }),
  createReduxWaitForMiddleware()
]

const store = createStore(
  createRootReducer(history), // root reducer with router state
  {}, // Initial state
  compose(
    composeWithDevTools(applyMiddleware(...middlewares))
  )
)

sagaMiddleware.run(rootSaga)

export default store
