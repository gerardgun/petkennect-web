import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import CreateFormModal from './create/form/modal'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/service/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import kennelAreaListConfig from '@lib/constants/list-configs/service/group'

import serviceGroupDuck from '@reducers/service/group'
import serviceGroupDetailDuck from '@reducers/service/group/detail'

const SetupServiceGroupIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(serviceGroupDetailDuck.selectors.detail)
  const list = useSelector(serviceGroupDuck.selectors.list)

  useEffect(() => {
    if(list.items.length === 0)
      dispatch(
        serviceGroupDuck.creators.get()
      )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        serviceGroupDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        serviceGroupDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        serviceGroupDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        serviceGroupDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content'>

        <Menu/>

        <Table
          config={kennelAreaListConfig}
          duck={serviceGroupDuck}
          onActionClick={_handleActionClick}
          onRowButtonClick={_handleRowButtonClick}/>

        <CreateFormModal/>

        <ModalDelete duckDetail={serviceGroupDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupServiceGroupIndex
