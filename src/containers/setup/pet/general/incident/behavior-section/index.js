import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/pet/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import PetIncidentBehaviorForm from  './create'
import Tab from '@containers/setup/pet/general/components/Tab'
import Table from '@components/Table'
import petIncidentBehaviorListConfig from '@lib/constants/list-configs/pet/animal-setting/incident-behavior'

import petIncidentBehaviorDuck from '@reducers/pet/incident-behavior'
import petIncidentBehaviorDetailDuck from '@reducers/pet/incident-behavior/detail'

const SetupPetGeneralIncidentBehaviorIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(petIncidentBehaviorDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      petIncidentBehaviorDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        petIncidentBehaviorDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        petIncidentBehaviorDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        petIncidentBehaviorDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        petIncidentBehaviorDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <Table
            config={petIncidentBehaviorListConfig}
            duck={petIncidentBehaviorDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <PetIncidentBehaviorForm/>

        <ModalDelete duckDetail={petIncidentBehaviorDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupPetGeneralIncidentBehaviorIndex
