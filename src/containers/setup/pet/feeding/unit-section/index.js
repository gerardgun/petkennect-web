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

import foodUnitDuck from '@reducers/service/food/unit'
import foodUnitDetailDuck from '@reducers/service/food/unit/detail'

const SetupPetFeedingUnitIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(foodUnitDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      foodUnitDuck.creators.get({
        ordering: 'name'
      })
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        foodUnitDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        foodUnitDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        foodUnitDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        foodUnitDetailDuck.creators.setItem(reason, 'UPDATE')
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
            duck={foodUnitDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <FeedingUnitForm/>

        <ModalDelete duckDetail={foodUnitDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupPetFeedingUnitIndex
