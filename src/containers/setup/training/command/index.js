import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/training/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import TrainingCommandCreate from './create'
import trainingCommandListConfig from '@lib/constants/list-configs/training-command'

import trainingCommandDuck from '@reducers/training-command'
import trainingCommandDetailDuck from '@reducers/training-command/detail'

const SetupTrainingCommandIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(trainingCommandDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      trainingCommandDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        trainingCommandDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        trainingCommandDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        trainingCommandDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        trainingCommandDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <div style={{ width: '50%' }}>
          <Table
            config={trainingCommandListConfig}
            duck={trainingCommandDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </div>

        <TrainingCommandCreate/>

        <ModalDelete duckDetail={trainingCommandDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupTrainingCommandIndex
