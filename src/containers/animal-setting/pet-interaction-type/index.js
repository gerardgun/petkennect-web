import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Icon } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import PetInteractionTypeForm from  './Form'
import { useChangeStatusEffect } from '@hooks/Shared'
import petInteractionTypeListConfig from '@lib/constants/list-configs/pet/animal-setting/pet-interaction-type'

import petInteractionTypeDuck from '@reducers/pet/interaction-type'
import petInteractionTypeDetailDuck from '@reducers/pet/interaction-type/detail'

const PetInteractionTypeList = ({ petInteractionType, petInteractionTypeDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getPetInteractionTypes, petInteractionTypeDetail.status)

  useEffect(() => {
    props.getPetInteractionTypes()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(petInteractionType.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <>
      <Grid columns={2}>
        <Grid.Column
          computer={10} mobile={12} tablet={8}>
          <Table
            config={petInteractionTypeListConfig}
            duck={petInteractionTypeDuck}
            onOptionClick={_handleOptionClick}
            onRowClick={_handleRowClick}/>
        </Grid.Column>
        <Grid.Column
          computer={4} mobile={4} tablet={4}>
          <Button basic color='teal' onClick={_handleAddBtnClick}><Icon name='plus'></Icon>Interaction Type</Button>
        </Grid.Column>
      </Grid>

      <PetInteractionTypeForm/>
      <ModalDelete
        duckDetail={petInteractionTypeDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </>
  )
}

export default compose(
  connect(
    state => ({
      petInteractionType      : petInteractionTypeDuck.selectors.list(state),
      petInteractionTypeDetail: petInteractionTypeDetailDuck.selectors.detail(state)
    }), {
      getPetInteractionTypes: petInteractionTypeDuck.creators.get,
      setItem               : petInteractionTypeDetailDuck.creators.setItem
    })
)(PetInteractionTypeList)
