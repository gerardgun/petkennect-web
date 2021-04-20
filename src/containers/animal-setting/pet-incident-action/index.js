import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid } from 'semantic-ui-react'

import loadable from '@loadable/component'
import Table from '@components/Table'
import PetIncidentActionForm from  './Form'
import { useChangeStatusEffect } from '@hooks/Shared'
import petIncidentActionListConfig from '@lib/constants/list-configs/pet/animal-setting/incident-action'

import petIncidentActionDuck from '@reducers/pet/incident-action'
import petIncidentActionDetailDuck from '@reducers/pet/incident-action/detail'
const ModalDelete = loadable(()=> import('@components/Modal/Delete'))
const PetIncidentActionList = ({ petIncidentActionDetail, ...props }) => {
  useChangeStatusEffect(props.getPetIncidentActions, petIncidentActionDetail.status)

  useEffect(() => {
    props.getPetIncidentActions()
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
      <Grid columns={2}>
        <Grid.Column
          computer={11} mobile={12} tablet={8}>
          <div className='menu-item-table'>
            <Table
              config={petIncidentActionListConfig}
              duck={petIncidentActionDuck}
              onActionClick={_handleAddBtnClick}
              onRowButtonClick={_handleButtonClick}/>
          </div>
        </Grid.Column>
      </Grid>

      <PetIncidentActionForm/>
      <ModalDelete duckDetail={petIncidentActionDetailDuck}/>
    </>
  )
}

export default compose(
  connect(state => ({
    petIncidentAction      : petIncidentActionDuck.selectors.list(state),
    petIncidentActionDetail: petIncidentActionDetailDuck.selectors.detail(state)
  }), {
    getPetIncidentActions: petIncidentActionDuck.creators.get,
    setItem              : petIncidentActionDetailDuck.creators.setItem
  })
)(PetIncidentActionList)
