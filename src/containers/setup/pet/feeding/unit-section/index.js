import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import FeedingUnitForm from  './create'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/pet/components/Menu'
import Tab from '@containers/setup/pet/feeding/components/Tab'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import feedingUnitListConfig from '@lib/constants/list-configs/pet/feeding-setting/feeding-unit'

import feedingUnitDuck from '@reducers/pet/feeding-setting/feeding-unit'
import feedingUnitDetailDuck from '@reducers/pet/feeding-setting/feeding-unit/detail'

const SetupPetFeedingUnitIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(feedingUnitDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      feedingUnitDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        feedingUnitDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        feedingUnitDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        feedingUnitDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        feedingUnitDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <p>
            List the units for feeding.
          </p>
          <Table
            config={feedingUnitListConfig}
            duck={feedingUnitDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <FeedingUnitForm/>

        <ModalDelete duckDetail={feedingUnitDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupPetFeedingUnitIndex
