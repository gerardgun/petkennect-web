import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid } from 'semantic-ui-react'

import loadable from '@loadable/component'

import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import PetInteractionTypeForm from  './Form'
import { useChangeStatusEffect } from '@hooks/Shared'
import petInteractionTypeListConfig from '@lib/constants/list-configs/pet/animal-setting/pet-interaction-type'

import petInteractionTypeDuck from '@reducers/pet/interaction-type'
import petInteractionTypeDetailDuck from '@reducers/pet/interaction-type/detail'
const ModalDelete = loadable(()=> import('@components/Modal/Delete'))
const PetInteractionTypeList = ({  petInteractionTypeDetail, ...props }) => {
  const [ open, { _handleClose } ] = useModal()
  useChangeStatusEffect(props.getPetInteractionTypes, petInteractionTypeDetail.status)

  useEffect(() => {
    props.getPetInteractionTypes()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleButtonClick = (button,item) =>{
    switch (button) {
      case 'edit': props.setItem(item,'UPDATE')
        break
      case 'delete' : props.setItem(item,'DELETE')
    }
  }

  return (
    <>
      <Grid>
        <Grid.Column
          computer={10} mobile={12} tablet={8}>
          <div className='menu-item-table'>
            <Table
              config={petInteractionTypeListConfig}
              duck={petInteractionTypeDuck}
              onActionClick={_handleAddBtnClick}
              onRowButtonClick={_handleButtonClick}/>
          </div>
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
