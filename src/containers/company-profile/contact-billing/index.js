import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Image, Icon, Button, Checkbox, Divider, Form, Grid, Header, Input, Segment } from 'semantic-ui-react'
import * as Yup from 'yup'

import Layout from '@components/Common/Layout'
import Menu from '@containers/company-profile/components/Menu'
import CreateCardModal from '@containers/company-profile/components/CreateCardModal'
import tenantDetailDuck from '@reducers/tenant/detail'
import { syncValidate } from '@lib/utils/functions'

function SetupCompanyProfileContactBilling(props) {
  const dispatch = useDispatch()
  const tenant = useSelector(tenantDetailDuck.selectors.detail)
  const {
    handleSubmit // redux-form
  } = props

  const _handleSubmit = () => {
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form className='form-container' id='billing-form' onSubmit={handleSubmit(_handleSubmit)}>
          <Grid style={{ padding: '1rem' }}>
            <Grid.Row>
              <Grid.Column className='input-form' width='5'>
                <Header as='h4'>
                  <p>Subscription Type</p>
                </Header>
                <Header.Subheader>
                  Your subscription sill determinate the monthly/annual cost and
                  what features are available.
                </Header.Subheader>
              </Grid.Column>
              <Grid.Column width='11'>
                <Segment style={{ padding: '0px' }}>
                  <Grid celled='internally'>
                    <Grid.Row>
                      <Grid.Column verticalAlign='middle' width='4'>
                        <Header as='h4'>Team Plan</Header>
                      </Grid.Column>
                      <Grid.Column className='column-subscription' width='12'>
                        <p>08 May 2018 - 31 Dec 2020 x 35 agent(s)</p>
                        <Button content='Active subscription' primary/>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Grid.Column>
            </Grid.Row>

            <Divider/>

            <Grid.Row>
              <Grid.Column width='5'>
                <Header as='h4'>
                  <p>Billing Info</p>
                </Header>
                <Header.Subheader>
                  This information is used when processing payments.
                </Header.Subheader>
              </Grid.Column>
              <Grid.Column width='11'>
                <Segment style={{ padding: '2rem' }}>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width='7'>
                        <Header as='h5' className='billing-header' color='blue'>
                          Company Name
                        </Header>
                        <Input fluid placeholder='Acquire'/>
                      </Grid.Column>
                      <Grid.Column width='9'>
                        <Header as='h5' className='billing-header' color='blue'>
                          Street Address
                        </Header>
                        <Input fluid placeholder='133 Kearmy Street'/>
                      </Grid.Column>
                    </Grid.Row>
                    
                    <Grid.Row>
                      <Grid.Column width='7'>
                          <Header as='h5' color='blue' className='billing-header'>Contact Details</Header>
                          <Segment className='input-segment'>
                              <Input size='small' placeholder='Contact Name' />
                              <Input size='small' placeholder='Contact Phone' />
                          </Segment>
                      </Grid.Column>
                      <Grid.Column width='9'>
                        <Grid columns='3'>
                          <Grid.Row>
                            <Grid.Column style={{ padding: '0.5rem' }}>
                              <Header as='h5' color='blue' className='billing-header'>City</Header>
                              <Input fluid size='small' placeholder='San Francisco' />
                            </Grid.Column>
                            <Grid.Column style={{ padding: '0.5rem' }}>
                              <Header as='h5' color='blue' className='billing-header'>State</Header>
                              <Input fluid size='small' placeholder='California' />
                            </Grid.Column>
                            <Grid.Column style={{ padding: '0.5rem' }}>
                              <Header as='h5' color='blue' className='billing-header'>Zip Code</Header>
                              <Input fluid size='small' placeholder='94108' />
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row className='row-end'>
                      <Button content='Save' primary />
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Grid.Column>
            </Grid.Row>

            <Divider/>

            <Grid.Row>
              <Grid.Column width='5'>
                <Header as='h4'>
                  <p>Payment Method</p>
                </Header>
                <Header.Subheader>
                  The preferred method on how you are billed. Credit cards can
                  be added or removed.
                </Header.Subheader>
              </Grid.Column>
              <Grid.Column width='11'>
                <Segment>
                  <Grid>
                    <Grid.Column verticalAlign='top' width='8'>
                        <Segment className='creditcard-container'>
                          <p className='current-card'>
                            Current Card: XXXX-XXXX-XXXX-XXXX
                          </p>
                          <p className='current-card'>Exp: XX/XX</p>
                          <p className='current-card'>CVC: XXX</p>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width='8'>
                      <Segment className='input-segment'>
                        <Checkbox checked label='Credit Card' radio/>
                        <Image size='tiny' src='/images/credit-card.jpg'/>
                      </Segment>
                      <p>
                        Safe money Transfer using your bank acount. Visa,
                        Maestro, Discover, American Express, Powered by Stripe
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        and We don't store card information in our system.
                      </p>
                      <Divider/>
                      <Segment className='row-end'>
                        <CreateCardModal/>
                        <Button content='Confirm' primary/>
                      </Segment>
                    </Grid.Column>
                  </Grid>
                </Segment>
              </Grid.Column>
            </Grid.Row>

            <Divider/>

            <Grid.Row>
              <Grid.Column width='5'>
                <Header as='h4'>
                  <p>Invoices</p>
                </Header>
                <Header.Subheader>A list of all charges.</Header.Subheader>
              </Grid.Column>
              <Grid.Column width='11'>
                <Segment>
                  <Grid>
                    <Grid.Row className='invoices-table-label'>
                      <Grid.Column width='5'>
                        <Checkbox label='Date'/>
                      </Grid.Column>
                      <Grid.Column width='5'>
                        <Header as='h5'>
                          <p>Description</p>
                        </Header>
                      </Grid.Column>
                      <Grid.Column width='2'>
                        <Header as='h5'>
                          <p>Amount</p>
                        </Header>
                      </Grid.Column>
                      <Grid.Column width='2'>
                        <Header as='h5'>
                          <p>Status</p>
                        </Header>
                      </Grid.Column>
                      <Grid.Column width='2'></Grid.Column>
                    </Grid.Row>
                    <Divider/>
                    <Grid.Row>
                      <Grid.Column width='5'>
                        <Checkbox disabled label='08 May 2018 - 31 Dec 2020'/>
                      </Grid.Column>
                      <Grid.Column width='5'>
                        <p className='invoices-table-rows'>Team Plan</p>
                        <p className='invoices-table-rows'>
                          35 Agents(anual billing) x 12 months
                        </p>
                        <p className='invoices-table-rows'>
                          $40 per agent per month
                        </p>
                      </Grid.Column>
                      <Grid.Column width='2'>
                        <p className='invoices-table-rows'>$0</p>
                      </Grid.Column>
                      <Grid.Column width='2'>
                        <p className='invoices-table-rows'>paid</p>
                      </Grid.Column>
                      <Grid.Column width='2'>
                        <Button positive>
                          <Icon className='button-icon' name='download'/>
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    </Layout>
  )
}

export default reduxForm({
  form              : 'setup-company-profile-contact-billing',
  enableReinitialize: true,
  validate          : (values) => {
    const schema = {}

    return syncValidate(Yup.object().shape(schema), values)
  }
})(SetupCompanyProfileContactBilling)
