import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm, change, formValueSelector } from 'redux-form'
import { Button, Checkbox, Divider, Form, Grid, Header, Input, Select, Segment, TextArea } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import Layout from '@components/Common/Layout'
import Menu from '@containers/settings/components/Menu'
import Tab from '@containers/setup/training/general/components/Tab'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

const SetupTrainingGeneralSettingIndex = props => {
  const {
    error, handleSubmit // redux-form
  } = props

  const dispatch = useDispatch()

  const _handleSubmit = values => {
    console.log(values)
  }

  return (
    <Layout>
      <Segment className='segment-content'>
        <Menu/>

        <Tab>
          {/* eslint-disable-next-line react/jsx-handler-names */}
          <Form onSubmit={handleSubmit(_handleSubmit)}>
            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='5'>
                  <Header as='h4'>
                    <p>Enable Client Training Questionnaire</p>
                    <Header.Subheader>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam mi, eros vitae, elementum luctus elit.
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column textAlign='center' width='4'>
                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    name='client_training_questionnaire'
                    toggle
                    type='checkbox'/>
                </Grid.Column>
                <Grid.Column width='7'>
                  <Button className='mt12' color='teal' content='Customize Form'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            {/*<Divider/>*/}

            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='5'>
                  <Header as='h4'>
                    <p>Enable Training Rating System</p>
                    <Header.Subheader>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam mi, eros vitae, elementum luctus elit.
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column textAlign='center' width='4'>
                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    name='training_rating'
                    toggle
                    type='checkbox'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            {/*<Divider/>*/}

            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='7'>
                  <Header as='h4'>
                    <p>
                      For Board and Trains: Is the cost of boarding included in the training price or
                      should boarding be charged separately based on actual charges?
                    </p>
                    <Header.Subheader>
                      PetKennect allows you the option to charge
                      separately or include boarding without cost since it is included in the training price.
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column width='5'>
                  <Field
                    component={FormField}
                    control={Select}
                    name='boarding_and_trains'
                    options={[
                      { value: 1, text: 'It is included, do not charge for boarding' },
                      { value: 2, text: 'It is NOT included, charge separately for boarding' }
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
                <Grid.Column width='7'>
                  <Header as='h4'>
                    <p>
                      Since boarding is included in the total
                      price, do you want to break out the cost by allocating a
                      percentage or dollar value?
                    </p>
                    <Header.Subheader>
                      Ex. If a board and train costs $1000, you can allocate
                      a percent (25%) or a dollar value ($250). In reporting, the amount allocated to boarding will
                      appear there.
                    </Header.Subheader>
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
                    selectOnBlur={false}/>
                </Grid.Column>
                <Grid.Column width='3'>
                  <Field
                    component={FormField}
                    control={Input}
                    name='discount_per_dog_price'
                    placeholder='0.00'
                    type='number'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Header as='h4' color='teal'>Multiple Location Setup</Header>

            <Divider className='mt20'/>

            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='7'>
                  <Header as='h4'>
                    <p>Enable Multiple Location Setup</p>
                    <Header.Subheader>
                      If prices vary by location, enable this options.
                      If all locations charge the same prices for services, do not enable this option.
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column textAlign='center' width='4'>
                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    name='multiple_location_setup_enabled'
                    toggle
                    type='checkbox'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            {/*<Divider className='mt20'/>*/}

            {
              error && (
                <FormError message={error}/>
              )
            }

          </Form>
        </Tab>
      </Segment>
    </Layout>
  )
}

export default reduxForm({
  form              : 'setup-training-setting',
  enableReinitialize: true,
  validate          : values => {
    const schema = {}

    return syncValidate(Yup.object().shape(schema), values)
  }
})(SetupTrainingGeneralSettingIndex)
