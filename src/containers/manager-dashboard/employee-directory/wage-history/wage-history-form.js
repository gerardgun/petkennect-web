import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Button, Form, Header, Select, Modal, Grid, Input } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate } from '@lib/utils/functions'

import wageHistoryDetailDuck from '@reducers/manager-dashboard/employee/employee-wage-history/detail'

const WageHistoryForm = (props) => {
  const {
    wageHistoryDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  useEffect(()=> {

  }, [ ])

  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = () => {
  }

  const isOpened = useMemo(() => getIsOpened(wageHistoryDetail.mode), [
    wageHistoryDetail.mode
  ])

  const isUpdating = wageHistoryDetail.mode === 'UPDATE' ? true : false

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
            {isUpdating ? 'Update' : 'Add'} Wage
          </Header>
          <Grid>
            <Grid.Column width={16}>
              <Field
                component={FormField}
                control={Select}
                fluid
                label='Role'
                multiple={true}
                name='role'
                options={[
                  { key: 1, value: 'manager', text: 'Manager' },
                  { key: 2, value: 'trainer', text: 'Trainer' },
                  { key: 3, value: 'groomer', text: 'Groomer' },
                  { key: 4, value: 'supervisor', text: 'Supervisor' },
                  { key: 5, value: 'kennel_attendant', text: 'Kennel Attendant' }
                ]}
                placeholder='Select role'
                required
                selectOnBlur={false}/>
              <Field
                component={FormField}
                control={Select}
                label='Salaried'
                name='salaried'
                options={[
                  { key: 1, value: 'yes', text: 'Yes' },
                  { key: 2, value: 'no', text: 'No' }
                ]}
                placeholder='Select'
                required/>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Input}
                  label='Hourly Rate'
                  name='hourly_rate'
                  placeholder='Enter hourly rate'
                  required
                  type='number'/>
                  <Form.Input
                  label='Salaried Rate'
                  name='salaried_rate'
                  readOnly
                  value={(props.rate > 0 ?  ('$ ' + props.rate * 2080) : ('$ 0'))}/>
              </Form.Group>
              <Field
                component={FormField}
                control={Select}
                fluid
                label='Adjustment Type'
                name='adjustment_type'
                options={[
                  { key: 1, value: 'merit_increase', text: 'Merit Increase' },
                  { key: 2, value: 'promotion', text: 'Promotion' },
                  { key: 3, value: 'adjustment', text: 'Adjustment' },
                  { key: 4, value: 'other', text: 'other' }
                ]}
                placeholder='Select adjustment type'
                required
                selectOnBlur={false}/>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Input}
                  label='Start Date'
                  name='start_date'
                  required
                  type='date'/>
                <Field
                  component={FormField}
                  control={Input}
                  label='End Date'
                  name='end_date'
                  type='date'/>
              </Form.Group>

            </Grid.Column>
          </Grid>

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
                content={isUpdating ? 'Save Changes' : 'Add Wage'}
                disabled={submitting}
                loading={submitting}/>
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default  compose(
  connect(
    (state) => {
      const wageHistoryDetail = wageHistoryDetailDuck.selectors.detail(state)
      const rate = formValueSelector('department-role-form')(state, 'hourly_rate')

      return {
        wageHistoryDetail,
        rate
      }
    },
    {
      post     : wageHistoryDetailDuck.creators.post,
      put      : wageHistoryDetailDuck.creators.put,
      resetItem: wageHistoryDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'department-role-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        role: Yup.string().required('Role is required'),
        salaried: Yup.string().required('Salaried is required'),
        hourly_rate: Yup.string().required('Hourly Rate is required'),
        adjustment_type: Yup.string().required('Adjustment Type is required'),
        start_date: Yup
          .date()
          .required('Start Date is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(WageHistoryForm)

