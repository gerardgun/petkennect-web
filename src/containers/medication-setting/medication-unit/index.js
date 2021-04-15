import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Icon } from 'semantic-ui-react'

import loadable from '@loadable/component'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import MedicationUnitForm from  './form'
import { useChangeStatusEffect } from '@hooks/Shared'
import medicationUnitListConfig from '@lib/constants/list-configs/pet/medication-setting/medication-unit'

import medicationUnitDuck from '@reducers/pet/medication-setting/medication-unit'
import medicationUnitDetailDuck from '@reducers/pet/medication-setting/medication-unit/detail'
const ModalDelete = loadable(()=> import('@components/Modal/Delete'))
const MedicationUnit = ({ medicationUnitDetail, ...props }) => {
  const [ open, { _handleClose } ] = useModal()
  useChangeStatusEffect(props.getMedicationUnits, medicationUnitDetail.status)

  useEffect(() => {
    props.getMedicationUnits()
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
              config={medicationUnitListConfig}
              duck={medicationUnitDuck}
              onRowButtonClick={_handleButtonClick}/>
          </div>
        </Grid.Column>
        <Grid.Column
          computer={5} mobile={4} tablet={4}>
          <Button basic color='teal' onClick={_handleAddBtnClick}><Icon name='plus'></Icon> Add Unit</Button>
        </Grid.Column>
      </Grid>

      <MedicationUnitForm/>
      <ModalDelete
        duckDetail={medicationUnitDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </>
  )
}

export default compose(
  connect(
    state => ({
      medicationUnit      : medicationUnitDuck.selectors.list(state),
      medicationUnitDetail: medicationUnitDetailDuck.selectors.detail(state)
    }), {
      getMedicationUnits: medicationUnitDuck.creators.get,
      setItem           : medicationUnitDetailDuck.creators.setItem
    })
)(MedicationUnit)
