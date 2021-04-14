import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Icon } from 'semantic-ui-react'

import loadable from '@loadable/component'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import MeasurementForm from  './form'
import { useChangeStatusEffect } from '@hooks/Shared'
import feedingMeasurementListConfig from '@lib/constants/list-configs/pet/feeding-setting/feeding-measurement'

import feedingMeasurementDuck from '@reducers/pet/feeding-setting/feeding-measurement'
import feedingMeasurementDetailDuck from '@reducers/pet/feeding-setting/feeding-measurement/detail'
import '../styles.scss'
const ModalDelete = loadable(()=> import('@components/Modal/Delete'))
const FeedingMeasurement = ({  feedingMeasurementDetail, ...props }) => {
  const [ open, {  _handleClose } ] = useModal()
  useChangeStatusEffect(props.getfeedingMeasurements, feedingMeasurementDetail.status)

  useEffect(() => {
    props.getfeedingMeasurements()
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
              config={feedingMeasurementListConfig}
              duck={feedingMeasurementDuck}
              onRowButtonClick={_handleButtonClick}/></div>
        </Grid.Column>
        <Grid.Column
          computer={5} mobile={4} tablet={4}>
          <Button basic color='teal' onClick={_handleAddBtnClick}><Icon name='plus'></Icon> Add Measurement</Button>
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
