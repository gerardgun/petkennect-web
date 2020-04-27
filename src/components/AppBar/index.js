import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Dropdown, Grid, Input } from 'semantic-ui-react'

import authDuck from '@reducers/auth'

import './AppBar.scss'

const AppBar = ({ auth, ...props }) => {
  const _handleSessionDropdownChange = (e, { value }) => {
    if(value === 'sign-out')
      props.signOut()
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
        <Grid.Column>
          <Input
            className='searcher' icon='search' iconPosition='left'
            placeholder='Search in the panel...'/>
        </Grid.Column>
        <Grid.Column textAlign='right'>
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
      signOut: authDuck.creators.signOut
    }
  )
)(AppBar)
