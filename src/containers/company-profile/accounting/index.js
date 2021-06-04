import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm, change, formValueSelector } from 'redux-form'
import { Label, Image, Breadcrumb, Icon, Button, Checkbox, Divider, Form, Grid, Header, Input, Select, Segment, TextArea, GridColumn } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import Layout from '@components/Common/Layout'
import Menu from '@containers/company-profile/components/Menu'
import Tab from '@containers/setup/boarding/general/components/Tab'
import SetupBoardingGeneralBelongingIndex from '@containers/setup/boarding/general/belonging-section'
import { parseResponseError, syncValidate } from '@lib/utils/functions'
import { previewImage } from './utils'

function SetupCompanyProfileAccounting (props) {
  const {
    error, handleSubmit // redux-form
    } = props
    
  const dispatch = useDispatch()
      
  const _handleSubmit = values => {
      console.log(values)
  }
  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>
        <Form onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h3' content='Account Settings: These options affect reporting'/>

          <Grid style={{ padding: '1rem' }}>
            <Grid.Row>
              <Grid.Column width='6'>
                <Header as='h4' content='Close Books Daily al Time:'/>
                <Header.Subheader>
                  Enter the time that all sales close 
                  for the day. Example: If you enter 
                  7pm, sales after 7pm will show on 
                  the next day.
                </Header.Subheader>
              </Grid.Column>

              <Grid.Column width='3' floated='right'>
                <Input type='time' className='row-end'/>
              </Grid.Column>
            </Grid.Row>

            <Divider/>

            <Grid.Row>
              <Grid.Column width='6'>
                <Header as='h4' content='Accouting Method:'/>
                <Header.Subheader>
                  Run reports using Accrual or Cash Based. You
                  can select both views on reports. Cash Based
                  (revenue realized when it is collected, is most 
                  common method)
                </Header.Subheader>
              </Grid.Column>

              <Grid.Column width='4' floated='right'>

                  <Grid>
                    <Grid.Row>
                      <Grid.Column width='10' className='header-check'>
                        <Header as='h4' className='header-check'>
                          Cash Based:
                        </Header>
                      </Grid.Column>
                      <Grid.Column width='6' className='header-check'>
                        <Checkbox toggle  className='header-check'/>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Grid>
                    <Grid.Row>
                      <Grid.Column width='10' className='header-check'>
                        <Header as='h4' className='header-check'>
                          Accrual Based:
                        </Header>
                      </Grid.Column>
                      <Grid.Column width='6' className='header-check'>
                        <Checkbox toggle  className='header-check'/>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

              </Grid.Column>
            </Grid.Row>

            <Divider/>
            
            <Grid.Row>
              <Grid.Column width='6'>
              </Grid.Column>
              <Grid.Column width='4' floated='right'>
                  <Button basic color='teal' content='Cancel'/>
                  <Button color='teal' content='Save changes'/>
              </Grid.Column>
            </Grid.Row>
          </Grid>

        </Form>
      </Segment>
    </Layout>
  )}
  
  export default reduxForm({
      form              : 'setup-company-profile-accounting',
      enableReinitialize: true,
      validate          : values => {
        const schema = {}
    
        return syncValidate(Yup.object().shape(schema), values)
      }
    })(SetupCompanyProfileAccounting)