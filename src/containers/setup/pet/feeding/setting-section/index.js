import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { Button, Form, Grid, Header, Input, Select, Segment } from 'semantic-ui-react'
import * as yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/pet/components/Menu'
import Tab from '@containers/setup/pet/feeding/components/Tab'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import tenantDetailDuck from '@reducers/tenant/detail'

const selector = formValueSelector('setup-pet-feeding-setting')

const SetupPetFeedingSettingIndex = props => {
  const {
    error, handleSubmit, initialize, reset, submitting // redux-form
  } = props

  const dispatch = useDispatch()
  const detail = useSelector(tenantDetailDuck.selectors.detail)
  const charge_type = useSelector(state => selector(state, 'charge_type'))

  const _handleSubmit = values => {
    return dispatch(tenantDetailDuck.creators.put({
      service_config: {
        ...detail.item.service_config,
        food: {
          ...detail.item.service_config.food,
          ...values,
          charge_type: values.charge_type === 'null' ? null : values.charge_type
        }
      }
    }))
      .catch(parseResponseError)
  }

  useEffect(() => {
    if(detail.item.id) {
      const config = detail.item.service_config.food

      initialize({
        ...config,
        charge_type: config.charge_type + ''
      })
    }
  }, [ detail.item.id ])

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          {/* eslint-disable-next-line react/jsx-handler-names */}
          <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='5'>
                  <Header as='h4'>
                    <p className='mb0'>Do you charge for bagging owner supplied food?</p>
                    <Header.Subheader className='ml8 mt4'>
                      Select the appropriate setting for food bagging charges.
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column width='1'/>
                <Grid.Column width='7'>
                  <Field
                    autoFocus
                    component={FormField}
                    control={Select}
                    name='charge_type'
                    options={[
                      { key: 1, value: 'null', text: 'No Charges Apply' },
                      { key: 2, value: 'per_day', text: 'Yes, Per Day, Per Dog' },
                      { key: 3, value: 'per_meal', text: 'Yes, Per Meal, Per Dog' },
                      { key: 4, value: 'per_bag', text: 'Yes, Per Bag (requires count)' }
                    ]}
                    placeholder='Select Charges'
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            {
              charge_type !== 'null' && (
                <React.Fragment>
                  <Grid style={{ padding: '1rem' }}>
                    <Grid.Row>
                      <Grid.Column width='5'>
                        <Header as='h4'>
                          <p className='mb0'>
                            {
                              charge_type === 'per_day' ? (
                                'Enter the Charge Per Day, Per Dog'
                              ) : charge_type === 'per_meal' ? (
                                'Enter the Charge Per Meal, Per Dog'
                              ) : (
                                'Enter the Charge Per Bag'
                              )
                            }
                          </p>
                          <Header.Subheader className='ml8 mt4'>
                            Enter the value to charge.
                          </Header.Subheader>
                        </Header>
                      </Grid.Column>
                      <Grid.Column width='1'/>
                      <Grid.Column width='4'>
                        <Field
                          className='w50'
                          component={FormField}
                          control={Input}
                          name='charge_type_price'
                          parse={parseFloat}
                          placeholder='$0.00'
                          required
                          type='number'/>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </React.Fragment>
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
                  color='teal'
                  content='Save changes'
                  disabled={submitting}
                  loading={submitting}
                  type='submit'/>
              </Form.Field>
            </Form.Group>

          </Form>
        </Tab>
      </Segment>
    </Layout>
  )
}

export default reduxForm({
  form    : 'setup-pet-feeding-setting',
  validate: values => {
    let schema = {}

    if(values.charge_type !== 'null')
      schema = {
        ...schema,
        charge_type_price: yup.number().typeError('Price must be a number').required('Price is required')
      }

    return syncValidate(yup.object().shape(schema), values)
  }
})(SetupPetFeedingSettingIndex)
