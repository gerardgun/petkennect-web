import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Select, Header, TextArea, Input, Modal } from 'semantic-ui-react'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError } from '@lib/utils/functions'

import petReservationTrainingPackageDetail from '@reducers/pet/reservation/training/package/detail'

const TrainingPackageForm = props => {
  const {
    trainingPackageDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleClose = () =>{
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = values => {
    if(isUpdating)
      return props.put({ id: trainingPackageDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props.post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(trainingPackageDetail.mode), [ trainingPackageDetail.mode ])
  const isUpdating = Boolean(trainingPackageDetail.item.id)

  return (
    <div className='package-create-form'>
      <Modal
        className='form-modal'
        onClose={_handleClose}
        open={isOpened}
        size='medium'>
        <Modal.Content>
          {/* eslint-disable-next-line react/jsx-handler-names */}
          <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
            <Header as='h2' className='segment-content-header'>{isUpdating ? 'Update' : 'Add'} Package</Header>
            <Field component='input' name='id' type='hidden'/>

            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Select}
                label='Package Type'

                name='program'
                options={[
                  { key: 1, value: 1, text: 'Package 1' },
                  { key: 2, value: 2, text: 'Package 2' },
                  { key: 3, value: 3, text: 'Package 3' },
                  { key: 4, value: 4, text: 'Package 4' }
                ]}
                placeholder='Select Package Type'
                selectOnBlur={false}/>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Input}
                  label='Days'
                  name='of_days'
                  selectOnBlur={false}
                  type='number'/>
                <Field
                  component={FormField}
                  control={Input}
                  label='Price'
                  name='price'
                  selectOnBlur={false}
                  type='number'/>
              </Form.Group>
            </Form.Group>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Input}
                label='Package Description'
                name='package_description'
                readOnly
                selectOnBlur={false}/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Field
                autoFocus
                component={FormField}
                control={Input}
                label='Purchase Date'
                name='purchase_date'
                required
                type='date'/>

              <Field
                component={FormField}
                control={Select}
                label='Location'
                name='location'
                options={[
                  { key: 1, value: 1, text: 'Location 1' },
                  { key: 2, value: 2, text: 'Location 2' },
                  { key: 3, value: 3, text: 'Location 3' },
                  { key: 4, value: 4, text: 'Location 4' }
                ]}
                placeholder='Select Location'
                selectOnBlur={false}/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={TextArea}
                label='Comments'
                name='comment'/>
            </Form.Group>

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
                  content={isUpdating ? 'Save changes' : 'Save'}
                  disabled={submitting}
                  loading={submitting}/>
              </Form.Field>
            </Form.Group>

          </Form>
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default compose(
  withRouter,
  connect(
    state => {
      const trainingPackageDetail = petReservationTrainingPackageDetail.selectors.detail(state)

      return {
        trainingPackageDetail,
        initialValues: trainingPackageDetail.item
      }
    },
    {
      post     : petReservationTrainingPackageDetail.creators.post,
      put      : petReservationTrainingPackageDetail.creators.put,
      resetItem: petReservationTrainingPackageDetail.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'training-new-package-form',
    destroyOnUnmount  : false,
    enableReinitialize: true
  })
)(TrainingPackageForm)

