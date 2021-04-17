import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import MedicationTimeForm from  './create'
import Menu from '@containers/setup/pet/components/Menu'
import Tab from '@containers/setup/pet/medication/components/Tab'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import medicationTimeListConfig from '@lib/constants/list-configs/pet/medication-setting/medication-time'

import medicationTimeDuck from '@reducers/pet/medication-setting/medication-time'
import medicationTimeDetailDuck from '@reducers/pet/medication-setting/medication-time/detail'

const SetupPetMedicationTimeIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(medicationTimeDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      medicationTimeDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        medicationTimeDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        medicationTimeDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        medicationTimeDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        medicationTimeDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <p>
            Use the medication schedules based on your facilities operations. If you charge for medication, ensure {'"Charge Applies"'} is enabled.
          </p>
          <Table
            config={medicationTimeListConfig}
            duck={medicationTimeDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <MedicationTimeForm/>

        <ModalDelete duckDetail={medicationTimeDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupPetMedicationTimeIndex
