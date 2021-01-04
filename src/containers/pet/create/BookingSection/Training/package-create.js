import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Grid, TextArea, Segment, Select, Header, Input, Modal } from 'semantic-ui-react'

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
        size='small'>
        <Modal.Content>
          {/* eslint-disable-next-line react/jsx-handler-names */}
          <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
            <Header as='h2' className='segment-content-header'>{isUpdating ? 'Update' : 'Add'} Package</Header>
            <Field component='input' name='id' type='hidden'/>
            <Grid className='mv32'>

              <Grid.Column computer={8} mobile={16}>

                <Segment style={{ height: '180px' }}>
                  <Field
                    component={FormField}
                    control={Select}
                    label='Reason for training'

                    name='reason'
                    options={[
                      { key: 1, value: 1, text: 'Reason 1' },
                      { key: 2, value: 2, text: 'Reason 2' },
                      { key: 3, value: 3, text: 'Reason 3' },
                      { key: 4, value: 4, text: 'Reason 4' }
                    ]}
                    placeholder='Select Reason'
                    selectOnBlur={false}/>
                  <Field
                    component={FormField}
                    control={Select}
                    label='Select Trainer'

                    name='trainer'
                    options={[
                      { key: 1, value: 1, text: 'Trainer 1' },
                      { key: 2, value: 2, text: 'Trainer 2' },
                      { key: 3, value: 3, text: 'Trainer 3' },
                      { key: 4, value: 4, text: 'Trainer 4' }
                    ]}
                    placeholder='Select Trainer'
                    selectOnBlur={false}/>

                </Segment>

              </Grid.Column>

              <Grid.Column computer={8} mobile={16}>
                <Segment style={{ height: '180px' }}>

                  <Field
                    component={FormField}
                    control={Input}
                    label='Eval Date'
                    name='eval_date'

                    type='date'/>
                  <Field

                    component={FormField}
                    control={Select}
                    label='Status'

                    name='status'
                    options={[
                      { key: 1, value: 1, text: 'Active ' },
                      { key: 2, value: 2, text: 'Inactive' }

                    ]}
                    placeholder='status    '
                    selectOnBlur={false}/>

                </Segment>
              </Grid.Column>

              <Grid.Column computer={16}>

                <Segment>
                  <Form.Group widths='2'>
                    <Field
                      component={FormField}
                      control={Select}
                      label='Select Package'

                      name='package'
                      options={[
                        { key: 1, value: 1, text: 'Package 1' },
                        { key: 2, value: 2, text: 'Package 2' },
                        { key: 3, value: 3, text: 'Package 3' },
                        { key: 4, value: 4, text: 'Package 4' }
                      ]}
                      placeholder='Select Package'
                      selectOnBlur={false}/>
                    <Field
                      component={FormField}
                      control={Input}
                      label='Price'
                      name='price'
                      readOnly
                      selectOnBlur={false}/>

                    <Field
                      component={FormField}
                      control={Input}
                      label='Discount'
                      name='discount'
                      readOnly
                      selectOnBlur={false}/>
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Field
                      component={FormField}
                      control={Input}
                      label='Description'
                      name='description'
                      selectOnBlur={false}/>

                  </Form.Group>

                </Segment>

              </Grid.Column>

              <Grid.Column computer={16}>
                <Segment>
                  <Form.Group widths='equal'>
                    <Field
                      component={FormField}
                      control={Input}
                      label='Training Starting Date'
                      name='start_date'
                      type='date'/>
                    <Field
                      component={FormField}
                      control={Select}
                      label='Method'
                      name='method'
                      options={[
                        { key: 1, value: 1, text: 'method 1' },
                        { key: 2, value: 2, text: 'method 2' }
                      ]}
                      placeholder='Select Method'
                      selectOnBlur={false}/>

                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Field
                      component={FormField}
                      control={TextArea}
                      label='Contract Comments'
                      name='contract_comment'/>
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Field
                      component={FormField}
                      control={TextArea}
                      label='Additional Issue'
                      name='additional_issue'/>

                  </Form.Group>
                </Segment>
              </Grid.Column>
            </Grid>

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
