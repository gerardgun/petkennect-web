import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import MedicationForm from  './create'
import Menu from '@containers/setup/pet/components/Menu'
import Tab from '@containers/setup/pet/medication/components/Tab'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import medicationListConfig from '@lib/constants/list-configs/pet/medication-setting/medication'

import medicationDuck from '@reducers/pet/medication-setting/medication'
import medicationDetailDuck from '@reducers/pet/medication-setting/medication/detail'

const SetupPetMedicationIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(medicationDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      medicationDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        medicationDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        medicationDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        medicationDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        medicationDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <p>
            Medications added here will populate in the medication type list.
          </p>
          <Table
            config={medicationListConfig}
            duck={medicationDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <MedicationForm/>

        <ModalDelete duckDetail={medicationDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupPetMedicationIndex
