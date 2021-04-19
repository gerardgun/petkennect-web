import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid } from 'semantic-ui-react'

import loadable from '@loadable/component'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import MealStatusForm from  './form'
import { useChangeStatusEffect } from '@hooks/Shared'
import mealStatusListConfig from '@lib/constants/list-configs/pet/feeding-setting/meal-status'

import mealStatusDuck from '@reducers/pet/feeding-setting/meal-status'
import mealStatusDetailDuck from '@reducers/pet/feeding-setting/meal-status/detail'
import '../styles.scss'
const ModalDelete = loadable(()=> import('@components/Modal/Delete'))
const MealStatus = ({  mealStatusDetail, ...props }) => {
  const [ open, {  _handleClose } ] = useModal()
  useChangeStatusEffect(props.getmealStatus, mealStatusDetail.status)

  useEffect(() => {
    props.getmealStatus()
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
      <Grid>
        <Grid.Column computer={11} mobile={12} tablet={8}>
          <div className='menu-item-table'>
            <Table
              config={mealStatusListConfig}
              duck={mealStatusDuck}
              onActionClick={_handleAddBtnClick}
              onRowButtonClick={_handleButtonClick}/></div>
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
