/* eslint-disable react/jsx-handler-names */
import React,  { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Form, Modal, Input, Checkbox, Button, Header } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import {  parseFormValues } from '@lib/utils/functions'
import availabilityDuck from '@reducers/staff-management/information/availability'
import availabilityDetailDuck from '@reducers/staff-management/information/availability/detail'

import '../styles.scss'

const formId = 'availability-edit-form'

const AvailabilityForm = (props)=>{
  const  {
    availability,
    availabilityDetail,
    error, handleSubmit,
    reset // redux-form
  } = props

  useEffect(() => {
    props.getAvailabilities()
  }, [])

  const _handleSubmit = values => {
    values = parseFormValues(values)
    console.log(values)
  }

  const getIsOpened = (mode) => mode === 'CREATE' ||  mode === 'UPDATE'

  const _handleClose = () => {
    props.resetItem()
  }

  const isOpened = useMemo(() => getIsOpened(availabilityDetail.mode), [
    availabilityDetail.mode
  ])

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}>
      <div className='flex align-center' style={{ borderBottom: 'solid 1px rgba(34, 36, 38, 0.15)', height: '50px' }}>
        <Header as='h3' className='mb0' style={{ marginLeft: '40px' }}>
            Edit Availability
        </Header>
      </div>
      <Modal.Content>
        <div style={{ marginTop: '-10px' }}>
          <Form id={formId} onReset={reset} onSubmit={handleSubmit(_handleSubmit)} >
            <div>
              <div className='flex justify-between align-center mb16'>
                <div style={{ width: '15%' }}><label className='av-change-h'>Day</label></div>
                <div style={{ width: '17%' }}><label className='av-change-h'>From</label></div>
                <div style={{ width: '17%' }}><label className='av-change-h'>To</label></div>
                <div className='flex justify-center' style={{ width: '10%' }}><label className='av-change-h'>Anytime</label></div>
                <div className='flex justify-center' style={{ width: '10%' }}><label className='av-change-h'>Unavailable</label></div>
              </div>
              {
                availability && availability.items.map((item, index)=>{
                  return (
                    <div className='flex justify-between align-center mb16' key={index}>
                      <div  style={{ width: '15%' }}>
                        <label>{item.day}</label>
                      </div>
                      <div style={{ width: '17%' }}>
                        <Field
                          component={FormField}
                          control={Input}
                          name={`start_time${item.day}`}
                          type='time'/>
                      </div>
                      <div  style={{ width: '17%' }}>
                        <Field
                          component={FormField}
                          control={Input}
                          name={`end_time${item.day}`}
                          type='time'/>
                      </div>
                      <div className='flex justify-center' style={{ width: '10%' }}>
                        <Field
                          component={FormField}
                          control={Checkbox}
                          format={Boolean}
                          name={`anytime${item.day}`}
                          type='checkbox'/>
                      </div>
                      <div className='flex justify-center' style={{ width: '10%' }}>
                        <Field
                          component={FormField}
                          control={Checkbox}
                          format={Boolean}
                          name={`unavailable${item.day}`}
                          type='checkbox'/>
                      </div>
                    </div>

                  )
                })
              }
            </div>
            {
              error && (
                <Form.Group widths='equal'>
                  <Form.Field>
                    <FormError message={error}/>
                  </Form.Field>
                </Form.Group>
              )
            }<Button
              className='w120 mv20' color='teal' content='Save'
              floated='right'
              onClick={_handleSubmit}/>
            <Button
              className='w120 mv20' content='Cancel' floated='right'
              onClick={_handleClose}
              type='button'/>

          </Form>

        </div>
      </Modal.Content>
    </Modal>
  )
}
export default compose(
  connect(
    state => {
      const availabilityDetail = availabilityDetailDuck.selectors.detail(state)
      const availability = availabilityDuck.selectors.list(state)

      let initialData = {}

      availability && availability.items.forEach((item) => {
        initialData[`anytime${item.day}`] = item.anytime
        initialData[`start_time${item.day}`] = item.from
        initialData[`end_time${item.day}`] = item.to
        initialData[`unavailable${item.day}`] = item.unavailable
      })

      return {
        availabilityDetail,
        availability,
        initialValues: { ...initialData }
      }
    },
    {
      getAvailabilities: availabilityDuck.creators.get,
      resetItem        : availabilityDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : formId,
    destroyOnUnmount  : false,
    enableReinitialize: true

  })
)(AvailabilityForm)
