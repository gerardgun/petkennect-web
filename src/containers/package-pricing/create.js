import React from 'react'

import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'

import { Button, Checkbox, Form, Header, Input, Modal, Select } from 'semantic-ui-react'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import packagePricingDetailDuck from '@reducers/package-pricing/detail'
import { printAlphabets, parseResponseError, parseFormValues } from '@lib/utils/functions'
import './style.scss'

const packagePricingform =  props => {
  const {
    packagePricingDetail,
    error, handleSubmit, reset // redux-form
  } = props

  const _handleClose = () => {
    props.resetItem()
  }

  const updating = Boolean(packagePricingDetail.item.id)
  const _handleSubmit = values => {
    values = parseFormValues(values)

    if(updating)
      return props.put(values)
        .then(() => props.resetItem())
        .catch(parseResponseError)
    else
      return props.post({ ...values })
        .then(() => props.resetItem())
        .catch(parseResponseError)
  }

  const alphabetsList = printAlphabets()

  const isUpdating = Boolean(packagePricingDetail.item.id)
  const saving = [ 'POSTING', 'PUTTING' ].includes(packagePricingDetail.status)
  const opened = [ 'CREATE', 'UPDATE' ].includes(packagePricingDetail.mode)

  return (

    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={opened}
      size='large'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form id='package-pricing-form' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2'>{isUpdating ? 'Update' : 'New'} Item Pricing </Header>

          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Program'

              name='program'
              options={[
                { key: 1, value: 1, text: 'Program 1' },
                { key: 2, value: 2, text: 'Program 2' },
                { key: 3, value: 3, text: 'Program 3' },
                { key: 4, value: 4, text: 'Program 4' }
              ]}
              placeholder='Select Program'
              selectOnBlur={false}/>
            <Field
              component={FormField}
              control={Select}
              label='Sub Category'

              name='sub_category'
              options={[
                { key: 1, value: 1, text: 'sub_category 1' },
                { key: 2, value: 2, text: 'sub_category 2' },
                { key: 3, value: 3, text: 'sub_category 3' },
                { key: 4, value: 4, text: 'sub_category  4' }
              ]}
              placeholder='Select Sub Category'
              selectOnBlur={false}/>
            <Field
              component={FormField}
              control={Input}
              label='Package'
              name='package'
              selectOnBlur={false}/>
            <Field
              component={FormField}
              control={Select}
              label='Package'

              name='package'
              options={[
                { key: 1, value: 1, text: 'package 1' },
                { key: 2, value: 2, text: 'package 2' },
                { key: 3, value: 3, text: 'package 3' },
                { key: 4, value: 4, text: 'package  4' }
              ]}
              placeholder='Select Package'
              selectOnBlur={false}/>

          </Form.Group>

          <Form.Group widths='equal'>

            <Field
              component={FormField}
              control={Select}
              label='Type'

              name='type'
              options={[
                { key: 1, value: 1, text: 'Retail' },
                { key: 2, value: 2, text: 'Service' }

              ]}
              placeholder='Select Type'
              selectOnBlur={false}/>
            <Field
              component={FormField}
              control={Select}
              label='Status'

              name='status'
              options={[
                { key: 1, value: 1, text: 'Active' },
                { key: 2, value: 2, text: 'Inactive' }

              ]}
              placeholder='Select status'
              selectOnBlur={false}/>
            <Field
              className='day-field'
              component={FormField}
              control={Input}
              label='# of days'
              name='of_days'
              selectOnBlur={false}/>
            <Field
              className='price-field'
              component={FormField}
              control={Input}
              label='Facility Price'
              name='price'
              selectOnBlur={false}/>

          </Form.Group>

          <Form.Group widths>
            <Field
              className='desc-field'
              component={FormField}
              control={Input}
              label='Description'

              name='description'
              selectOnBlur={false}/>
            <Field
              className='sort-field'
              component={FormField}
              control={Select}
              label='Sort'

              name='sort'
              options={alphabetsList}
              placeholder='Sort'
              selectOnBlur={false}/>

            <Field
              className='send-contract'
              component={FormField}
              control={Checkbox}
              label='Send Contract'
              name='contract'
              selectOnBlur={false}/>

          </Form.Group>

          <Form.Group className='form-modal-actions' widths='equal'>
            <Form.Field>
              <Button
                basic
                className='w120'
                color='teal'
                content='Cancel'
                disabled={saving}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content={isUpdating ? 'Save changes' : 'Save Pricing '}
                disabled={saving}
                form='package-pricing-form'
                loading={saving}
                type='submit'/>
            </Form.Field>
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
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  connect(
    state => {
      const packagePricingDetail = packagePricingDetailDuck.selectors.detail(state)

      return {
        packagePricingDetail,
        intialValues: {
          price: 0.00

        }

      }
    },
    {
      resetItem: packagePricingDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form: 'package-pricing-form'

  })
)(packagePricingform)

