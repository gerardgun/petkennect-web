import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/training/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import TrainingMethodCreate from './create'
import trainingMethodListConfig from '@lib/constants/list-configs/training-method'

import trainingMethodDuck from '@reducers/training-method'
import trainingMethodDetailDuck from '@reducers/training-method/detail'

const SetupTrainingMethodIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(trainingMethodDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      trainingMethodDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        trainingMethodDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        trainingMethodDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        trainingMethodDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        trainingMethodDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <div style={{ width: '50%' }}>
          <Table
            config={trainingMethodListConfig}
            duck={trainingMethodDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </div>

        <TrainingMethodCreate/>

        <ModalDelete duckDetail={trainingMethodDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupTrainingMethodIndex
