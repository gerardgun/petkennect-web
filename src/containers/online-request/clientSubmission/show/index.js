import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Divider, Header, Tab, Grid, Modal } from 'semantic-ui-react'

import useModal from '@components/Modal/useModal'
import InformationSection from './sections/information'
import PetsSection from './sections/pets'
import DocumentsSection from './sections/documents'
import RejectForm from './reject-form'
import RequestNoteList from './request-note-list'

import clientSubmissionDetailDuck from '@reducers/online-request/client-submission/detail'
import onlineRequestNoteDuck from '@reducers/online-request/note'
import clientDetailDuck from '@reducers/client/detail'
import clientPetDuck from '@reducers/client/pet'
import clientDocumentDuck from '@reducers/client/document'
import petDetailDuck from '@reducers/pet/detail'

import './../styles.scss'

const ClientSubmissionShow = props => {
  const {
    clientSubmissionDetail,
    clientDetail,
    clientPet,
    clientDocument,
    requestNote
  } = props

  const [ open, { _handleOpen: _handleRejectFormOpen, _handleClose: _handleRejectFormClose } ] = useModal()

  useEffect(() => {
    if(clientSubmissionDetail.mode === 'READ') {
      props.get(clientSubmissionDetail.item.id)
      props.getRequestNotes({
        request_id: clientSubmissionDetail.item.id
      })
    }
  }, [ clientSubmissionDetail.mode ])

  useEffect(() => {
    if(clientSubmissionDetail.status === 'PATCHED') _handleClose()
  }, [ clientSubmissionDetail.status ])

  const _handleClose = () => {
    props.resetItem()
    props.resetPet()
    _handleRejectFormClose()
  }

  const _handleApproveBtnClick = () => {
    props.patch({
      id     : clientSubmissionDetail.item.id,
      status : 'A', // A => Approved
      comment: 'Approved'
    })
  }

  const _handleRejectSubmit = ({ comment }) => {
    props.patch({
      id    : clientSubmissionDetail.item.id,
      status: 'R', // R => Rejected
      comment
    })
  }

  const loading = clientSubmissionDetail.status === 'PATCHING'

  return (
    <>
      <Modal
        className='form-modal modal-width'
        onClose={_handleClose}
        open={clientSubmissionDetail.mode === 'READ'}
        size='large'>
        <Modal.Content>
          <Grid>
            <Grid.Row>

              {/* BEGIN Tabs */}
              <Grid.Column width={12}>
                <Tab panes={[
                  {
                    menuItem: 'Client Information',
                    render  : () => (
                      <Tab.Pane loading={clientDetail.status === 'GETTING'}>
                        <InformationSection/>
                      </Tab.Pane>
                    )
                  },
                  {
                    menuItem: 'Pets',
                    render  : () => (
                      <Tab.Pane loading={clientPet.status === 'GETTING'}>
                        <PetsSection/>
                      </Tab.Pane>
                    )
                  },
                  {
                    menuItem: 'Documents',
                    render  : () => (
                      <Tab.Pane loading={clientDocument.status === 'GETTING'}>
                        <DocumentsSection/>
                      </Tab.Pane>
                    )
                  }
                ]}/>
              </Grid.Column>
              {/* END Tabs */}

              {/* BEGIN Request Notes */}
              <Grid.Column width={4}>
                <Header as='h2'>New Customer</Header>
                <p>Please do not forgot to confirm the following information</p>

                <RequestNoteList/>

                <Divider/>

                <Button
                  basic
                  color='teal'
                  content='Decline'
                  disabled={loading}
                  onClick={_handleRejectFormOpen}
                  type='button'/>
                <Button
                  color='teal'
                  content='Approve'
                  disabled={loading}
                  loading={loading}
                  onClick={_handleApproveBtnClick}/>
              </Grid.Column>
              {/* END Request Notes */}

            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>

      {
        open && <RejectForm onClose={_handleRejectFormClose} onSubmit={_handleRejectSubmit}/>
      }
    </>
  )
}

export default compose(
  connect(
    state  => {
      const clientSubmissionDetail = clientSubmissionDetailDuck.selectors.detail(state)
      const clientDetail = clientDetailDuck.selectors.detail(state)
      const clientPet = clientPetDuck.selectors.list(state)
      const clientDocument = clientDocumentDuck.selectors.list(state)
      const requestNote = onlineRequestNoteDuck.selectors.list(state)

      return {
        clientSubmissionDetail,
        clientDetail,
        clientPet,
        clientDocument,
        requestNote
      }
    },
    {
      get            : clientSubmissionDetailDuck.creators.get,
      getRequestNotes: onlineRequestNoteDuck.creators.get,
      patch          : clientSubmissionDetailDuck.creators.patch,
      resetItem      : clientSubmissionDetailDuck.creators.resetItem,
      resetPet       : petDetailDuck.creators.resetItem
    }
  )
)(ClientSubmissionShow)
