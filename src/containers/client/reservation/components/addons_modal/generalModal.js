import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { Button, Modal } from 'semantic-ui-react'

import PetCard from '../../components/petCard'

const selector = formValueSelector('boarding-form')

function GeneralModal() {
  const [ open, setOpen ] = useState(false)
  const SelectedPets = useSelector((state) => selector(state, 'pets'))
  const [ indexPet, setIndexPet ] = useState()
  console.log(SelectedPets)

  return (
    <Modal
      // eslint-disable-next-line react/jsx-handler-names
      onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open}
      trigger={<Button color='green' disabled={SelectedPets.length === 0} type='button'>Edit</Button>}>
      <Modal.Content>
        {SelectedPets.map((pet, index) =>
          (<PetCard
            activeIndex={indexPet}
            key={index}
            onclick={() => setIndexPet(pet.id)}
            pet={pet}/>)
        )}
      </Modal.Content>
      <Modal.Actions>
        { /* eslint-disable-next-line react/jsx-handler-names */ }
        <Button color='red' onClick={() => setOpen(false)}>
          Cancel
        </Button>
        { /* eslint-disable-next-line react/jsx-handler-names */ }
        <Button onClick={() => setOpen(false)} positive>
          Save Service
        </Button>
      </Modal.Actions>
    </Modal>
  )
}
export default GeneralModal
