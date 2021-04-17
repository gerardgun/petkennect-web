import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/pet/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import PetIncidentActionForm from  './create'
import Tab from '@containers/setup/pet/general/components/Tab'
import Table from '@components/Table'
import petIncidentActionListConfig from '@lib/constants/list-configs/pet/animal-setting/incident-action'

import petIncidentActionDuck from '@reducers/pet/incident-action'
import petIncidentActionDetailDuck from '@reducers/pet/incident-action/detail'

const SetupPetGeneralIncidentActionIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(petIncidentActionDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      petIncidentActionDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        petIncidentActionDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        petIncidentActionDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        petIncidentActionDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        petIncidentActionDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <Table
            config={petIncidentActionListConfig}
            duck={petIncidentActionDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <PetIncidentActionForm/>

        <ModalDelete duckDetail={petIncidentActionDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupPetGeneralIncidentActionIndex
