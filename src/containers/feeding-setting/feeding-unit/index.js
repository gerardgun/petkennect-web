import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Icon } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import FeedingunitForm from  './form'
import { useChangeStatusEffect } from '@hooks/Shared'
import feedingUnitListConfig from '@lib/constants/list-configs/pet/feeding-setting/feeding-unit'

import feedingUnitDuck from '@reducers/pet/feeding-setting/feeding-unit'
import feedingUnitDetailDuck from '@reducers/pet/feeding-setting/feeding-unit/detail'

const FeedingUnit = ({ feedingUnit, feedingUnitDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getfeedingUnits, feedingUnitDetail.status)

  useEffect(() => {
    props.getfeedingUnits()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(feedingUnit.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <>
      <Grid columns={2}>
        <Grid.Column computer={11} mobile={12} tablet={8}>
          <Table
            config={feedingUnitListConfig}
            duck={feedingUnitDuck}
            onOptionClick={_handleOptionClick}
            onRowClick={_handleRowClick}/>
        </Grid.Column>
        <Grid.Column computer={4} mobile={4} tablet={4}>
          <Button basic color='teal' onClick={_handleAddBtnClick}><Icon name='plus'></Icon>Feeding Unit</Button>
        </Grid.Column>
      </Grid>

      <FeedingunitForm/>
      <ModalDelete
        duckDetail={feedingUnitDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </>
  )
}

export default compose(
  connect(
    state => ({
      feedingUnit      : feedingUnitDuck.selectors.list(state),
      feedingUnitDetail: feedingUnitDetailDuck.selectors.detail(state)
    }), {
      getfeedingUnits: feedingUnitDuck.creators.get,
      setItem        : feedingUnitDetailDuck.creators.setItem
    })
)(FeedingUnit)
