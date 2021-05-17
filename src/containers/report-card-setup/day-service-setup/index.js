import React from 'react'
import { Button, Grid, Header, Form, Select, Image, Card, Checkbox, Divider, Input } from 'semantic-ui-react'
import { Field } from 'redux-form'
import { reduxForm } from 'redux-form'
import FormField from '@components/Common/FormField'
import CheckboxGroup from '@components/Common/CheckboxGroup'
import '../styles.scss'

const DayServiceReportSetUp = ()=>{
  return (
    <>
      <Form  id='dynamic-redux-form' >
        <Grid>
          <Grid.Column className='pt8' computer={16}>
            <Header
              as='h3' className='display-inline-block' content='Report Cards Created'
              style={{ marginRight: '10%' }}/>
            <div className='service-div'>
              <Header
                as='h4' className='m0' color='blue'
                content='Day Camp'/>
              <Header
                as='h4' className='h-margin' color='grey'
                content='Dog Walking'/>
              <Header
                as='h4' className='m0' color='grey'
                content='Day Boarding'/>
            </div>
            <Button
              basic color='teal' content='Add Report Card'
              floated='right'
              icon='add'/>
          </Grid.Column>
        </Grid>
        <Grid  className='pt32'style={{ paddingLeft: '1.3rem' }}>
          <Grid.Row>
            <Grid.Column computer={5}>
              <Header as='h4' textAlign='justified'>
                <p> Select Service Type</p>
                <Header.Subheader>
              Pick the Day Service: Day Boarding, Day Camp. This will appear on the title of the report card.
                </Header.Subheader>
              </Header>
            </Grid.Column>
            <Grid.Column computer={11} textAlign='right'>
              <Field
                component={FormField}
                control={Select}
                name='location'
                options={[ { key: 1, value: 1, text: 'S-Stadium' } ]}
                selectOnBlur={false}
                style={{ width: '30%' }}/>
            </Grid.Column >
          </Grid.Row>

        </Grid>
        <Grid  className='pt32'style={{ paddingLeft: '1.3rem' }}>
          <Grid.Row>
            <Grid.Column computer={5}>
              <Header as='h4' textAlign='justified'>
                <p>Pet Profile Photo</p>
                <Header.Subheader>
                If a pet photo is not available, a default image can be used. Select on of the
                following options or upload a custom image. Silohoutee images will be recolered with
                the primary color of branding.
                </Header.Subheader>
              </Header>
            </Grid.Column>
            <Grid.Column computer={2}>

            </Grid.Column>
            <Grid.Column computer={3}>
              <div className='dayservice-img-card dog-img-width'>
                <Card style={{  marginLeft: '30%' }}>
                  <Image fluid src='/images/DogDaycare_Color.png'/>
                </Card>
              </div>

            </Grid.Column>
            <Grid.Column className='pl0' computer={3} verticalAlign='middle'>
              <div className='dayservice-img-card'>
                <Card style={{ width: '90%' }}>
                  <Image className='daycmp-Silohoutee-pic' src='/images/DayService_Silohutee.jpg'/>
                </Card>

              </div>
            </Grid.Column>
            <Grid.Column computer={3} textAlign='right'>
              <Button
                basic
                color='teal' content='Upload' fluid
                icon='upload'/>
            </Grid.Column>

          </Grid.Row>
        </Grid>
        <Grid  className='pt32'style={{ paddingLeft: '1.3rem' }}>
          <Grid.Row>
            <Grid.Column computer={5}>
              <Header as='h4' textAlign='justified'>
                <p>Pet Photo Slider</p>
                <Header.Subheader>
                  Enable this option if reports will contain pictures of pet's stay.
                </Header.Subheader>
              </Header>
            </Grid.Column>
            <Grid.Column computer={11} textAlign='right'>
              <Field
                checked={false}
                component={FormField}
                control={Checkbox}
                format={Boolean}
                name='photo_slider_toggle'
                toggle
                type='checkbox'/>

            </Grid.Column >
          </Grid.Row>
        </Grid>
        <Divider className='mt32 mb28'/>
        <Grid>
          <Grid.Column computer={16}>
            <Header as='h3' content='Main Section Customizable Fields'/>
          </Grid.Column>
        </Grid>

        <Grid  style={{ paddingLeft: '1.3rem' }}>
          <Grid.Row>
            <Grid.Column computer={9}>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Input}
                  name='category_text_field_1'
                  placeholder='Main Section Category 1 Header'/>
              </Form.Group>

            </Grid.Column>
            <Grid.Column computer={7} textAlign='right'>
              <Field
                checked={false}
                component={FormField}
                control={Checkbox}
                format={Boolean}
                name='training_rating'
                toggle
                type='checkbox'/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid className='mt0' style={{ paddingLeft: '2.1rem' }}>
          <Grid.Row>
            <Header as='h4' className='mr28' content='Select Field Type'/>
            <Field
              component={FormField}
              control={CheckboxGroup}
              name='category_1'
              options={[ { key: 1 , value: 1, text: 'Dropdown' },
                { key: 2 , value: 2, text: 'Free Text' },
                { key: 3, value: 3, text: 'Select all that apply' }
              ]}/>
          </Grid.Row>
        </Grid>
        <Grid className='mt0' style={{ paddingLeft: '1.3rem' }}>
          <Grid.Column className='pt0' computer={16}>
            <Form.Group width={3}>
              <Field
                component={FormField}
                control={Input}
                name='multiple_option_1'
                placeholder='Option 1'/>

            </Form.Group>
            <Form.Group width={3}>
              <Field
                component={FormField}
                control={Input}
                name='multiple_option_2'
                placeholder='Option 2'/>

            </Form.Group>
            <Form.Group width={3}>
              <Field
                component={FormField}
                control={Input}
                name='multiple_option_3'
                placeholder='Option 3'/>
            </Form.Group>

          </Grid.Column>

        </Grid>

      </Form>
    </>
  )
}

export default reduxForm({
  form              : 'day-service-setup-redux-form',
  destroyOnUnmount  : false,
  enableReinitialize: true
})(DayServiceReportSetUp)
