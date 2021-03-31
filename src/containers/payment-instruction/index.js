
import React, { useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'redux'
import { Form, Header, Segment, Grid, Menu, Button } from 'semantic-ui-react'
import * as Yup from 'yup'

// import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate } from '@lib/utils/functions'

import Layout from '@components/Common/Layout'
import TextAreaEditor from '@components/Common/TextAreaEditor'

const PaymentInstruction = () => {
  const [ activeMenuItem, setActiveMenuItem ] = useState('boarding')
  const _handleMenuItemClick = (e, { name }) => setActiveMenuItem(name)

  return (
    <Layout>
      <Segment className='segment-content'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={14} tablet={8}>
            <Header as='h2' className='cls-MainHeader'>Payment Instructions</Header>
          </Grid.Column>
        </Grid>
        <Grid className='mh0' columns={2}>
          <Grid.Column
            className='mr24'
            computer={5} mobile={16} tablet={5}>
            <Menu
              className='petkennect-profile-menu' color='teal' fluid
              vertical>
              <Menu.Item
                active={activeMenuItem === 'boarding'} link name='boarding'
                onClick={_handleMenuItemClick}>
                Boarding Instructions
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'daycare'} link name='daycare'
                onClick={_handleMenuItemClick}>
                Daycare Instructions
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'training'} link name='training'
                onClick={_handleMenuItemClick}>
                Personal Training Instructions
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'grooming'} link name='grooming'
                onClick={_handleMenuItemClick}>
                Grooming Instructions
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'groupClasses'} link name='groupClasses'
                onClick={_handleMenuItemClick}>
                Group Classes Instructions
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column
            className='petkennect-profile-body'
            computer={10} mobile={16} tablet={10}>
            <Grid className='petkennect-profile-body-header' columns={2}>
              <Grid.Column
                computer={12} mobile={12} tablet={12}
                verticalAlign='middle'>
                {
                  activeMenuItem === 'boarding' && <Grid>
                    <Grid.Column
                      verticalAlign='middle'>
                      <Header as='h3'>Boarding Payment Instructions</Header>
                    </Grid.Column>
                  </Grid>
                }
                {
                  activeMenuItem === 'daycare' && <Grid>
                    <Grid.Column
                      verticalAlign='middle'>
                      <Header as='h3'>Daycare Payment Instructions</Header>
                    </Grid.Column>
                  </Grid>
                }
                {
                  activeMenuItem === 'training' && <Grid>
                    <Grid.Column
                      verticalAlign='middle'>
                      <Header as='h3'>Personal Training Payment Instructions</Header>
                    </Grid.Column>
                  </Grid>
                }
                {
                  activeMenuItem === 'grooming' && <Grid>
                    <Grid.Column
                      verticalAlign='middle'>
                      <Header as='h3'>Grooming Payment Instructions</Header>
                    </Grid.Column>
                  </Grid>
                }
                {
                  activeMenuItem === 'groupClasses' && <Grid>
                    <Grid.Column
                      verticalAlign='middle'>
                      <Header as='h3'>Group Classes Payment Instructions</Header>
                    </Grid.Column>
                  </Grid>
                }
              </Grid.Column>
              <Grid.Column
                computer={4} mobile={4} tablet={4}
                textAlign='right'>

                <Button basic color='teal'>Save</Button>
              </Grid.Column>
            </Grid>

            <Form className='mv40 mh28'>
              <Field
                component={FormField}
                control={TextAreaEditor}
                name='instruction'/>
            </Form>
          </Grid.Column>
        </Grid>

      </Segment>
    </Layout>
  )
}

export default compose(
  reduxForm({
    form              : 'payment-instruction-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {}

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(PaymentInstruction)
