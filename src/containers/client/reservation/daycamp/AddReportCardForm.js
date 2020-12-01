import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { Button, Form, Header, Modal } from 'semantic-ui-react'

import PetReportCard from '@components/Common/Pet/ReportCard'
import FormError from '@components/Common/FormError'
import { parseResponseError } from '@lib/utils/functions'

import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import clientPetDuck from '@reducers/client/pet'

import { daycampFormId } from './first'

const AddReportCardForm = (props) => {
  const {
    petReservationDetail,
    clientPet,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  const getIsOpened = (mode) => mode === 'READ'

  useEffect(() => {
    props.getClientPets()
  }, [])

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props
        .put({ id: petReservationDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(petReservationDetail.mode), [
    petReservationDetail.mode
  ])
  const isUpdating = Boolean(petReservationDetail.item.id)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='large'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form id='add-report-card-form' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>
            {isUpdating ? 'Update' : 'Add'} Report Card
          </Header>
          {props.selectedPets && props.selectedPets.map((petId)=> (
            <PetReportCard
              item={clientPet.items.filter(_pet => _pet.id === petId)[0]}
              key={petId}/>
          ))}
          {error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )}

          <Form.Group className='form-modal-actions' widths='equal'>
            <Form.Field>
              <Button
                basic
                color='teal'
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content='Done'
                disabled={submitting}
                loading={submitting}/>
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  withRouter,
  connect(
    (state) => {
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)
      let selectedPets = formValueSelector(daycampFormId)(state, 'pet')

      return {
        petReservationDetail,
        initialValues: petReservationDetail.item,
        clientPet    : clientPetDuck.selectors.list(state),
        selectedPets : selectedPets
      }
    },
    {
      getClientPets: clientPetDuck.creators.get,
      resetItem    : petReservationDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'add-report-card-form',
    destroyOnUnmount  : false,
    enableReinitialize: true
  })
)(AddReportCardForm)
