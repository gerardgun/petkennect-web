import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import CreateFormModal from './create/form/modal'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/service/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import serviceVariationGroupClassListConfig from '@lib/constants/list-configs/service/variation/group-class'

import serviceDuck from '@reducers/service'
import serviceDetailDuck from '@reducers/service/detail'

const SetupServiceReservationGroupClassIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(serviceDetailDuck.selectors.detail)
  const list = useSelector(serviceDuck.selectors.list)

  useEffect(() => {
    if(list.items.length === 0)
      dispatch(
        serviceDuck.creators.get()
      )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        serviceDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        serviceDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        serviceDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        serviceDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content'>

        <Menu/>

        <Table
          config={serviceVariationGroupClassListConfig}
          duck={serviceDuck}
          onActionClick={_handleActionClick}
          onRowButtonClick={_handleRowButtonClick}/>

        <CreateFormModal/>

        <ModalDelete duckDetail={serviceDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupServiceReservationGroupClassIndex
