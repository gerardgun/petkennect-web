/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Divider, Form, Grid, Header, Input, Select, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import Layout from '@components/Common/Layout'
import Menu from '@containers/settings/components/Menu'
import { parseResponseError, syncValidate } from '@lib/utils/functions'
import tenantDetailDuck from '@reducers/tenant/detail'

const SetupBoardingPricingIndex = props => {
  const[ pricingModel, setPricingModel ] = useState(false);
  const[ calculatePricing, setCalculatePricing ] = useState(false);
  const[ textDiscount, setTextDiscount] = useState('$0.00')
  const {
    error, handleSubmit, reset, initialize // redux-form
  } = props

  const dispatch = useDispatch()
  const detail = useSelector(tenantDetailDuck.selectors.detail)

  const _handleSubmit = values => {
    return dispatch(tenantDetailDuck.creators.put({
      service_config: {
        ...detail.item.service_config,
        boarding: {
          ...detail.item.service_config.boarding,
          ...values
        }
      }
    }))
      .catch(parseResponseError)
  }

  useEffect(() => {
    if(detail.item.id) initialize(detail.item.service_config.boarding)
  }, [ detail.item.id ])

  const saving = [ 'POSTING', 'PUTTING' ].includes(detail.status)

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>

          <Header as='h4' color='teal'>Boarding Pricing Settings</Header>
          <p>
          Set up your boarding pricing model here. This affects all locations.
          </p>

          <Grid style={{ padding: '1rem' }}>
            <Grid.Row>
              <Grid.Column width='6'>
                <Header as='h4'>
                  <p>Select your pricing model</p>
                </Header>
              </Grid.Column>
              <Grid.Column width='5'>
                <Field
                  component={FormField}
                  control={Select}
                  name='pricing_model_id'
                  options={[
                    { value: 1, text: 'All Inclusive (Boarding + Day Care)' },
                    { value: 2, text: 'Activity Based (Boarding + Required Day Services)' },
                    { value: 3, text: 'Activity Based (Boarding + Optional Day Services)' }
                  ]}
                  placeholder='Select your pricing model'
                  search
                  selectOnBlur={false}
                  onChange={(event)=> event===1 ? setPricingModel(1):setPricingModel(2)}
                  required/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {/*<Divider/>*/}
          {pricingModel === 1 &&
            <>
              <Grid style={{ padding: '1rem' }}>
                  <Grid.Row>
                    <Grid.Column width='6'>
                      <Header as='h4'>
                        <p>For all inclusive</p>
                        <Header.Subheader>
                          Breakout Day Services and Boarding Revenues:
                        </Header.Subheader>
                      </Header>
                    </Grid.Column>
                    <Grid.Column width='5'>
                      <Field
                        component={FormField}
                        control={Select}
                        name='all_inclusive'
                        options={[
                          { value: 1, text: 'No' },
                          { value: 2, text: 'Yes, For Entire Stay' },
                          { value: 3, text: 'Yes, Only and Check-out day' }
                        ]}
                        placeholder='Select charge type'
                        search
                        selectOnBlur={false}
                        required/>
                    </Grid.Column>
                  </Grid.Row>
              </Grid>
              {/*<Divider/>*/}
              <Grid style={{ padding: '1rem' }}>
                <Grid.Row>
                  <Grid.Column width='6'>
                    <Header as='h4'>
                      <p>Enter the dollar amount to allocate to day Services (per day)</p>
                      <Header.Subheader>
                        Tip: Enter $15 If Boarding + Day Care has a total cost of $40 but $15 is the amount to allocate.
                      </Header.Subheader>
                    </Header>
                  </Grid.Column>
                  <Grid.Column width='5'>
                    <Field
                      component={FormField}
                      control={Input}
                      name='day_service_price'
                      placeholder='$0.00'
                      type='number'
                      required/>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </>
          }
          {/*<Divider/>*/}
          {pricingModel === 2 &&
            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='6'>
                  <Header as='h4'>
                    <p>For Activity Based</p>
                    <Header.Subheader>
                      What is the frequency of the activity package/day service?
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column width='5'>
                  <Field
                    component={FormField}
                    control={Select}
                    name='activity_id'
                    options={[
                      { value: 1, text: 'As Requested' },
                      { value: 2, text: 'Every day including Check-out' },
                      { value: 3, text: 'Every day, Except Check-out' },
                      { value: 4, text: 'Every day, Except Check-in/out' }
                    ]}
                    placeholder='Select activity based'
                    search
                    selectOnBlur={false}
                    required/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          }

          <Header as='h4' color='teal'>Pricing</Header>

          <Divider/>

          <Grid style={{ padding: '1rem' }}>
            <Grid.Row>
              <Grid.Column width='6'>
                <Header as='h4'>
                  <p>Do you offer an additional dog discount:</p>
                </Header>
              </Grid.Column>
              <Grid.Column width='5'>
                <Field
                  component={FormField}
                  control={Select}
                  name='pricing_offer_discount'
                  options={[
                    { value: 1, text: 'No' },
                    { value: 2, text: 'Yes, Only if pets share a kennel' },
                    { value: 3, text: 'Yes, all the time' }
                  ]}
                  placeholder='Select option'
                  search
                  selectOnBlur={false}
                  required/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {/*<Divider/>*/}
          <Grid style={{ padding: '1rem' }}>
            <Grid.Row>
              <Grid.Column width='6'>
                <Header as='h4'>
                  <p>Should PetKennect calculate additional dog pricing?</p>
                </Header>
              </Grid.Column>
              <Grid.Column width='5'>
                <Field
                  component={FormField}
                  control={Select}
                  name='compute_dog_pricing'
                  options={[
                    { value: 1, text: 'Yes, (requires more questions!)' },
                    { value: 2, text: 'No, I will create a custom reservation for Shared Dogs' }
                  ]}
                  placeholder='Select option'
                  search
                  selectOnBlur={false}
                  onChange={(event)=> event===1 ? setCalculatePricing(true):setCalculatePricing(false)}
                  required/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {/*<Divider/>*/}
          {calculatePricing &&
          <>
            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='6'>
                  <Header as='h4'>
                    <p>What does the discount apply to</p>
                  </Header>
                </Grid.Column>
                <Grid.Column width='5'>
                  <Field
                    component={FormField}
                    control={Select}
                    name='discount_apply_to'
                    options={[
                      { value: 1, text: 'Nightly Boarding charges Only' },
                      { value: 2, text: 'All boarding Charges and Day Services' }
                    ]}
                    placeholder='Select discount apply to'
                    search
                    selectOnBlur={false}
                    required/>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='6'>
                  <Header as='h4'>
                    <p>How much is the discount per dog</p>
                  </Header>
                </Grid.Column>
                <Grid.Column width='5'>
                  <Field
                    component={FormField}
                    control={Select}
                    name='discount_per_dog'
                    options={[
                      { value: 1, text: '$ Off' },
                      { value: 2, text: '% Off' }
                    ]}
                    placeholder='Select option'
                    search
                    selectOnBlur={false}
                    onChange={(event) => event===2 ? setTextDiscount('%0.00'):setTextDiscount('$0.00')}/>
                </Grid.Column>
                <Grid.Column width='3'>
                  <Field
                    component={FormField}
                    control={Input}
                    name='discount_per_dog_price'
                    placeholder={textDiscount}
                    type='number'
                    required/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </>}

          <Header as='h4' color='teal'>Do other factors affect pricing?</Header>

          <Divider/>

          <Grid style={{ padding: '1rem' }}>
            <Grid.Row>
              <Grid.Column width='6'>
                <Header as='h4'>
                  <p>Season/Peak Pricing</p>
                </Header>
              </Grid.Column>
              <Grid.Column width='5'>
                <Field
                  component={FormField}
                  control={Select}
                  name='season_peak'
                  options={[
                    { value: 1, text: 'No' },
                    { value: 2, text: 'Yes (You must enable peak days on calendar)' }
                  ]}
                  placeholder='Select option'
                  search
                  selectOnBlur={false}
                  required/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {/*<Divider/>*/}
          <Grid style={{ padding: '1rem' }}>
            <Grid.Row>
              <Grid.Column width='6'>
                <Header as='h4'>
                  <p>Peak Price Surcharge</p>
                </Header>
              </Grid.Column>
              <Grid.Column width='5'>
                <Field
                  component={FormField}
                  control={Input}
                  name='peak_price_surcharge'
                  placeholder='$0.00'
                  type='number'
                  required/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {/*<Divider/>*/}
          <Grid style={{ padding: '1rem' }}>
            <Grid.Row>
              <Grid.Column width='6'>
                <Header as='h4'>
                  <p>Dog Size</p>
                </Header>
              </Grid.Column>
              <Grid.Column width='5'>
                <Field
                  component={FormField}
                  control={Select}
                  name='dog_size'
                  options={[
                    { value: 1, text: 'None' },
                    { value: 2, text: 'Let PetKennect do it By Breed (must be set in pet profile)' },
                    { value: 3, text: 'PetKennect should do it By Weight (requires weight in pet profile)' },
                    { value: 4, text: 'Create Reservation Type for each dog size and select manually' }
                  ]}
                  placeholder='Select option'
                  search
                  selectOnBlur={false}
                  required/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          

          <Header as='h4' color='teal'>Check-Out Day Charges</Header>

          <Divider/>

          <Grid style={{ padding: '1rem' }}>
            <Grid.Row>
              <Grid.Column width='6'>
                <Header as='h4'>
                  <p>What time is checkout?</p>
                </Header>
              </Grid.Column>
              <Grid.Column width='5'>
                <Field
                  component={FormField}
                  control={Input}
                  name='time_checkout'
                  placeholder='13:00'
                  type='time'
                  required/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {/*<Divider/>*/}
          <Grid style={{ padding: '1rem' }}>
            <Grid.Row>
              <Grid.Column width='6'>
                <Header as='h4'>
                  <p>Do you charge for any activities prior to check-out time?</p>
                </Header>
              </Grid.Column>
              <Grid.Column width='5'>
                <Field
                  component={FormField}
                  control={Select}
                  name='checkout_prior'
                  options={[
                    { value: 1, text: 'No' },
                    { value: 2, text: 'Yes, Half Charge of Activities' }
                  ]}
                  placeholder='Select option'
                  search
                  selectOnBlur={false}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {/*<Divider/>*/}
          <Grid style={{ padding: '1rem' }}>
            <Grid.Row>
              <Grid.Column width='6'>
                <Header as='h4'>
                  <p>What charges are incurred after check-out time?</p>
                </Header>
              </Grid.Column>
              <Grid.Column width='5'>
                <Field
                  component={FormField}
                  control={Select}
                  name='checkout_after'
                  options={[
                    { value: 1, text: 'No Fees' },
                    { value: 2, text: 'Flat Late Check-out Fee per dog' },
                    { value: 3, text: 'Flat Late Check-out Fee per client' },
                    { value: 4, text: 'Full Day of selected Activties' }
                  ]}
                  placeholder='Select option'
                  search
                  selectOnBlur={false}
                  required/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {/*<Divider/>*/}

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
                disabled={saving}
                loading={saving}
                type='submit'/>
            </Form.Field>
          </Form.Group>

        </Form>
      </Segment>
    </Layout>
  )
}

export default 
reduxForm({
  form              : 'setup-boarding-pricing',
  validate          : values => {
    const schema = {
      pricing_model_id          : Yup.string().required('Pricing Model is required'),
      all_inclusive             : Yup.string().required('Charge Type is required'),
      day_service_price         : Yup.string().required('Day Service Price is required'),
      activity_id               : Yup.string().required('Activity Frequency is required'),
      pricing_offer_discount    : Yup.string().required('Pricing Discount is required'),
      compute_dog_pricing       : Yup.string().required('Option is required'),
      discount_apply_to         : Yup.string().required('Discount is required'),
      discount_per_dog          : Yup.string().required('Discount per dog is required'),
      discount_per_dog_price    : Yup.string().required('Price per dog is required'),
      season_peak               : Yup.string().required('Season/Pek is required'),
      peak_price_surcharge      : Yup.string().required('Peak Price is required'),
      dog_size                  : Yup.string().required('Dog size is required'),
      time_checkout             : Yup.string().required('Time is required'),
      checkout_prior            : Yup.string().required('Prior is required'),
      checkout_after            : Yup.string().required('After Charges is required'),
    }

    return syncValidate(Yup.object().shape(schema), values)
  }
})(SetupBoardingPricingIndex)
/* eslint-enable */
