import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Icon } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import FeedingMethodForm from  './form'
import { useChangeStatusEffect } from '@hooks/Shared'

import feedingMethodDuck from '@reducers/pet/feeding-setting/feeding-method'
import feedingMethodDetailDuck from '@reducers/pet/feeding-setting/feeding-method/detail'

const FeedingMethod = ({ feedingMethod, feedingMethodDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getfeedingMethods, feedingMethodDetail.status)

  useEffect(() => {
    props.getfeedingMethods()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(feedingMethod.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <>
      <Grid columns={2}>
        <Grid.Column computer={11} mobile={12} tablet={8}>
          <Table
            duck={feedingMethodDuck}
            onOptionClick={_handleOptionClick}
            onRowClick={_handleRowClick}/>
        </Grid.Column>
        <Grid.Column
          computer={4} mobile={4} tablet={4}>
          <Button basic color='teal' onClick={_handleAddBtnClick}><Icon name='plus'></Icon>Feeding Method</Button>
        </Grid.Column>
      </Grid>

      <FeedingMethodForm/>
      <ModalDelete
        duckDetail={feedingMethodDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </>
  )
}

export default compose(
  connect(
    state => ({
      feedingMethod      : feedingMethodDuck.selectors.list(state),
      feedingMethodDetail: feedingMethodDetailDuck.selectors.detail(state)
    }), {
      getfeedingMethods: feedingMethodDuck.creators.get,
      setItem          : feedingMethodDetailDuck.creators.setItem
    })
)(FeedingMethod)
