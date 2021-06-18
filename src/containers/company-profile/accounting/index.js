import React from 'react'
import { useSelector } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Button, Checkbox, Divider, Form, Grid, Header, Input, Segment } from 'semantic-ui-react'
import * as Yup from 'yup'

import Layout from '@components/Common/Layout'
import Menu from '@containers/company-profile/components/Menu'
import Theme from '@components/mainTheme'
import tenantDetailDuck from '@reducers/tenant/detail'
import { syncValidate } from '@lib/utils/functions'

function SetupCompanyProfileAccounting(props) {
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
        <Form onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h3' color={Theme(tenant).headingColor} content='Account Settings: These options affect reporting'/>

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

              <Grid.Column floated='right' width='3'>
                <Input className='row-end' type='time'/>
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

              <Grid.Column floated='right' width='4'>

                <Grid>
                  <Grid.Row>
                    <Grid.Column className='header-check' width='10'>
                      <Header as='h4' className='header-check'>
                          Cash Based:
                      </Header>
                    </Grid.Column>
                    <Grid.Column className='header-check' width='6'>
                      <Checkbox className='header-check'  toggle/>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Grid>
                  <Grid.Row>
                    <Grid.Column className='header-check' width='10'>
                      <Header as='h4' className='header-check'>
                          Accrual Based:
                      </Header>
                    </Grid.Column>
                    <Grid.Column className='header-check' width='6'>
                      <Checkbox className='header-check'  toggle/>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

              </Grid.Column>
            </Grid.Row>

            <Divider/>

            <Grid.Row>
              <Grid.Column width='6'>
              </Grid.Column>
              <Grid.Column floated='right' width='4'>
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
