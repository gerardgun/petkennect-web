import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Icon } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import { useChangeStatusEffect } from '@hooks/Shared'
import MedicationTypeForm from  './form'
import medicationTypeListConfig from '@lib/constants/list-configs/pet/medication-setting/medication-type'

import medicationTypeDuck from '@reducers/pet/medication-setting/medication-type'
import medicationTypeDetailDuck from '@reducers/pet/medication-setting/medication-type/detail'

const MedicationType = ({ medicationType, medicationTypeDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getmedicationTypes, medicationTypeDetail.status)

  useEffect(() => {
    props.getmedicationTypes()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(medicationType.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <>
      <Grid columns={2}>
        <Grid.Column computer={11} mobile={12} tablet={8}>
          <Table
            config={medicationTypeListConfig}
            duck={medicationTypeDuck}
            onOptionClick={_handleOptionClick}
            onRowClick={_handleRowClick}/>
        </Grid.Column>
        <Grid.Column computer={4} mobile={4} tablet={4}>
          <Button basic color='teal' onClick={_handleAddBtnClick}><Icon name='plus'></Icon>Type</Button>
        </Grid.Column>
      </Grid>

      <MedicationTypeForm/>
      <ModalDelete
        duckDetail={medicationTypeDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </>
  )
}

export default compose(
  connect(
    state => ({
      medicationType      : medicationTypeDuck.selectors.list(state),
      medicationTypeDetail: medicationTypeDetailDuck.selectors.detail(state)
    }), {
      getmedicationTypes: medicationTypeDuck.creators.get,
      setItem           : medicationTypeDetailDuck.creators.setItem
    })
)(MedicationType)
