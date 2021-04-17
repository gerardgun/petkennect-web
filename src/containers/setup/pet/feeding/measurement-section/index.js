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

import feedingMeasurementDuck from '@reducers/pet/feeding-setting/feeding-measurement'
import feedingMeasurementDetailDuck from '@reducers/pet/feeding-setting/feeding-measurement/detail'

const SetupPetFeedingMeasurementIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(feedingMeasurementDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      feedingMeasurementDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        feedingMeasurementDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        feedingMeasurementDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        feedingMeasurementDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        feedingMeasurementDetailDuck.creators.setItem(reason, 'UPDATE')
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
            duck={feedingMeasurementDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <MeasurementForm/>

        <ModalDelete duckDetail={feedingMeasurementDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupPetFeedingMeasurementIndex
