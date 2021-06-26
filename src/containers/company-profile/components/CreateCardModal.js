import { syncValidate } from '@lib/utils/functions'
import React, { useEffect, useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import { Form, Modal, Button, Checkbox, Divider, Grid, Header, Input, Select } from 'semantic-ui-react'

const selector = formValueSelector('card-form')

function CreateCardModal() {
  const dispatch = useDispatch()
  const [ open, setOpen ] = React.useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='mini'
      trigger={<Button positive>Add New Card</Button>}>
      <Modal.Header>Add New Card</Modal.Header>
      <Modal.Content>
        <Form id='card-form'>
          <Grid>
            <Grid.Row>
              <Grid.Column width='16'>
                <Header as='h4' className='m0 w30'>
                  Card Number:
                </Header>
                <Field
                  component={FormField}
                  control={Input}
                  name='card_number'
                  required/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width='8'>
                <Header as='h4' className='m0 w30'>
                  Exp:
                </Header>
                <Field
                  component={FormField}
                  control={Input}
                  name='card_exp'
                  required/>
              </Grid.Column>
              <Grid.Column width='8'>
                <Header as='h4' className='m0 w30'>
                  CVC:
                </Header>
                <Field
                  component={FormField}
                  control={Input}
                  name='card_cvc'
                  required/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button onClick={() => setOpen(false)} positive >
          Add Card
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

const commonDefaultProps = {
}

CreateCardModal.defaultProps = {
  childProps        : commonDefaultProps,
  comesFromPetScreen: true,
  ...commonDefaultProps
}

export default reduxForm({
  form    : 'card-form',
  validate: (values) => {
    const schema = {}

    return syncValidate(Yup.object().shape(schema), values)
  }
})(CreateCardModal)
