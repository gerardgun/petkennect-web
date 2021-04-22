import React, { useEffect , useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Icon, Grid, Header, Message, Step, Segment } from 'semantic-ui-react'
import loadable from '@loadable/component'

import Layout from '@components/Common/Layout'
import Table from '@components/Table'
import emailListConfig from '@lib/constants/list-configs/email-message'
import emailLogListConfig from '@lib/constants/list-configs/email-log'

import EmailMessageCreate from './create'
import emailLogDuck from '@reducers/email-log'
import emailLogDetailDuck from '@reducers/email-log/detail'
import emailMessageDuck from '@reducers/email-message'
import emailMessageDetailDuck from '@reducers/email-message/detail'

import './styles.scss'

const ModalDelete = loadable(() => import('@components/Modal/Delete'))

const EmailMessage = ({ ...props }) => {
  const [ activeMenuItem, setActiveMenuItem ] = useState('inbox')
  useEffect(() => {
    props.getEmailMessage()
    props.getEmailLog()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete')
      props.setItem(null, 'DELETE')
  }
  const _handleLogOptionClick = option => {
    if(option === 'delete')
      props.setLogItem(null, 'DELETE')
  }

  const _handleMenuItemClick = (e, { name }) => setActiveMenuItem(name)

  return (
    <Layout>
      <Segment className='segment-content'>
        <Grid  columns={2} style={{ 'margin-bottom': '1.2rem' }}>
          <Grid.Column>
            <Header as='h2'>Email Messages</Header>
          </Grid.Column >
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

            {
              activeMenuItem === 'inbox'
              && (
                <Table
                  config={emailListConfig}
                  duck={emailMessageDuck}
                  onActionClick={_handleAddBtnClick}
                  onOptionClick={_handleOptionClick}/>
              )
            }

            {activeMenuItem === 'logs'

            &&            <>
              <Message info>
                <Message.Header>Since Monday 6/25/2018 12:57 PM</Message.Header>
                <p><b>Total Emails:</b> 35  |  <b>#Delivered:</b> 35 (100%)   |
                  <b>#Opened:</b> 18 (51%)   |  <b>#Clicked:</b> 4 (11%)  |  <b>#Bounced:</b> 0 (0%)</p>
              </Message>
              <Table
                config={emailLogListConfig}
                duck={emailLogDuck}
                onOptionClick={_handleLogOptionClick}/>
            </>
            }

          </Grid.Column>
        </Grid>
      </Segment>

      <EmailMessageCreate/>
      <ModalDelete duckDetail={emailMessageDetailDuck}/>
      <ModalDelete duckDetail={emailLogDetailDuck}/>
    </Layout>
  )
}
export default compose(
  connect(
    () => ({}), {
      getEmailMessage: emailMessageDuck.creators.get,
      getEmailLog    : emailLogDuck.creators.get,
      setItem        : emailMessageDetailDuck.creators.setItem,
      setLogItem     : emailLogDetailDuck.creators.setItem
    })
)(EmailMessage)
