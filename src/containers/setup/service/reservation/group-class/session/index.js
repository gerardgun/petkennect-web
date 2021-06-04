import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import CreateFormModal from './create/form/modal'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/service/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import serviceVariationGroupClassSessionListConfig from '@lib/constants/list-configs/service/variation/group-class-session'

import serviceVariationReleaseDuck from '@reducers/service/variation/release'
import serviceVariationReleaseDetailDuck from '@reducers/service/variation/release/detail'

const SetupServiceReservationGroupClassSessionIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(serviceVariationReleaseDetailDuck.selectors.detail)
  const list = useSelector(serviceVariationReleaseDuck.selectors.list)

  useEffect(() => {
    if(list.items.length === 0)
      dispatch(
        serviceVariationReleaseDuck.creators.get()
      )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        serviceVariationReleaseDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        serviceVariationReleaseDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleDelete = () => {
    dispatch(
      serviceVariationReleaseDetailDuck.creators.delete(detail.item.id, detail.item.service_variation.id)
    )
      .then(() => {
        dispatch(
          serviceVariationReleaseDetailDuck.creators.resetItem()
        )
      })
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        serviceVariationReleaseDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        serviceVariationReleaseDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content'>

        <Menu/>

        <Table
          config={serviceVariationGroupClassSessionListConfig}
          duck={serviceVariationReleaseDuck}
          onActionClick={_handleActionClick}
          onRowButtonClick={_handleRowButtonClick}/>

        <CreateFormModal/>

        <ModalDelete duckDetail={serviceVariationReleaseDetailDuck} onDelete={_handleDelete}/>

      </Segment>
    </Layout>
  )
}

export default SetupServiceReservationGroupClassSessionIndex
