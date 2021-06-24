import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MedicationForm from  './create'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import medicationListConfig from '@lib/constants/list-configs/pet/medication-setting/medication'

import medicationDuck from '@reducers/pet/medication-setting/medication'
import medicationDetailDuck from '@reducers/pet/medication-setting/medication/detail'

const SetupPetMedicationSectionIndex = () => {
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
    <>
      <p>
        List the units for medications.
      </p>
      <Table
        config={medicationListConfig}
        duck={medicationDuck}
        onActionClick={_handleActionClick}
        onRowButtonClick={_handleRowButtonClick}/>

      <MedicationForm/>

      <ModalDelete duckDetail={medicationDetailDuck}/>

  </>)
}

export default SetupPetMedicationSectionIndex