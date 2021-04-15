import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/pet/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import PetIncidentTypeForm from  './create'
import Tab from '@containers/setup/pet/general/components/Tab'
import Table from '@components/Table'
import petIncidentTypeListConfig from '@lib/constants/list-configs/pet/animal-setting/incident-type'

import petIncidentTypeDuck from '@reducers/pet/incident-type'
import petIncidentTypeDetailDuck from '@reducers/pet/incident-type/detail'

const SetupPetGeneralIncidentTypeIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(petIncidentTypeDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      petIncidentTypeDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        petIncidentTypeDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        petIncidentTypeDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        petIncidentTypeDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        petIncidentTypeDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <Table
            config={petIncidentTypeListConfig}
            duck={petIncidentTypeDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <PetIncidentTypeForm/>

        <ModalDelete duckDetail={petIncidentTypeDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupPetGeneralIncidentTypeIndex
