import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment, Header } from 'semantic-ui-react'

import CreateFormModal from './create/form/modal'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/pet/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import petKindListConfig from '@lib/constants/list-configs/pet/animal-setting/kind'

import petKindDuck from '@reducers/pet/kind'
import petKindDetailDuck from '@reducers/pet/kind/detail'

const SetupTrainingCommandIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(petKindDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      petKindDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        petKindDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        petKindDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        petKindDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        petKindDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Header as='h4' color='teal'>Animal Species Accepted</Header>

        <div style={{ width: '100%' }}>
          <Table
            config={petKindListConfig}
            duck={petKindDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </div>

        <CreateFormModal/>

        <ModalDelete duckDetail={petKindDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupTrainingCommandIndex
