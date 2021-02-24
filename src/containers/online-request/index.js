import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Segment, Menu, Breadcrumb } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ClientSubmission from './clientSubmission'
import ConfirmReservations from './confirmReservation'
import CancellationsLogs from './cancellationLog'
import DeclinedClients from './declinedClient'
import VaccinationsUpdate from './vaccinationsUpdate'

const OnlineRequestsShow = () => {
  const [ activeMenuItem, setActiveMenuItem ] = useState('newClientSubmission')

  const _handleMenuItemClick = (e, { name }) => setActiveMenuItem(name)

  return (
    <Layout>
      <Segment className='segment-content petkennect-profile'>
        <Grid>
          <Grid.Column
            className='petkennect-profile-sidebar p32'
            computer={5} mobile={16} tablet={12}>
            <Breadcrumb>
              <Breadcrumb.Section>
                <Link to='/client'>Online Requests</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider/>
              <Breadcrumb.Section active>
               Client Submissions
              </Breadcrumb.Section>
            </Breadcrumb>

            <Menu
              className='petkennect-profile-menu' color='teal' fluid
              vertical>
              <Menu.Item
                active={activeMenuItem === 'newClientSubmission'} link name='newClientSubmission'
                onClick={_handleMenuItemClick}>
                Client Submissions
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'confirmReservations'} link name='confirmReservations'
                onClick={_handleMenuItemClick}>
                Confirm Reservations
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'cancellationsLogs'} link name='cancellationsLogs'
                onClick={_handleMenuItemClick}>
                Cancellations Logs
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'newVacinationsUpdate'} link name='newVacinationsUpdate'
                onClick={_handleMenuItemClick}>
                New Vacinations Update
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'declinedClients'} link name='declinedClients'
                onClick={_handleMenuItemClick}>
                Declined Submissions
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column
            className='petkennect-profile-body'
            computer={11} mobile={16} tablet={16}>
            {activeMenuItem === 'newClientSubmission' && <ClientSubmission/>}
            {activeMenuItem === 'confirmReservations' && <ConfirmReservations/>}
            {activeMenuItem === 'cancellationsLogs' && <CancellationsLogs/>}
            {activeMenuItem === 'newVacinationsUpdate' && <VaccinationsUpdate/>}
            {activeMenuItem === 'declinedClients' && <DeclinedClients/>}
          </Grid.Column>
        </Grid>
      </Segment>
    </Layout>
  )
}

export default (OnlineRequestsShow)
