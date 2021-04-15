import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import MedicationMeasurementForm from  './create'
import Menu from '@containers/setup/pet/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import Tab from '@containers/setup/pet/medication/components/Tab'
import Table from '@components/Table'
import medicationMeasurementListConfig from '@lib/constants/list-configs/pet/medication-setting/medication-measurement'

import medicationMeasurementDuck from '@reducers/pet/medication-setting/medication-measurement'
import medicationMeasurementDetailDuck from '@reducers/pet/medication-setting/medication-measurement/detail'

const SetupPetMedicationMeasurementIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(medicationMeasurementDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      medicationMeasurementDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        medicationMeasurementDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        medicationMeasurementDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        medicationMeasurementDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        medicationMeasurementDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <p>
            List the measurements for medications.
          </p>
          <Table
            config={medicationMeasurementListConfig}
            duck={medicationMeasurementDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <MedicationMeasurementForm/>

        <ModalDelete duckDetail={medicationMeasurementDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupPetMedicationMeasurementIndex
