import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid } from 'semantic-ui-react'

import loadable from '@loadable/component'
import Table from '@components/Table'
import PetIncidentBehaviorForm from  './Form'
import { useChangeStatusEffect } from '@hooks/Shared'
import petIncidentBehaviorListConfig from '@lib/constants/list-configs/pet/animal-setting/incident-behavior'

import petIncidentBehaviorDuck from '@reducers/pet/incident-behavior'
import petIncidentBehaviorDetailDuck from '@reducers/pet/incident-behavior/detail'
const ModalDelete = loadable(()=> import('@components/Modal/Delete'))
const PetIncidentBehaviorList = ({ petIncidentBehaviorDetail, ...props }) => {
  useChangeStatusEffect(props.getPetIncidentBehaviors, petIncidentBehaviorDetail.status)

  useEffect(() => {
    props.getPetIncidentBehaviors()
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
          computer={11} mobile={12} tablet={8}>
          <div className='menu-item-table'>
            <Table
              config={petIncidentBehaviorListConfig}
              duck={petIncidentBehaviorDuck}
              onActionClick={_handleAddBtnClick}
              onRowButtonClick={_handleButtonClick}/>
          </div>
        </Grid.Column>
      </Grid>

      <PetIncidentBehaviorForm/>
      <ModalDelete duckDetail={petIncidentBehaviorDetailDuck}/>

    </>
  )
}

export default compose(
  connect(
    state => ({
      petIncidentBehavior      : petIncidentBehaviorDuck.selectors.list(state),
      petIncidentBehaviorDetail: petIncidentBehaviorDetailDuck.selectors.detail(state)
    }), {
      getPetIncidentBehaviors: petIncidentBehaviorDuck.creators.get,
      setItem                : petIncidentBehaviorDetailDuck.creators.setItem
    })
)(PetIncidentBehaviorList)
