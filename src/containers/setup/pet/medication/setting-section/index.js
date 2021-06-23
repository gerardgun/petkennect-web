import React, { useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, Grid, Header, Input, Select } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import { syncValidate } from '@lib/utils/functions'

const SetupPetMedicationSettingIndex = props => {
  const {
    error, handleSubmit // redux-form
  } = props

  const [ chargesType, setChargesType ] = useState('noCharge')

  const _handleItemSelect = (value)=>{
    setChargesType(value)
  }

  const _handleSubmit = values => {
    //console.log(values)
  }

  return (
          /* eslint-disable-next-line react/jsx-handler-names */
          <Form onSubmit={handleSubmit(_handleSubmit)}>
            <Header as='h4' color='teal'>Adjust Editable Field Values</Header>
            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='6'>
                  <Header as='h4'>
                    <p className='mb0'>Do you charge for Medication Administration?</p>
                  </Header>
                </Grid.Column>
                <Grid.Column width='1'/>
                <Grid.Column width='7'>
                  <Field
                    autoFocus
                    component={FormField}
                    control={Select}
                    name='charge_type'
                    onChange={_handleItemSelect}
                    options={[
                      {
                        key: 1, value: 'noCharge', text: 'No Charges Apply'
                      },
                      {
                        key: 2, value: 'perDay', text: 'Yes, Per Day '
                      },
                      {
                        key: 3, value: 'perTime', text: 'Yes, Per Administration Time'
                      },
                      {
                        key: 4, value: 'perEachMedication', text: 'Yes, Per Administration For Each Medication'
                      }
                    ]}
                    placeholder='Select Charges'
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            {/* <Divider/> */}

            {    chargesType !== 'noCharge' && (
              <React.Fragment>
                <Grid style={{ padding: '1rem' }}>
                  <Grid.Row>
                    <Grid.Column width='6'>
                      <Header as='h4'>
                        <p className='mb0'>Enter the amount to charge for medication adminstration</p>
                      </Header>
                    </Grid.Column>
                    <Grid.Column width='1'/>
                    <Grid.Column width='4'>
                      <Field
                        className='w50'
                        component={FormField}
                        control={Input}
                        name='daily_charge'
                        placeholder='$0'
                        type='number'/>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

              </React.Fragment>
            )
            }

            {/* <Divider className='mt20'/> */}

            {
              error && (
                <FormError message={error}/>
              )
            }

          </Form>
  )
}

export default reduxForm({
  form              : 'setup-pet-vaccination-setting',
  enableReinitialize: true,
  validate          : values => {
    const schema = {}

    return syncValidate(Yup.object().shape(schema), values)
  }
})(SetupPetMedicationSettingIndex)
