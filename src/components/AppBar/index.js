import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Dropdown, Grid, Input } from 'semantic-ui-react'

import authDuck from '@reducers/auth'

const AppBar = ({ auth, ...props }) => {
  const { item : { companies = [] } = {} } = auth

  const _handleSessionDropdownChange = (e, { value }) => {
    if(value === 'sign-out')
      props.signOut()
  }

  const _handleCompanyDropDown = (e, { value }) => {
    props.rehydrateTenant(value)
  }
  const getOptions = () => {
    const options = [
      { key: 'profile', value: 'profile', text: 'Your Profile' },
      { key: 'help', value: 'help', text: 'Help' },
      { key: 'settings', value: 'settings', text: 'Settings' },
      { key: 'sign-out', value: 'sign-out', text: 'Sign Out' }
    ]

    if(auth.item.id)
      options.unshift({
        key : 'user',
        text: (
          <span>
            Signed in as <strong>{auth.item.is_superadmin ? 'super admin' : 'admin'}</strong>
          </span>
        ),
        disabled: true
      })

    return options
  }

  const profileOptions = useMemo(() => getOptions(), [ auth.item.id ])

  return (
    <div className='app-bar'>
      <Grid columns={2}>
        <Grid.Column width={6}>
          <Input
            className='searcher' icon='search' iconPosition='left'
            placeholder='Search in the panel...'/>
        </Grid.Column>
        <Grid.Column textAlign='right' width={10}>

          {!auth.item.is_superadmin && <Dropdown
            className='profile-company'
            icon='angle down'
            onChange={_handleCompanyDropDown}
            options={
              companies
                .map(_company => ({
                  key  : _company.id,
                  value: _company.subdomain_prefix,
                  text : _company.legal_name
                }))
            }
            scrolling
            selectOnBlur={false}
            trigger={(
              <span className='profile-avatar-trigger'>
                {(companies.find(_company =>_company.subdomain_prefix === auth.tenant) || {}).legal_name}
              </span>
            )}
            value={null}/>}
          <Dropdown
            className='profile-avatar'
            icon='angle down'
            onChange={_handleSessionDropdownChange}
            options={profileOptions}
            selectOnBlur={false}
            trigger={(
              <span className='profile-avatar-trigger'>
                <div className='profile-avatar-circle'>AD</div>
                {auth.item.id && auth.item.email}
              </span>
            )}
            value={null}/>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default compose(
  connect(
    ({ auth }) => ({
      auth
    }),
    {
      signOut        : authDuck.creators.signOut,
      rehydrateTenant: authDuck.creators.rehydrateTenant
    }
  )
)(AppBar)
