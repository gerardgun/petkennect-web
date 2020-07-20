import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import { compose } from 'redux'

import authDuck from '@reducers/auth'

const PrivateRoute = ({ auth, check, component: Component, ...rest }) => {
  useEffect(() => {
    if(!auth.session_status) check()
  }, [])

  useEffect(() => {
    if(auth.session_status === 'NOT_EXISTS')
      rest.history.replace('/auth/sign-in')
  }, [ auth.session_status ])

  useEffect(() => {
    if(auth.status === 'SIGNED_OUT')
      rest.history.replace('/auth/sign-in')
  }, [ auth.status ])

  return (
    <Route {...rest} render={props => <Component {...props} key={rest.path + auth.tenant}/>}/>
  )
}

export default compose(
  withRouter,
  connect(
    ({ auth }) => ({ auth }),
    {
      check: authDuck.creators.check
    }
  )
)(PrivateRoute)
