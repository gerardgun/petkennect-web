import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal, Grid, Icon } from 'semantic-ui-react'

import FormError from '@components/Common/FormError'
import useModal from '@components/Modal/useModal'
import { parseResponseError } from '@lib/utils/functions'
import RejectForm from './../clientSubmission/show/reject-form'

import vaccinationUpdateDetailDuck from '@reducers/online-request/vaccination-update/detail'
import petDetailDuck from '@reducers/pet/detail'
import petVaccinationDuck from '@reducers/pet/vaccination'

const ReviewForm = props => {
  const {
    petDetail,
    petVaccination,
    vaccinationUpdateDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const [ open, { _handleOpen: _handleRejectFormOpen, _handleClose: _handleRejectFormClose } ] = useModal()

  useEffect(() => {
    if(vaccinationUpdateDetail.status === 'SET_ITEM')
      props.getPet(vaccinationUpdateDetail.item.pet)
  }, [ vaccinationUpdateDetail.status ])

  useEffect(() => {
    if(vaccinationUpdateDetail.status === 'PATCHED') {
      _handleClose()
      _handleRejectFormClose()
    }
  }, [ vaccinationUpdateDetail.status ])

  useEffect(() => {
    if(petDetail.status === 'GOT')
      props.getPetVaccinations()
  }, [ petDetail.status ])

  const _handleClose = props.resetItem

  const _handleApproveBtnClick = () => {
    return props.patch({
      id     : vaccinationUpdateDetail.item.id,
      status : 'A', // A => Approved
      comment: 'Approved'
    })
      .then(_handleClose)
      .catch(parseResponseError)
  }

  const _handleRejectSubmit = ({ comment }) => {
    props.patch({
      id    : vaccinationUpdateDetail.item.id,
      status: 'R', // R => Rejected
      comment
    })
  }

  const vaccinations = petVaccination.items
    .filter(item => item.dose.request === vaccinationUpdateDetail.item.id)

  return (
    <>
      <Modal
        className='form-modal'
        onClose={_handleClose}
        open={vaccinationUpdateDetail.mode === 'READ'}
        size='small'>
        <Modal.Content>
          {/* eslint-disable-next-line react/jsx-handler-names */}
          <Form onReset={reset} onSubmit={handleSubmit(_handleApproveBtnClick)}>
            <Header as='h2' className='segment-content-header'>Review Upload Vaccinations</Header>

            {
              vaccinations.map((item, index) => {
                return (
                  <Form.Group key={index} widths='equal'>
                    <Form.Field
                      autoFocus
                      control={Input}
                      label='Vaccine'
                      readOnly
                      value={item.name}/>
                    <Form.Field
                      autoFocus
                      control={Input}
                      label='Expiry date'
                      readOnly
                      type='date'
                      value={item.dose.expired_at && item.dose.expired_at.split('T')[0]}/>
                  </Form.Group>
                )
              })
            }

            {
              vaccinations.length > 0 && (
                <Grid className='mt16'>
                  <Grid.Column computer={16} mobile={16} tablet={16}>
                    <Button
                      as='a' href={vaccinations[0].dose.document_path} target='_blank'
                      type='button'>
                      <Icon name='file pdf outline'/>
                    View Document
                    </Button>
                  </Grid.Column>
                </Grid>
              )
            }

            {
              error && (
                <Form.Group widths='equal'>
                  <Form.Field>
                    <FormError message={error}/>
                  </Form.Field>
                </Form.Group>
              )
            }

            <Form.Group className='form-modal-actions' widths='equal'>
              <Form.Field>
                <Button
                  basic
                  color='teal'
                  content='Decline'
                  disabled={submitting}
                  onClick={_handleRejectFormOpen}
                  type='button'/>
                <Button
                  color='teal'
                  content='Approve'
                  disabled={submitting}
                  loading={submitting}/>
              </Form.Field>
            </Form.Group>
          </Form>
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
    state => {
      return {
        vaccinationUpdateDetail: vaccinationUpdateDetailDuck.selectors.detail(state),
        petDetail              : petDetailDuck.selectors.detail(state),
        petVaccination         : petVaccinationDuck.selectors.list(state)
      }
    },
    {
      getPet            : petDetailDuck.creators.get,
      getPetVaccinations: petVaccinationDuck.creators.get,
      patch             : vaccinationUpdateDetailDuck.creators.patch,
      resetItem         : vaccinationUpdateDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'vaccination-update-form',
    enableReinitialize: true
  })
)(ReviewForm)
