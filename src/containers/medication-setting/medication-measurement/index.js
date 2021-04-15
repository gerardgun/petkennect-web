import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Icon } from 'semantic-ui-react'

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
      <Grid columns={2}>
        <Grid.Column computer={11} mobile={12} tablet={8}>
          <div className='menu-item-table'>
            <Table
              config={medicationMeasurementListConfig}
              duck={medicationMeasurementDuck}
              onRowButtonClick={_handleButtonClick}/>
          </div>
        </Grid.Column>
        <Grid.Column computer={5} mobile={4} tablet={4}>
          <Button basic color='teal' onClick={_handleAddBtnClick}><Icon name='plus'></Icon> Add Measurement</Button>
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
