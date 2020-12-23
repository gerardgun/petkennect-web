import React, { useEffect , useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Icon, Grid, Header, Message, Step, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Table from '@components/Table'

import EmailMessageCreate from './create'
import emailLogDuck from '@reducers/email-log'
import emailMessageDuck from '@reducers/email-message'
import emailMessageDetailDuck from '@reducers/email-message/detail'

import './styles.scss'

const EmailMessage = ({ ...props }) => {
  const [ activeMenuItem, setActiveMenuItem ] = useState('inbox')
  useEffect(() => {
    props.getEmailMessage()
    props.getEmailLog()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleMenuItemClick = (e, { name }) => setActiveMenuItem(name)

  return (
    <Layout>
      <Segment className='segment-content'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2'>Email Messages</Header>
          </Grid.Column >
          <Grid.Column
            className='ui-grid-align'
            computer={8} mobile={12} tablet={8}>
            <Button
              color='teal' content='Compose' icon='edit'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>

        <Grid className='grid-email-message' columns={2}>
          <Grid.Column width={3}>
            <Step.Group fluid vertical>
              <Step active={activeMenuItem === 'inbox'} name='inbox' onClick={_handleMenuItemClick} >
                <Icon name='inbox'/>
                <Step.Content>
                  <Step.Title>Inbox</Step.Title>
                </Step.Content>
              </Step>

              <Step active={activeMenuItem === 'unread'} name='unread' onClick={_handleMenuItemClick} >
                <Icon name='star'/>
                <Step.Content>
                  <Step.Title>Unread</Step.Title>
                </Step.Content>
              </Step>
              <Step active={activeMenuItem === 'sent'} name='sent' onClick={_handleMenuItemClick} >
                <Icon name='send'/>
                <Step.Content>
                  <Step.Title>Sent</Step.Title>
                </Step.Content>
              </Step>
              <Step active={activeMenuItem === 'draft'} name='draft' onClick={_handleMenuItemClick}>
                <Icon name='firstdraft'/>
                <Step.Content>
                  <Step.Title>Draft</Step.Title>
                </Step.Content>
              </Step>
              <Step active={activeMenuItem === 'trash'} name='trash' onClick={_handleMenuItemClick}>
                <Icon name='trash'/>
                <Step.Content>
                  <Step.Title>Trash</Step.Title>
                </Step.Content>
              </Step>
              <Step active={activeMenuItem === 'logs'} name='logs' onClick={_handleMenuItemClick} >
                <Icon name='file'/>
                <Step.Content>
                  <Step.Title>Logs</Step.Title>
                </Step.Content>
              </Step>
            </Step.Group>

          </Grid.Column>

          <Grid.Column width={13}>

            {activeMenuItem === 'inbox'
            && <Table
              duck={emailMessageDuck}/>}

            {activeMenuItem === 'logs'

            &&            <>
              <Message info>
                <Message.Header>Since Monday 6/25/2018 12:57 PM</Message.Header>
                <p><b>Total Emails:</b> 35  |  <b>#Delivered:</b> 35 (100%)   |
                  <b>#Opened:</b> 18 (51%)   |  <b>#Clicked:</b> 4 (11%)  |  <b>#Bounced:</b> 0 (0%)</p>
              </Message>
              <Table
                duck={emailLogDuck}/>
            </>
            }

          </Grid.Column>
        </Grid>
      </Segment>

      <EmailMessageCreate/>
    </Layout>
  )
}
export default compose(
  connect(
    () => ({}), {
      getEmailMessage: emailMessageDuck.creators.get,
      getEmailLog    : emailLogDuck.creators.get,
      setItem        : emailMessageDetailDuck.creators.setItem
    })
)(EmailMessage)
