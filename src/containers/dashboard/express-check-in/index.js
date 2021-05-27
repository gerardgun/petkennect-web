/* eslint-disable react/jsx-handler-names */
import React,{ useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {  Header, Form, Select, Card, Grid, Button, Dropdown } from 'semantic-ui-react'
import { Field, reduxForm, formValueSelector } from 'redux-form'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import ExpressCheckInModal from './express-check-in-modal'
import ExpressCheckinSuccess from './checked-in-success'
export const  formId = 'express-check-in-redux-form'
const ExpressCheckInForm = (props)=>{
  const {
    error,
    reset,
    selectedPets
  } = props
  const [ modalOpen,setModalOpen ] = useState(false)
  const [ checkedInModal,setCheckedInModal ] = useState(false)

  const _handleModalChange = (option)=>{
    switch (option) {
      case 'open':
        if(selectedPets && selectedPets.length >= 2)
        {setModalOpen(!modalOpen)}
        else if(selectedPets && selectedPets.length === 1) {
          props.reset()
          setCheckedInModal(true)
        }
        break
      case 'close':
        setModalOpen(!modalOpen)
        break
    }
  }

  return (
    <>
      <Card fluid>
        <Form id={formId} onReset={reset} >
          <Grid className='mh12 mv12'>
            <Grid.Column className='pb0' computer={16}>
              <Header as='h3' content='Express Check In'/>
            </Grid.Column>

            <Grid.Column className='pb0' computer={14}>

              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Select}
                  name='serive_name_check'
                  options={[
                    {
                      key: 1, value: 'boarding', text: 'Boarding'
                    },{
                      key: 2, value: 'dayService', text: 'Day Service'
                    },{
                      key: 3, value: 'training', text: 'Training'
                    } ]}
                  placeholder='Select Service'/>
              </Form.Group>
            </Grid.Column>
            <Grid.Column className='pb0 pt8' computer={14}>
              <Field
                component={FormField}
                control={Dropdown}
                fluid
                icon='search'
                multiple
                name='pets'
                options={[ { key: 1, text: 'Boots', value: 1 },
                  { key: 2, text: 'Loki', value: 2 },
                  { key: 3, text: 'Tommy', value: 3 },
                  { key: 4, text: 'Tizen', value: 4 } ,
                  { key: 5, text: 'Goldy', value: 5 },
                  { key: 6, text: 'Pemintay', value: 6 } ]}
                placeholder='Enter Pet'
                search
                selectOnBlur={false}
                selection/>
            </Grid.Column>
            <Grid.Column className='pl2 pt8' computer={2}>
              <Button
                basic
                color='green' icon='check' onClick={()=>{_handleModalChange('open')}}
                type='button'/>
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
        </Form>

      </Card>
      <ExpressCheckInModal modalOpen={modalOpen} onModalChange={_handleModalChange}/>
      <ExpressCheckinSuccess modalOpen={checkedInModal} onModalChange={()=>{setCheckedInModal(false)}}/>
    </>
  )
}
export default  compose(
  connect(
    state => {
      const selectedPets = formValueSelector('express-check-in-redux-form')(state,'pets')

      return {
        selectedPets
      }
    }
  ),
  reduxForm({
    form              : formId,
    destroyOnUnmount  : false,
    enableReinitialize: true

  })
)(ExpressCheckInForm)
