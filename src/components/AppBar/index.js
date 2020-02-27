import React from 'react'
import { Dropdown, Grid, Input } from 'semantic-ui-react'

import './AppBar.scss'

const profileOptions = [
  {
    key: 'user',
    text: (
      <span>
        Signed in as <strong>Jhon Doe</strong>
      </span>
    ),
    disabled: true,
  },
  { key: 'profile', text: 'Your Profile' },
  { key: 'help', text: 'Help' },
  { key: 'settings', text: 'Settings' },
  { key: 'sign-out', text: 'Sign Out' },
]

const AppBar = () =>  (
  <div className='app-bar'>
    <Grid columns={2}>
      <Grid.Column>
        <Input className='searcher' icon='search' iconPosition='left' placeholder='Search in the panel...' />
      </Grid.Column>
      <Grid.Column textAlign='right'>
        <Dropdown
          className='profile-avatar'
          icon='angle down'
          trigger={(
            <span className='profile-avatar-trigger'>
              <div className='profile-avatar-circle'>AD</div>
              admin@petkennect.com
            </span>
          )}
          options={profileOptions} />
      </Grid.Column>
    </Grid>
  </div>
)

export default AppBar
