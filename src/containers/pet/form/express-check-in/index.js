import React, { useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { Button, Form, Header, Dropdown, Input, Select, Modal } from 'semantic-ui-react'
import _truncate from 'lodash/truncate'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'

import ConfirmationForm from './confirmation'

import clientPetDuck from '@reducers/client/pet'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'

export const formId = 'express-check-in-form'

const ExpressCheckInForm = props => {
  const {
    clientPet,
    location,
    hasExpressCheckIn,
    petDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'CREATE')

  useEffect(() => {
    props.getClientPets()
  }, [])

  const _handleClose = () =>{
    props.reset()
    props.resetItem()
  }

  const locationItems = useMemo(() => {
    return location.items.map(item => ({
      key  : item.id,
      value: item.id,
      text : _truncate(item.code, { length: 16 })
    }))
  }, [ location.status ])

  // eslint-disable-next-line no-unused-vars
  const _handleSubmit = values => {
    props.setItem({ ...petDetail.item, express_check_in_type: values.express_check_in }, 'UPDATE')
  }

  const isOpened = useMemo(() => getIsOpened(petDetail.mode), [ petDetail.mode ])

  return (
    <>
      <Modal
        className='form-modal'
        onClose={_handleClose}
        open={isOpened}
        size='small'>
        <Modal.Content>
          {/* eslint-disable-next-line react/jsx-handler-names */}
          <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
            <Header as='h2' className='segment-content-header'>Express Check In</Header>
            <Field component='input' name='id' type='hidden'/>

            {
              !petDetail.item.client && (
                <>
                  <Form.Group widths='equal'>
                    <Field
                      closeOnChange
                      component={FormField}
                      control={Dropdown}
                      fluid
                      label='Pet'
                      multiple
                      name='pet'
                      options={[ ...clientPet.items ].map((_clientPet) => ({
                        key  : _clientPet.id,
                        value: _clientPet.id,
                        text : `${_clientPet.name}`
                      }))}
                      placeholder='Search pet'
                      required
                      selection
                      selectOnBlur={false}/>
                  </Form.Group>
                </>
              )
            }

            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Select}
                label='Location'
                name='location'
                options={locationItems}
                placeholder='Select option'
                required
                selectOnBlur={false}/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Select}
                label='Express Check In'
                name='express_check_in'
                options={[
                  { key: 1, value: 'camp_fitness', text: 'Camp/ Fitness' },
                  { key: 2, value: 'training', text: 'Training' },
                  { key: 3, value: 'boarding_chk_in', text: 'Boarding Chk-In' },
                  { key: 4, value: 'boarding_chk_out', text: 'Boarding Chk-Out' },
                  { key: 5, value: 'daycamp_reservation', text: 'DayCamp Reservations' }
                ]}
                placeholder='Select option'
                required
                selectOnBlur={false}/>
            </Form.Group>

            {
              hasExpressCheckIn === 'camp_fitness' && (
                <>
                  <Form.Group widths='equal'>
                    <Field
                      component={FormField}
                      control={Select}
                      label='Yard'
                      name='yard'
                      options={[
                        { key: 1, value: 'yard1', text: 'Yard 1' },
                        { key: 2, value: 'yard2', text: 'Yard 2' }
                      ]}
                      placeholder='Select option'
                      selectOnBlur={false}/>
                    <Field
                      component={FormField}
                      control={Select}
                      label='Lunch'
                      name='lunch'
                      options={[
                        { key: 1, value: 'lunch1', text: 'Lunch 1' },
                        { key: 2, value: 'lunch2', text: 'Lunch 2' }
                      ]}
                      placeholder='Select option'
                      selectOnBlur={false}/>
                  </Form.Group>
                </>
              )
            }
            {
              hasExpressCheckIn === 'training' && (
                <>
                  <Form.Group widths='equal'>
                    <Field
                      component={FormField}
                      control={Select}
                      label='Training'
                      name='training'
                      options={[
                        { key: 1, value: 'day_train', text: 'Day Train' },
                        { key: 2, value: 'groupclass', text: 'Group Class' }
                      ]}
                      placeholder='Select option'
                      selectOnBlur={false}/>
                  </Form.Group>
                </>
              )
            }
            {
              hasExpressCheckIn === 'daycamp_reservation' && (
                <>
                  <Form.Group widths='equal'>
                    <Field
                      component={FormField}
                      control={Input}
                      label='Reservation Date'
                      name='reservation_date'
                      required
                      type='date'/>
                  </Form.Group>
                </>
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
                  content='Cancel'
                  disabled={submitting}
                  onClick={_handleClose}
                  type='button'/>
                <Button
                  color='teal'
                  content='Reserve!'
                  disabled={submitting}
                  loading={submitting}/>
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
      </Modal>
      <ConfirmationForm/>
    </>
  )
}

export default compose(
  withRouter,
  connect(
    ({ location, auth, ...state }) => {
      const petDetail = petReservationDetailDuck.selectors.detail(state)
      const hasExpressCheckIn = formValueSelector(formId)(state, 'express_check_in')

      return {
        location,
        petDetail,
        hasExpressCheckIn,
        clientPet    : clientPetDuck.selectors.list(state),
        initialValues: { ...petDetail.item, location: auth.location, express_check_in: 'daycamp_reservation' }
      }
    },
    {
      post         : petReservationDetailDuck.creators.post,
      put          : petReservationDetailDuck.creators.put,
      setItem      : petReservationDetailDuck.creators.setItem,
      getClientPets: clientPetDuck.creators.get,
      resetItem    : petReservationDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : formId,
    destroyOnUnmount  : false,
    enableReinitialize: true
  })
)(ExpressCheckInForm)
