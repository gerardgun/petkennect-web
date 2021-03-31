import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Icon } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import MedicationUnitForm from  './form'
import { useChangeStatusEffect } from '@hooks/Shared'
import medicationUnitListConfig from '@lib/constants/list-configs/pet/medication-setting/medication-unit'

import medicationUnitDuck from '@reducers/pet/medication-setting/medication-unit'
import medicationUnitDetailDuck from '@reducers/pet/medication-setting/medication-unit/detail'

const MedicationUnit = ({ medicationUnit, medicationUnitDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getMedicationUnits, medicationUnitDetail.status)

  useEffect(() => {
    props.getMedicationUnits()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(medicationUnit.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <>
      <Grid columns={2}>
        <Grid.Column computer={11} mobile={12} tablet={8}>
          <Table
            config={medicationUnitListConfig}
            duck={medicationUnitDuck}
            onOptionClick={_handleOptionClick}
            onRowClick={_handleRowClick}/>
        </Grid.Column>
        <Grid.Column
          computer={4} mobile={4} tablet={4}>
          <Button basic color='teal' onClick={_handleAddBtnClick}><Icon name='plus'></Icon>Unit</Button>
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
