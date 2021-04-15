import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import MealStatusForm from  './create'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/pet/components/Menu'
import Tab from '@containers/setup/pet/feeding/components/Tab'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import mealStatusListConfig from '@lib/constants/list-configs/pet/feeding-setting/meal-status'

import mealStatusDuck from '@reducers/pet/feeding-setting/meal-status'
import mealStatusDetailDuck from '@reducers/pet/feeding-setting/meal-status/detail'

const SetupPetFeedingMealStatusIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(mealStatusDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      mealStatusDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        mealStatusDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        mealStatusDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        mealStatusDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        mealStatusDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <p>
            This field shows up on your feeding reports and run cards if enabled.
          </p>
          <Table
            config={mealStatusListConfig}
            duck={mealStatusDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <MealStatusForm/>

        <ModalDelete duckDetail={mealStatusDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupPetFeedingMealStatusIndex
