import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import { compose } from 'redux'

import authDuck from '@reducers/auth'

const PublicRoute = ({ auth, check, component: Component, ...rest }) => {
  useEffect(() => {
    if(!auth.session_status) check()
  }, [])

  useEffect(() => {
    if(auth.status === 'CHECKED' || auth.status === 'SIGNED_IN')
      if(
        (
          (auth.item.is_superadmin && auth.item.companies.length > 0) || auth.item.companies.length > 1
        )
        && !auth.tenant
      ) {
        rest.history.replace('/auth/sso')
      } else if(auth.item.is_superadmin && !auth.tenant) {
        rest.history.replace('/organization')
      } else if(auth.tenant) {
        rest.history.replace('/dashboard')
      }
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
      check: authDuck.creators.check
    }
  )
)(PublicRoute)
