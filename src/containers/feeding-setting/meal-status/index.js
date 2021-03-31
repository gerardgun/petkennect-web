import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Icon } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import MealStatusForm from  './form'
import { useChangeStatusEffect } from '@hooks/Shared'

import mealStatusDuck from '@reducers/pet/feeding-setting/meal-status'
import mealStatusDetailDuck from '@reducers/pet/feeding-setting/meal-status/detail'

const MealStatus = ({ mealStatus, mealStatusDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getmealStatus, mealStatusDetail.status)

  useEffect(() => {
    props.getmealStatus()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(mealStatus.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <>
      <Grid columns={2}>
        <Grid.Column computer={11} mobile={12} tablet={8}>
          <Table
            duck={mealStatusDuck}
            onOptionClick={_handleOptionClick}
            onRowClick={_handleRowClick}/>
        </Grid.Column>
        <Grid.Column computer={4} mobile={4} tablet={4}>
          <Button basic color='teal' onClick={_handleAddBtnClick}><Icon name='plus'></Icon>Meal Status</Button>
        </Grid.Column>
      </Grid>

      <MealStatusForm/>
      <ModalDelete
        duckDetail={mealStatusDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </>
  )
}

export default compose(
  connect(
    state => ({
      mealStatus      : mealStatusDuck.selectors.list(state),
      mealStatusDetail: mealStatusDetailDuck.selectors.detail(state)
    }), {
      getmealStatus: mealStatusDuck.creators.get,
      setItem      : mealStatusDetailDuck.creators.setItem
    })
)(MealStatus)
