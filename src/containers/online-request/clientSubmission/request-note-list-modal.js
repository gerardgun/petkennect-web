import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Form, Header, Modal } from 'semantic-ui-react'

import RequestNoteList from './show/request-note-list'

import clientSubmissionDetailDuck from '@reducers/online-request/client-submission/detail'
import onlineRequestNoteDuck from '@reducers/online-request/note'

const RequestNoteListModal = props => {
  const {
    clientSubmissionDetail
  } = props

  useEffect(() => {
    if(clientSubmissionDetail.mode === 'READ_NOTES')
      props.getRequestNotes({
        request_id: clientSubmissionDetail.item.id
      })
  }, [ clientSubmissionDetail.mode ])

  const _handleClose = () => {
    props.resetItem()
  }

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={clientSubmissionDetail.mode === 'READ_NOTES'}
      size='small'>
      <Modal.Content>
        <Header as='h2'>Notes</Header>

        <RequestNoteList/>

      </Modal.Content>
    </Modal>
  )
}

export default compose(
  connect(
    state => ({
      clientSubmissionDetail: clientSubmissionDetailDuck.selectors.detail(state)
    }),
    {
      getRequestNotes: onlineRequestNoteDuck.creators.get,
      resetItem      : clientSubmissionDetailDuck.creators.resetItem
    }
  )
)(RequestNoteListModal)
