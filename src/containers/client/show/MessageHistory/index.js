import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid, Header, Segment } from 'semantic-ui-react'
import loadable from '@loadable/component'
import Table from '@components/Table'

import clientEmailListConfig from '@lib/constants/list-configs/client/email-message'

import EmailMessageCreate from '../../../email-message/create'
import clientEmailMessageDuck from '@reducers/client/email-message'
import clientEmailMessageDetailDuck from '@reducers/client/email-message/detail'
import EmailMessageDetailDuck from '@reducers/email-message/detail'
const ModalDelete = loadable(() => import('@components/Modal/Delete'))

const ClientEmailMessage = ({ ...props }) => {
  useEffect(() => {
    props.getEmailMessages()
  }, [])

  // eslint-disable-next-line no-unused-vars
  const _handleOptionClick = option => {
    if(option === 'delete')
      props.setClientItem(null, 'DELETE')
  }

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  return (
    <>
      <Segment style={{ boxShadow: 'none', border: 'none' }}>
        <Grid className='mb20' columns={2}>
          <Grid.Column>
            <Header as='h2'>Message History</Header>
          </Grid.Column >
        </Grid>
        <Table
          config={clientEmailListConfig}
          duck={clientEmailMessageDuck} onActionClick={_handleAddBtnClick}
          onOptionClick={_handleOptionClick}/>
      </Segment>
      <EmailMessageCreate/>
      <ModalDelete duckDetail={clientEmailMessageDetailDuck}/>
    </>
  )
}

export default compose(
  connect(
    ({ clientEmailMessage }) => ({
      clientEmailMessage
    }), {
      getEmailMessages: clientEmailMessageDuck.creators.get,
      setItem         : EmailMessageDetailDuck.creators.setItem,
      setClientItem   : clientEmailMessageDetailDuck.creators.setItem
    })
)(ClientEmailMessage)
