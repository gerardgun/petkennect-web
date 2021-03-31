import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Icon } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import FeedingTimeForm from  './form'
import { useChangeStatusEffect } from '@hooks/Shared'
import feedingTimeListConfig from '@lib/constants/list-configs/pet/feeding-setting/feeding-time'

import feedingTimeDuck from '@reducers/pet/feeding-setting/feeding-time'
import feedingTimeDetailDuck from '@reducers/pet/feeding-setting/feeding-time/detail'

const FeedingTimes = ({ feedingTime, feedingTimeDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getfeedingTimes, feedingTimeDetail.status)

  useEffect(() => {
    props.getfeedingTimes()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(feedingTime.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <>
      <Grid columns={2}>
        <Grid.Column computer={11} mobile={12} tablet={8}>
          <Table
            config={feedingTimeListConfig}
            duck={feedingTimeDuck}
            onOptionClick={_handleOptionClick}
            onRowClick={_handleRowClick}/>
        </Grid.Column>
        <Grid.Column computer={4} mobile={4} tablet={4}>
          <Button basic color='teal' onClick={_handleAddBtnClick}><Icon name='plus'></Icon>Meal Time</Button>
        </Grid.Column>
      </Grid>

      <FeedingTimeForm/>
      <ModalDelete
        duckDetail={feedingTimeDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </>
  )
}

export default compose(
  connect(
    state => ({
      feedingTime      : feedingTimeDuck.selectors.list(state),
      feedingTimeDetail: feedingTimeDetailDuck.selectors.detail(state)
    }), {
      getfeedingTimes: feedingTimeDuck.creators.get,
      setItem        : feedingTimeDetailDuck.creators.setItem
    })
)(FeedingTimes)
