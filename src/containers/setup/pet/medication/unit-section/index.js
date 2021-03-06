import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MedicationUnitForm from  './create'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import medicationUnitListConfig from '@lib/constants/list-configs/pet/medication-setting/medication-unit'

import medicationUnitDuck from '@reducers/pet/medication-setting/medication-unit'
import medicationUnitDetailDuck from '@reducers/pet/medication-setting/medication-unit/detail'

const SetupPetMedicationUnitIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(medicationUnitDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      medicationUnitDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        medicationUnitDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        medicationUnitDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, unit) => {
    if(button === 'delete')
      dispatch(
        medicationUnitDetailDuck.creators.setItem(unit, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        medicationUnitDetailDuck.creators.setItem(unit, 'UPDATE')
      )
  }

  return (
   <>
          <p>
            List the units for medications.
          </p>
          <Table
            config={medicationUnitListConfig}
            duck={medicationUnitDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>


        <MedicationUnitForm/>

        <ModalDelete duckDetail={medicationUnitDetailDuck}/>
   </>
  )
}

export default SetupPetMedicationUnitIndex
