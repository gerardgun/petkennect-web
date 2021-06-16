import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Field, formValueSelector } from 'redux-form'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

import PetCard from '../../components/petCard'
import boardingReservationBookDetailDuck from '@reducers/client/reservation/boarding-reservation-book/detail'
import pet from '@reducers/client/pet'

const selector = formValueSelector('boarding-form')

function GeneralModal (props) {
  const [open, setOpen] = useState(false)
  const detail = useSelector(boardingReservationBookDetailDuck.selectors.detail)
  const SelectedPets = useSelector((state) => selector(state, 'pets'))
  const AllPets = detail.form.pet_options
  const [ indexPet, setIndexPet] = useState()
  console.log(SelectedPets)
return(
  <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} trigger={<Button type='button' disabled={SelectedPets.length === 0} positive>Edit</Button>}>
    <Modal.Content>
      {SelectedPets.map( pet => 
        <PetCard pet={pet} 
          activeIndex={indexPet} 
          onclick={() => setIndexPet(pet.id)}/> 
      )}
    </Modal.Content>
    <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button onClick={() => setOpen(false)} positive>
          Save Service
        </Button>
      </Modal.Actions>
  </Modal>
)
}
export default GeneralModal