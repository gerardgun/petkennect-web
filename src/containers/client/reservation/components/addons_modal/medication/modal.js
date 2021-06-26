import { syncValidate } from '@lib/utils/functions'
import React, { useState } from 'react'
import { FieldArray, reduxForm } from 'redux-form'
import { Button, Form, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'
import MedicationChargeList from './components/charge-list'

const MedicationModal = () => {
  const [ open, setOpen ] = useState(false)

  return (
    <Modal
      // eslint-disable-next-line react/jsx-handler-names
      onClose={() => setOpen(false)}
      // eslint-disable-next-line react/jsx-handler-names
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color='green' type='button'>Edit</Button>}>
      <Modal.Content>
        <Form id='boarding-form'>
          <FieldArray component={MedicationChargeList} name='pets'/>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        { /* eslint-disable-next-line react/jsx-handler-names */ }
        <Button color='black' onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          icon='checkmark'
          labelPosition='right'
          // eslint-disable-next-line react/jsx-handler-names
          onClick={() => setOpen(false)}
          positive/>
      </Modal.Actions>
    </Modal>
  )
}

export default reduxForm({
  form                    : 'boarding-form',
  destroyOnUnmount        : false,
  forceUnregisterOnUnmount: true,
  validate                : values => {
    const schema = {}

    return syncValidate(Yup.object().shape(schema), values)
  }

})(MedicationModal)
