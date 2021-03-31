import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Icon } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import MeasurementForm from  './form'
import { useChangeStatusEffect } from '@hooks/Shared'

import feedingMeasurementDuck from '@reducers/pet/feeding-setting/feeding-measurement'
import feedingMeasurementDetailDuck from '@reducers/pet/feeding-setting/feeding-measurement/detail'

const FeedingMeasurement = ({ feedingMeasurement, feedingMeasurementDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getfeedingMeasurements, feedingMeasurementDetail.status)

  useEffect(() => {
    props.getfeedingMeasurements()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(feedingMeasurement.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <>
      <Grid columns={2}>
        <Grid.Column computer={11} mobile={12} tablet={8}>
          <Table
            duck={feedingMeasurementDuck}
            onOptionClick={_handleOptionClick}
            onRowClick={_handleRowClick}/>
        </Grid.Column>
        <Grid.Column
          computer={4} mobile={4} tablet={4}>
          <Button basic color='teal' onClick={_handleAddBtnClick}><Icon name='plus'></Icon>Measurement</Button>
        </Grid.Column>
      </Grid>

      <MeasurementForm/>
      <ModalDelete
        duckDetail={feedingMeasurementDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </>
  )
}

export default compose(
  connect(
    state => ({
      feedingMeasurement      : feedingMeasurementDuck.selectors.list(state),
      feedingMeasurementDetail: feedingMeasurementDetailDuck.selectors.detail(state)
    }), {
      getfeedingMeasurements: feedingMeasurementDuck.creators.get,
      setItem               : feedingMeasurementDetailDuck.creators.setItem
    })
)(FeedingMeasurement)
