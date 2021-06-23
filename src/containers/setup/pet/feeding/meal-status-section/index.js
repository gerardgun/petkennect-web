import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import FoodReportStatusFormModal from  './create'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/pet/components/Menu'
import Tab from '@containers/setup/pet/feeding/components/Tab'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import mealStatusListConfig from '@lib/constants/list-configs/pet/feeding-setting/meal-status'

import foodReportStatusDuck from '@reducers/service/food/report-status'
import foodReportStatusDetailDuck from '@reducers/service/food/report-status/detail'

const SetupPetFeedingMealStatusIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(foodReportStatusDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      foodReportStatusDuck.creators.get({
        ordering: 'name'
      })
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        foodReportStatusDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        foodReportStatusDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        foodReportStatusDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        foodReportStatusDetailDuck.creators.setItem(reason, 'UPDATE')
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
            duck={foodReportStatusDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <FoodReportStatusFormModal/>

        <ModalDelete duckDetail={foodReportStatusDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupPetFeedingMealStatusIndex
