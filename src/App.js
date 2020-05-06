import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import { Provider } from 'react-redux'
import { Switch, BrowserRouter as Router } from 'react-router-dom'

import PrivateRoute from '@components/Route/Private'
import PublicRoute from '@components/Route/Public'

import routes from '@routes'
import store, { history } from './store/configureStore'
import Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import CustomDragLayer from '@components/Common/CustomDragLayer'

const AppRouter = () => (
  <ConnectedRouter history={history}>
    <Router>
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
    </Router>
    <CustomDragLayer />
  </ConnectedRouter>
)

const App = () => (
  <DndProvider backend={Backend}>
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  </DndProvider>
)

export default App
