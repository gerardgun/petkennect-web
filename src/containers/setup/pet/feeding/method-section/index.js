import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import FeedingMethodForm from  './create'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/pet/components/Menu'
import Tab from '@containers/setup/pet/feeding/components/Tab'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import feedingMethodListConfig from '@lib/constants/list-configs/pet/feeding-setting/feeding-method'

import foodMethodDuck from '@reducers/service/food/method'
import foodMethodDetailDuck from '@reducers/service/food/method/detail'

const SetupPetFeedingMethodIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(foodMethodDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      foodMethodDuck.creators.get({
        ordering: 'name'
      })
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        foodMethodDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        foodMethodDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        foodMethodDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        foodMethodDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <p>
            List methods of feeding here:
          </p>
          <Table
            config={feedingMethodListConfig}
            duck={foodMethodDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <FeedingMethodForm/>

        <ModalDelete duckDetail={foodMethodDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupPetFeedingMethodIndex
