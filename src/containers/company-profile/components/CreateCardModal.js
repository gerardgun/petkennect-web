import React from 'react'

import { Modal, Button, Checkbox, Divider, Grid, Header, Input, Select } from 'semantic-ui-react'
import { PetCard } from '@components/PetCard'
import { Field, formValueSelector } from 'redux-form'
import FormField from '@components/Common/FormField'
import { useSelector } from 'react-redux'
import companyContactBillingDetailDuck from '@reducers/company/contact-billing/detail'

const selector = formValueSelector('billing-form')

function CreateCardModal (){
  const detail = useSelector(companyContactBillingDetailDuck.selectors.detail)
  const cards = useSelector((state) => selector(state, 'cards') )
  const [open, setOpen] = React.useState(false)

  console.log('detail',detail.form.cards, 'cards',cards)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button positive>Add New Card</Button>}
    >
      <Modal.Header>Add New Card</Modal.Header>
      <Modal.Content image>
        
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button onClick={() => setOpen(false)} positive >
          Add Card
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default CreateCardModal;