import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Icon } from 'semantic-ui-react'

import loadable from '@loadable/component'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import FoodTypeForm from  './form'
import { useChangeStatusEffect } from '@hooks/Shared'
import foodTypeListConfig from '@lib/constants/list-configs/pet/feeding-setting/food-type'

import foodTypeDuck from '@reducers/pet/feeding-setting/food-type'
import foodTypeDetailDuck from '@reducers/pet/feeding-setting/food-type/detail'
const ModalDelete = loadable(()=> import('@components/Modal/Delete'))
const FoodType = ({  foodTypeDetail, ...props }) => {
  const [ open, {  _handleClose } ] = useModal()
  useChangeStatusEffect(props.getfoodTypes, foodTypeDetail.status)

  useEffect(() => {
    props.getfoodTypes()
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
          <Table
            config={foodTypeListConfig}
            duck={foodTypeDuck}
            onRowButtonClick={_handleButtonClick}/>
        </Grid.Column>
        <Grid.Column computer={4} mobile={4} tablet={4}>
          <Button basic color='teal' onClick={_handleAddBtnClick}><Icon name='plus'></Icon>Food Type</Button>
        </Grid.Column>
      </Grid>

      <FoodTypeForm/>
      <ModalDelete
        duckDetail={foodTypeDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </>
  )
}

export default compose(
  connect(
    state => ({
      foodType      : foodTypeDuck.selectors.list(state),
      foodTypeDetail: foodTypeDetailDuck.selectors.detail(state)
    }), {
      getfoodTypes: foodTypeDuck.creators.get,
      setItem     : foodTypeDetailDuck.creators.setItem
    })
)(FoodType)
