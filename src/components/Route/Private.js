import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, useHistory } from 'react-router-dom'
import { Dimmer, Loader } from 'semantic-ui-react'

import authDuck from '@reducers/auth'
import tenantDetailDuck from '@reducers/tenant/detail'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const auth = useSelector(authDuck.selectors.detail)
  const tenant = useSelector(tenantDetailDuck.selectors.detail)
  useEffect(() => {
    if(!auth.session_status)
      dispatch(authDuck.creators.check())
  }, [])

  useEffect(() => {
    if(auth.session_status === 'NOT_EXISTS')
      history.replace('/auth/sign-in')
  }, [ auth.session_status ])

  useEffect(() => {
    if(auth.status === 'SIGNED_OUT')
      history.replace('/auth/sign-in')
  }, [ auth.status ])

  useEffect(() => {
    if(!tenant.item.id)
      dispatch(tenantDetailDuck.creators.get())
  }, [])

  return [ 'PRISTINE', 'CHECKING', 'GETTING' ].includes(auth.status) ? (
    <Dimmer active inverted>
      <Loader>Loading</Loader>
    </Dimmer>
  ) : (
    <Route {...rest} render={props => <Component {...props} key={auth.tenant}/>}/>
  )
}

export default PrivateRoute
