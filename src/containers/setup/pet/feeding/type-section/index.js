import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import FoodTypeForm from  './create'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/pet/components/Menu'
import Tab from '@containers/setup/pet/feeding/components/Tab'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import foodTypeListConfig from '@lib/constants/list-configs/pet/feeding-setting/food-type'

import foodTypeDuck from '@reducers/pet/feeding-setting/food-type'
import foodTypeDetailDuck from '@reducers/pet/feeding-setting/food-type/detail'

const SetupPetFeedingTypeIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(foodTypeDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      foodTypeDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        foodTypeDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        foodTypeDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        foodTypeDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        foodTypeDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <p>
            You can add food types here. You can also select if a charge applies for each type.
          </p>
          <Table
            config={foodTypeListConfig}
            duck={foodTypeDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <FoodTypeForm/>

        <ModalDelete duckDetail={foodTypeDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupPetFeedingTypeIndex
