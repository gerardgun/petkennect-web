import React  from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Checkbox, Select, Button, Grid, Header, Segment,Form } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'

import Layout from '@components/Common/Layout'
import FormField from '@components/Common/FormField'
import TextAreaEditor from '@components/Common/TextAreaEditor'

import './style.scss'

const SystemSetting = () => {
  return (
    <Layout>

      <Segment className='segment-content'>
        <Grid className='segment-content-header'>
          <Grid.Column>
            <Header as='h2'>Application System Settings</Header>
            <br></br>
            <Form>

              <Field
                component='input' defaultValue={true} name='group_code'
                type='hidden'/>

              <Form.Group>
                <Header as='h3' className='multi-header'>Select Location</Header>
              </Form.Group>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Select}

                  multiple={true}
                  name='location'
                  options={[
                    { key: 1, value: 1, text: 'All' },
                    { key: 2, value: 2, text: 'location1' },
                    { key: 3, value: 3, text: 'location2' },
                    { key: 4, value: 4, text: 'location3' }
                  ]}
                  placeholder='Select location'
                  selectOnBlur={false}/>
              </Form.Group>

              <Header as='h3'className='header-check'>Enable Reservation Email Confirmation Template for Clients</Header>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Checkbox}
                  format={Boolean}
                  label='enable'
                  name='enable_reservation'
                  type='checkbox'/>
              </Form.Group>

              <Header as='h3' className='text-area-header' >Email template signature</Header>

              <Form.Group  widths='equal'>

                <Field
                  component={FormField}
                  control={TextAreaEditor}

                  name='body_text'/>
              </Form.Group>
              <Form.Group className='form-modal-actions' widths='equal'>
                <Form.Field>
                  <Button
                    content='Cancel'
                    disabled=''
                    onClick=''
                    type='button'/>
                  <Button
                    color='teal'
                    content={'Save'}
                    disabled=''
                    loading=''/>
                </Form.Field>
              </Form.Group>
            </Form>
          </Grid.Column >

        </Grid>
      </Segment>
    </Layout>
  )
}

export default compose(
  connect(
    ()=>{
      return {
        initialValues: {

          body_text: '&nbsp;<br/> '

          + '<br/>' + '<br/>' + '<br/>' + '<br/>' + '<br/>' + '<br/>'

          + 'Thank You,<br/>'
          + 'PetKennect Team<br/>'
          + 'Copyright @2021 PetKennect'
          + '<figure><img src="http://petkennect-operations-web.s3-website.us-east-2.amazonaws.com/images/logo.png"/></figure>'

        }
      }
    }
  ),
  reduxForm({
    form: 'system-setting'

  })
)(SystemSetting)

