import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid, Segment, Image, Menu, Header, Dropdown, Button } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import InformationSection from './InformationSection'
import PreferenceSection from './PreferenceSection'
import { defaultImageUrl } from '@lib/constants'

import authDuck from '@reducers/auth'

const PetShow = ({ auth, ...props }) => {
  const { item: user } = auth

  useEffect(() => {
    if(auth.status === 'PATCHED') props.get()
  }, auth.status)

  const [ activeMenuItem, setActiveMenuItem ] = useState('info')

  const _handleMenuItemClick = (e, { name }) => setActiveMenuItem(name)

  const _handleOptionDropdownChange = () => {
    alert('In development...')
  }

  return (
    <Layout>
      <Segment className='segment-content petkennect-profile'>
        <Grid>
          <Grid.Column
            className='petkennect-profile-sidebar p40'
            computer={5} mobile={16} tablet={5}>
            <div className='flex justify-center align-center mt40'>
              <div className='c-image-profile'>
                <Image circular src={user.image_path || defaultImageUrl}/>
              </div>
            </div>
            <div className='flex justify-between align-center mb24'>
              <Header as='h2'>{user.first_name} {user.last_name}</Header>

              <Dropdown
                direction='left'
                icon={null}
                onChange={_handleOptionDropdownChange}
                options={[
                  { key: 1, icon: 'download', value: 'download-profile', text: 'Download Profile' },
                  { key: 2, icon: 'paper plane outline', value: 'send-email', text: 'Send Email' }
                ]}
                selectOnBlur={false}
                trigger={(
                  <Button basic icon='ellipsis vertical'/>
                )}
                value={null}/>
            </div>
            <Menu
              className='petkennect-profile-menu' color='teal' fluid
              vertical>
              <Menu.Item
                active={activeMenuItem === 'info'} link name='info'
                onClick={_handleMenuItemClick}>
                My Profile
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'preferences'} disabled link
                name='preferences'
                onClick={_handleMenuItemClick}>
                Preferences (Not available)
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column
            className='petkennect-profile-body'
            computer={11} mobile={16} tablet={11}>
            {activeMenuItem === 'info' && <InformationSection/>}
            {activeMenuItem === 'preferences' && <PreferenceSection/>}
          </Grid.Column>
        </Grid>
      </Segment>
    </Layout>
  )
}

export default compose(
  connect(
    ({ auth }) => ({
      auth
    }), {
      get: authDuck.creators.get
    })
)(PetShow)
