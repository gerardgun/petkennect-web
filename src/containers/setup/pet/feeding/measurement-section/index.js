import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/pet/components/Menu'
import Tab from '@containers/setup/pet/feeding/components/Tab'
import MeasurementForm from  './create'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import feedingMeasurementListConfig from '@lib/constants/list-configs/pet/feeding-setting/feeding-measurement'

import foodMeasurementDuck from '@reducers/service/food/measurement'
import foodMeasurementDetailDuck from '@reducers/service/food/measurement/detail'

const SetupPetFeedingMeasurementIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(foodMeasurementDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      foodMeasurementDuck.creators.get({
        ordering: 'value'
      })
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        foodMeasurementDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        foodMeasurementDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        foodMeasurementDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        foodMeasurementDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <p>
            List the measurements for feeding.
          </p>
          <Table
            config={feedingMeasurementListConfig}
            duck={foodMeasurementDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <MeasurementForm/>

        <ModalDelete duckDetail={foodMeasurementDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupPetFeedingMeasurementIndex
