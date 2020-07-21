import { ConnectedRouter } from 'connected-react-router'
import { hot } from 'react-hot-loader/root'
import React from 'react'
import { Provider } from 'react-redux'
import { Switch } from 'react-router-dom'

import PrivateRoute from '@components/Route/Private'
import PublicRoute from '@components/Route/Public'

import routes from '@routes'
import store, { history } from './store/configureStore'

const AppRouter = () => (
  <ConnectedRouter history={history}>
    <Switch>
      {
        routes.map((route, index) => (
          route.auth === true ? (
            <PrivateRoute key={index} {...route}/>
          ) : (
            <PublicRoute key={index} {...route}/>
          )
        ))
      }
    </Switch>
  </ConnectedRouter>
)

const App = () => (
  <Provider store={store}>
    <AppRouter/>
  </Provider>
)

export default hot(App)
