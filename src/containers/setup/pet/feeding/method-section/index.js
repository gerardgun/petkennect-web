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

import feedingMethodDuck from '@reducers/pet/feeding-setting/feeding-method'
import feedingMethodDetailDuck from '@reducers/pet/feeding-setting/feeding-method/detail'

const SetupPetFeedingMethodIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(feedingMethodDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      feedingMethodDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        feedingMethodDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        feedingMethodDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        feedingMethodDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        feedingMethodDetailDuck.creators.setItem(reason, 'UPDATE')
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
            duck={feedingMethodDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <FeedingMethodForm/>

        <ModalDelete duckDetail={feedingMethodDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupPetFeedingMethodIndex
