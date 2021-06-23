import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import FeedingTimeForm from  './create'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/pet/components/Menu'
import Tab from '@containers/setup/pet/feeding/components/Tab'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import feedingTimeListConfig from '@lib/constants/list-configs/pet/feeding-setting/feeding-time'

import foodTimeDuck from '@reducers/service/food/time'
import foodTimeDetailDuck from '@reducers/service/food/time/detail'

const SetupPetFeedingTimeIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(foodTimeDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      foodTimeDuck.creators.get({
        ordering: 'name'
      })
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        foodTimeDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        foodTimeDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        foodTimeDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        foodTimeDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <p>
          Use the feeding schedules based on your facilities operations.
          If you charge for a feeding, ensure {'"Charge Applies"'} is enabled.
          </p>
          <Table
            config={feedingTimeListConfig}
            duck={foodTimeDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <FeedingTimeForm/>

        <ModalDelete duckDetail={foodTimeDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupPetFeedingTimeIndex
