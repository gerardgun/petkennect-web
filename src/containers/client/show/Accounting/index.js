import React from 'react'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Grid, Header, Segment, Form, Input } from 'semantic-ui-react'
import loadable from '@loadable/component'
const FormField = loadable(() => import('@components/Common/FormField'))

const Accounting = () => {
  return (
    <>
      <Segment style={{ boxShadow: 'none', border: 'none' }}>
        <Grid className='petkennect-profile-body-header' columns={2}>
          <Grid.Column computer={16} mobile={16} tablet={16}>
            <Header as='h2'>Accounting</Header>
          </Grid.Column >
        </Grid>  <Form>
          <div className='petkennect-profile-body-content'>
            <Header as='h6' className='section-header' color='blue'>Package Discount</Header>
            <Form.Group widths={2}>
              <Field
                autoComplete='off'
                component={FormField}
                control={Input}
                label='Discount'
                name='package_discount'
                placeholder='Enter Discount'
                type='number'/>
            </Form.Group>
          </div>
        </Form>

      </Segment>
    </>
  )
}

export default compose(
  reduxForm({
    form              : 'payment-method-form',
    enableReinitialize: true
  })
)(Accounting)
