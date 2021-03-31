import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Icon } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import MedicationForm from  './form'
import { useChangeStatusEffect } from '@hooks/Shared'

import medicationDuck from '@reducers/pet/medication-setting/medication'
import medicationDetailDuck from '@reducers/pet/medication-setting/medication/detail'

const Medication = ({ medication, medicationDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getMedications, medicationDetail.status)

  useEffect(() => {
    props.getMedications()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(medication.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <>
      <Grid columns={2}>
        <Grid.Column computer={11} mobile={12} tablet={8}>
          <Table
            duck={medicationDuck}
            onOptionClick={_handleOptionClick}
            onRowClick={_handleRowClick}/>
        </Grid.Column>
        <Grid.Column computer={4} mobile={4} tablet={4}>
          <Button basic color='teal' onClick={_handleAddBtnClick}><Icon name='plus'></Icon>Medication</Button>
        </Grid.Column>
      </Grid>

      <MedicationForm/>
      <ModalDelete
        duckDetail={medicationDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </>
  )
}

export default compose(
  connect(
    state => ({
      medication      : medicationDuck.selectors.list(state),
      medicationDetail: medicationDetailDuck.selectors.detail(state)
    }), {
      getMedications: medicationDuck.creators.get,
      setItem       : medicationDetailDuck.creators.setItem
    })
)(Medication)
