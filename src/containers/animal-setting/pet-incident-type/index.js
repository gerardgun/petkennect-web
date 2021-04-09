import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Icon } from 'semantic-ui-react'

import loadable from '@loadable/component'
import Table from '@components/Table'
import PetIncidentTypeForm from  './Form'
import { useChangeStatusEffect } from '@hooks/Shared'
import petIncidentTypeListConfig from '@lib/constants/list-configs/pet/animal-setting/incident-type'

import petIncidentTypeDuck from '@reducers/pet/incident-type'
import petIncidentTypeDetailDuck from '@reducers/pet/incident-type/detail'
import '../styles.scss'

const ModalDelete = loadable(()=> import('@components/Modal/Delete'))

const PetIncidentTypeList = ({ petIncidentTypeDetail, ...props }) => {
  useChangeStatusEffect(props.getPetIncidentTypes, petIncidentTypeDetail.status)

  useEffect(() => {
    props.getPetIncidentTypes()
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
          computer={10} mobile={12} tablet={8}>
          <div className='div-table-width'>
            <Table
              config={petIncidentTypeListConfig}
              duck={petIncidentTypeDuck}
              onRowButtonClick={_handleButtonClick}/>
          </div>

        </Grid.Column>
        <Grid.Column
          computer={6} mobile={4} tablet={4}>
          <Button basic color='teal' onClick={_handleAddBtnClick}><Icon name='plus'></Icon>Incident Type</Button>
        </Grid.Column>
      </Grid>

      <PetIncidentTypeForm/>
      <ModalDelete duckDetail={petIncidentTypeDetailDuck}/>
    </>
  )
}

export default compose(
  connect(state => ({
    petIncidentType      : petIncidentTypeDuck.selectors.list(state),
    petIncidentTypeDetail: petIncidentTypeDetailDuck.selectors.detail(state)
  }), {
    getPetIncidentTypes: petIncidentTypeDuck.creators.get,
    setItem            : petIncidentTypeDetailDuck.creators.setItem
  })
)(PetIncidentTypeList)
