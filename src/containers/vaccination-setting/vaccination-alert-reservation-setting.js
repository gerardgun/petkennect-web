import React from 'react'
import  { connect } from 'react-redux'

import { compose } from 'redux'
import { Grid, Header,  Form, Button, Input, TextArea } from 'semantic-ui-react'
import Switch from 'react-switch'
import { Field, reduxForm } from 'redux-form'
import FormField from '@components/Common/FormField'
import CustomizeEmailForm from './customize-email'
import emailTemplateDetailDuck from '@reducers/email-template/detail'
import './styles.scss'

const VaccinationReservSetting = (props)=>{
  const _handleEmailBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  return (<>
    {/* eslint-disable-next-line react/jsx-handler-names */}
    <Form>

      <Grid className='segment-content-header'>
        <Grid.Column>
          <Grid>
            <Grid.Column computer={8}>
              <Header as='h4' color='teal'>Vaccination Alerts and Reservation Settings</Header>
            </Grid.Column>
          </Grid>
          <Grid >
            <Grid.Column computer={9}>
              <Header as='h5'>Auto email notification to client about missing/expired vaccine:</Header>
              <Header as='h5'>Days prior to expiration when notification should be sent:</Header>
              <Header as='h5'>Allow clients to book online reservation with expired vaccines:</Header>

            </Grid.Column>

            <Grid.Column className='pl0' computer={1}>
              <Form.Field>
                <Switch
                  checked={true}
                  className='react-switch'
                  height={30}
                  onColor='#00aa9f'
                  width={60}/>
              </Form.Field>
              <Form.Group>
                <Form.Field
                  className='day-box'
                  control={Input}
                  name='day-box'
                  type='number'
                  value={30}/>
              </Form.Group>

            </Grid.Column>
            <Grid.Column className='pl32 pt4' computer={6}>
              <Button
                basic
                color='teal'
                content='Customize the Email'
                onClick={_handleEmailBtnClick}/>
            </Grid.Column>
          </Grid>
          <Grid>

            <Grid.Column  computer={9}>
              <Header as='h5' className='mt8'>Day Services</Header>
              <Header as='h5' className='mt32'>Boarding</Header>
              <Header as='h5'  className='mt32'>Training</Header>
              <Header as='h5' className='mt32'>Grooming</Header>
            </Grid.Column>
            <Grid.Column className='pl0' computer={1}>
              <Form.Field className='mb20'>
                <Switch
                  checked={true}
                  className='react-switch'
                  height={30}
                  onColor='#00aa9f'
                  width={60}/>
              </Form.Field>
              <Form.Field className='mb20'>
                <Switch
                  checked={true}
                  className='react-switch'
                  height={30}
                  onColor='#00aa9f'
                  width={60}/>
              </Form.Field>
              <Form.Field className='mb20'>
                <Switch
                  checked={false}
                  className='react-switch'
                  height={30}
                  onColor='#00aa9f'
                  width={60}/>
              </Form.Field>
              <Form.Field className='mb20'>
                <Switch
                  checked={true}
                  className='react-switch'
                  height={30}
                  onColor='#00aa9f'
                  width={60}/>
              </Form.Field>
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column computer={8}>
              <Header as='h4' color='teal'>Vaccination Instructions when Booking Online</Header>

            </Grid.Column>
          </Grid>

          <Grid >
            <Grid.Column className='pb0' computer={11}>
              <Header as='h5'>Customize the message to your clients when they book online with missing/ expired Vaccinations.</Header>
            </Grid.Column>

          </Grid>
          <Grid>
            <Grid.Column   computer={14}>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={TextArea}
                  name='client-message'/>
              </Form.Group>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    </Form>
    <CustomizeEmailForm/></>
  )
}

export default  compose(
  connect(
    null
    , {

      setItem: emailTemplateDetailDuck.creators.setItem
    }),

  reduxForm({
    form              : 'vaccination-reserve-settting-form',
    destroyOnUnmount  : false,
    enableReinitialize: true
  })
)(VaccinationReservSetting)

