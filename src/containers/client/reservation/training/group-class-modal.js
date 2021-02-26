import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { Button, Header, Modal } from 'semantic-ui-react'
import loadable from '@loadable/component'

import trainingReservationGroupClassDuck from '@reducers/pet/reservation/training/reservation/group-class'

import trainingReservationGroupClassDetailDuck from '@reducers/pet/reservation/training/reservation/group-class/detail'

const Table = loadable(() => import('@components/Table'))

const GroupClass = ({ ...props }) => {
  useEffect(()=>{
    props.getGroupClass()
  },[])

  const isOpened =  props.petReservationTrainingGroupClass.mode == 'CREATE'

  const _handleConfirmClick = () =>{
    props.setGroupClassItem(props.petReservationTrainingGroupClass.item ,'READ')
  }

  const _handleRadioButtonChange = (item) =>{
    props.setGroupClassItem(item,'CREATE')
  }

  const _handleCancelButtonClick = () =>{
    props.setGroupClassItem(null ,'READ')
  }

  return (
    <Modal
      className='form-modal'
      open={isOpened}
      size='large'>
      <Modal.Content>

        <Header as='h2'>Group Classes</Header>

        <Table duck={trainingReservationGroupClassDuck}  onOptionRadioButtonChange={_handleRadioButtonChange} striped/>

        <Button
          className='w120 mb12'
          color='teal'
          content='OK'
          floated='right' onClick={_handleConfirmClick}/>
        <Button
          basic
          className='w120 mb12'
          color='teal'
          content='Cancel'
          floated='right' onClick={_handleCancelButtonClick}/>

      </Modal.Content>

    </Modal>
  )
}

export default compose(
  connect(
    ({  ...state }) => ({
      petReservationTrainingGroupClass: trainingReservationGroupClassDetailDuck.selectors.detail(state)
    }),
    {
      getGroupClass    : trainingReservationGroupClassDuck.creators.get,
      setGroupClassItem: trainingReservationGroupClassDetailDuck.creators.setItem

    }
  )
)(GroupClass)
