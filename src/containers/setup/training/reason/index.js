import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/training/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import TrainingReasonCreate from '@containers/setup/training/reason/create'
import trainingReasonListConfig from '@lib/constants/list-configs/training-reason'

import trainingReasonDuck from '@reducers/training-reason'
import trainingReasonDetailDuck from '@reducers/training-reason/detail'

const SetupTrainingReasonIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(trainingReasonDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      trainingReasonDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        trainingReasonDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        trainingReasonDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        trainingReasonDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        trainingReasonDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <div style={{ width: '50%' }}>
          <Table
            config={trainingReasonListConfig}
            duck={trainingReasonDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </div>

        <TrainingReasonCreate/>

        <ModalDelete duckDetail={trainingReasonDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupTrainingReasonIndex
