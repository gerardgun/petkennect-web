import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal, Select } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import locationDuck from '@reducers/location'
import petKennelAreaDetailDuck from '@reducers/pet/pet-kennel-area/detail'

const PetKennelAreaForm = (props) => {
  const {
    petKennelAreaDetail,
    location,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  useEffect(() => {
    props.getLocations()
  }, [])

  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props
        .put({ id: petKennelAreaDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(petKennelAreaDetail.mode), [
    petKennelAreaDetail.mode
  ])
  const isUpdating = Boolean(petKennelAreaDetail.item.id)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>
            {isUpdating ? 'Update' : 'Add'} Kennel Area
          </Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Input}
              label='Name'
              name='name'
              placeholder='Enter name'
              required/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Select}
              label='Location'
              name='location'
              options={location.items.map(_location =>
                ({ key: _location.id, value: _location.id, text: `${_location.name}` }))
              }
              placeholder='Select Location'
              required
              selectOnBlur={false}/>
          </Form.Group>

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
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content={isUpdating ? 'Save changes' : 'Save'}
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
      const petKennelAreaDetail = petKennelAreaDetailDuck.selectors.detail(state)

      return {
        petKennelAreaDetail,
        initialValues: petKennelAreaDetail.item,
        location     : locationDuck.selectors.list(state)
      }
    },
    {
      post        : petKennelAreaDetailDuck.creators.post,
      put         : petKennelAreaDetailDuck.creators.put,
      resetItem   : petKennelAreaDetailDuck.creators.resetItem,
      getLocations: locationDuck.creators.get
    }
  ),
  reduxForm({
    form              : 'kennel-area-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        name    : Yup.string().required(),
        location: Yup.mixed().required('Location is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(PetKennelAreaForm)
