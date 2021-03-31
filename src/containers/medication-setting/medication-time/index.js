import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Icon } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import MedicationTimeForm from  './form'
import { useChangeStatusEffect } from '@hooks/Shared'

import medicationTimeDuck from '@reducers/pet/medication-setting/medication-time'
import medicationTimeDetailDuck from '@reducers/pet/medication-setting/medication-time/detail'

const MedicationTime = ({ medicationTime, medicationTimeDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getMedicationTimes, medicationTimeDetail.status)

  useEffect(() => {
    props.getMedicationTimes()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(medicationTime.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <>
      <Grid columns={2}>
        <Grid.Column computer={11} mobile={12} tablet={8}>
          <Table
            duck={medicationTimeDuck}
            onOptionClick={_handleOptionClick}
            onRowClick={_handleRowClick}/>
        </Grid.Column>
        <Grid.Column
          computer={4} mobile={4} tablet={4}>
          <Button basic color='teal' onClick={_handleAddBtnClick}><Icon name='plus'></Icon>Time</Button>
        </Grid.Column>
      </Grid>

      <MedicationTimeForm/>
      <ModalDelete
        duckDetail={medicationTimeDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </>
  )
}

export default compose(
  connect(
    state => ({
      medicationTime      : medicationTimeDuck.selectors.list(state),
      medicationTimeDetail: medicationTimeDetailDuck.selectors.detail(state)
    }), {
      getMedicationTimes: medicationTimeDuck.creators.get,
      setItem           : medicationTimeDetailDuck.creators.setItem
    })
)(MedicationTime)
