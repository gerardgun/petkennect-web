import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Field, formValueSelector } from 'redux-form'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

import PetCard from '../../components/petCard'
import boardingReservationBookDetailDuck from '@reducers/client/reservation/boarding-reservation-book/detail'

const selector = formValueSelector('boarding-form')

function GeneralModal (props) {
  const [open, setOpen] = useState(false)
  const detail = useSelector(boardingReservationBookDetailDuck.selectors.detail)
  const pets = useSelector((state) =>
    selector(state, 'pets')
  )
  const selectedPets = detail.form.pet_options.filter(pet => {
    for(let i = 0; pets.length > i ; i++){
      if(pets[i] === pet.id){
        return true
      }else{
        return false
      }
    }
  })
  console.log(detail, pets, selectedPets)
return(
  <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} trigger={<Button type='button' disabled={selectedPets.length === 0} positive>Edit</Button>}>
    <Modal.Content>
      {selectedPets.map( pets => <PetCard pet={pets}/> )}
    </Modal.Content>
    <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button labelPosition='right' icon='checkmark' onClick={() => setOpen(false)} positive>
          Save Service
        </Button>
      </Modal.Actions>
  </Modal>
)
}
export default GeneralModal