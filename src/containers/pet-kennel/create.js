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

import petKennelAreaDuck from '@reducers/pet/pet-kennel-area'
import petKennelTypeDuck from '@reducers/pet/pet-kennel-type'
import petKennelDetailDuck from '@reducers/pet/pet-kennel/detail'

const PetKennelForm = (props) => {
  const {
    petKennelDetail,
    petKennelArea,
    petKennelType,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  useEffect(() => {
    props.getPetKennelAreas()
    props.getPetKennelTypes()
  }, [])

  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props
        .put({ id: petKennelDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(petKennelDetail.mode), [
    petKennelDetail.mode
  ])
  const isUpdating = Boolean(petKennelDetail.item.id)

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
            {isUpdating ? 'Update' : 'Add'} Kennel
          </Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Input}
              label='Capacity'
              name='capacity'
              placeholder='Enter capacity'
              required
              type='number'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Select}
              label='Kennel Type'
              name='kennel_type'
              options={petKennelType.items.map(_kennelType =>
                ({ key: _kennelType.id, value: _kennelType.id, text: `${_kennelType.name}` }))
              }
              placeholder='Select Kennel Type'
              required
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Select}
              label='Kennel Area'
              name='kennel_area'
              options={petKennelArea.items.map(_area =>
                ({ key: _area.id, value: _area.id, text: `${_area.name}` }))
              }
              placeholder='Select Kennel Area'
              required
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Select}
              label='Size'
              name='size'
              options={[
                { key: 1, value: 'G', text: 'Giant' },
                { key: 2, value: 'L', text: 'Large' },
                { key: 3, value: 'M', text: 'Medium' },
                { key: 4, value: 'S', text: 'Small' }
              ]}
              placeholder='Select Size'
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
      const petKennelDetail = petKennelDetailDuck.selectors.detail(state)

      return {
        petKennelDetail,
        initialValues: petKennelDetail.item,
        petKennelArea: petKennelAreaDuck.selectors.list(state),
        petKennelType: petKennelTypeDuck.selectors.list(state)
      }
    },
    {
      post             : petKennelDetailDuck.creators.post,
      put              : petKennelDetailDuck.creators.put,
      resetItem        : petKennelDetailDuck.creators.resetItem,
      getPetKennelAreas: petKennelAreaDuck.creators.get,
      getPetKennelTypes: petKennelTypeDuck.creators.get
    }
  ),
  reduxForm({
    form              : 'kennel-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        capacity   : Yup.mixed().required('Capacity is required'),
        kennel_area: Yup.mixed().required('Area is required'),
        kennel_type: Yup.mixed().required('Type is required'),
        size       : Yup.mixed().required('Size is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(PetKennelForm)
