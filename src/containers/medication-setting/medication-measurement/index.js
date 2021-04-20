import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid } from 'semantic-ui-react'

import loadable from '@loadable/component'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import MedicationMeasurementForm from  './form'
import { useChangeStatusEffect } from '@hooks/Shared'
import medicationMeasurementListConfig from '@lib/constants/list-configs/pet/medication-setting/medication-measurement'

import medicationMeasurementDuck from '@reducers/pet/medication-setting/medication-measurement'
import medicationMeasurementDetailDuck from '@reducers/pet/medication-setting/medication-measurement/detail'
const ModalDelete = loadable(()=> import('@components/Modal/Delete'))
const MedicationMeasurement = ({  medicationMeasurementDetail, ...props }) => {
  const [ open, {  _handleClose } ] = useModal()
  useChangeStatusEffect(props.getMedicationMeasurements, medicationMeasurementDetail.status)

  useEffect(() => {
    props.getMedicationMeasurements()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleButtonClick = (button,item) =>{
    switch (button) {
      case 'edit': props.setItem(item,'UPDATE')
        break
      case 'delete' : props.setItem(item,'DELETE')
    }
  }

  return (
    <>
      <Grid>
        <Grid.Column computer={11} mobile={12} tablet={8}>
          <div className='menu-item-table'>
            <Table
              config={medicationMeasurementListConfig}
              duck={medicationMeasurementDuck}
              onActionClick={_handleAddBtnClick}
              onRowButtonClick={_handleButtonClick}/>
          </div>
        </Grid.Column>
      </Grid>

      <MedicationMeasurementForm/>
      <ModalDelete
        duckDetail={medicationMeasurementDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </>
  )
}

export default compose(
  connect(
    state => ({
      medicationMeasurement      : medicationMeasurementDuck.selectors.list(state),
      medicationMeasurementDetail: medicationMeasurementDetailDuck.selectors.detail(state)
    }), {
      getMedicationMeasurements: medicationMeasurementDuck.creators.get,
      setItem                  : medicationMeasurementDetailDuck.creators.setItem
    })
)(MedicationMeasurement)
