import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/pet/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import PetVaccinationTypeForm from  './create'
import Tab from '@containers/setup/pet/vaccination/components/Tab'
import Table from '@components/Table'
import petVaccinationTypeListConfig from '@lib/constants/list-configs/pet/vaccination-type'

import petVaccinationTypeDuck from '@reducers/pet/vaccination-type'
import petVaccinationTypeDetailDuck from '@reducers/pet/vaccination-type/detail'

const SetupPetVaccinationTypeIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(petVaccinationTypeDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      petVaccinationTypeDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        petVaccinationTypeDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        petVaccinationTypeDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        petVaccinationTypeDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        petVaccinationTypeDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <Table
            config={petVaccinationTypeListConfig}
            duck={petVaccinationTypeDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <PetVaccinationTypeForm/>

        <ModalDelete duckDetail={petVaccinationTypeDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupPetVaccinationTypeIndex
