import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import { compose } from 'redux'

import authDuck from '@reducers/auth'

const PrivateRoute = ({ auth, check, get, component: Component, ...rest }) => {
  useEffect(() => {
    check()
  }, [])

  useEffect(() => {
    if(auth.auth_status === 'EXISTS')
      get() // Recover auth user detail
    else if(auth.auth_status === 'NOT_EXISTS')
      rest.history.replace('/auth/sign-in')
  }, [ auth.auth_status ])

  useEffect(() => {
    if(auth.status === 'SIGNED_OUT')
      rest.history.replace('/auth/sign-in')
  }, [ auth.status ])

  return (
    <Route {...rest} render={props => <Component {...props}/>}/>
  )
}

export default compose(
  withRouter,
  connect(
    ({ auth }) => ({ auth }),
    {
      check: authDuck.creators.check,
      get  : authDuck.creators.get
    }
  )
)(PrivateRoute)
