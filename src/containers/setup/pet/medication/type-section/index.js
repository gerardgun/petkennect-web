import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import MedicationTypeForm from './create'
import Menu from '@containers/setup/pet/components/Menu'
import Tab from '@containers/setup/pet/medication/components/Tab'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import medicationTypeListConfig from '@lib/constants/list-configs/pet/medication-setting/medication-type'

import medicationTypeDuck from '@reducers/pet/medication-setting/medication-type'
import medicationTypeDetailDuck from '@reducers/pet/medication-setting/medication-type/detail'

const SetupPetMedicationTypeIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(medicationTypeDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      medicationTypeDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        medicationTypeDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        medicationTypeDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, unit) => {
    if(button === 'delete')
      dispatch(
        medicationTypeDetailDuck.creators.setItem(unit, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        medicationTypeDetailDuck.creators.setItem(unit, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <p>
            You can charge for types of medication here, ensure charge applies is enabled and price is input.
          </p>
          <Table
            config={medicationTypeListConfig}
            duck={medicationTypeDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <MedicationTypeForm/>

        <ModalDelete duckDetail={medicationTypeDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupPetMedicationTypeIndex
