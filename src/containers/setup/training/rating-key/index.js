import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/training/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import RatingkeyForm from './create'
import Table from '@components/Table'
import ratingKeyListConfig from '@lib/constants/list-configs/rating-key'

import ratingKeyDuck from '@reducers/rating-key'
import ratingKeyDetailDuck from '@reducers/rating-key/detail'

const SetupTrainingCommandIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(ratingKeyDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      ratingKeyDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        ratingKeyDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        ratingKeyDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        ratingKeyDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        ratingKeyDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <p>
          Assign ratings to your training commands to track performance and create logs for training.
        </p>

        <div style={{ width: '70%' }}>
          <Table
            config={ratingKeyListConfig}
            duck={ratingKeyDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </div>

        <RatingkeyForm/>

        <ModalDelete duckDetail={ratingKeyDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupTrainingCommandIndex
