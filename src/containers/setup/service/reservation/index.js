import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import CreateFormModal from './create/form/modal'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/service/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import serviceVariationListConfig from '@lib/constants/list-configs/service/variation'

import serviceVariationDuck from '@reducers/service/variation'
import serviceVariationDetailDuck from '@reducers/service/variation/detail'

const SetupServiceReservationIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(serviceVariationDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      serviceVariationDuck.creators.get({
        service__type: 'C',
        type         : 'A,R'
      })
    )

    return () => {
      dispatch(
        serviceVariationDuck.creators.reset()
      )
    }
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        serviceVariationDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        serviceVariationDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleDelete = () => {
    dispatch(
      serviceVariationDetailDuck.creators.delete(detail.item.id, detail.item.service.id)
    )
      .then(() => {
        dispatch(
          serviceVariationDetailDuck.creators.resetItem()
        )
      })
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        serviceVariationDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        serviceVariationDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content'>

        <Menu/>

        <Table
          config={serviceVariationListConfig}
          duck={serviceVariationDuck}
          onActionClick={_handleActionClick}
          onRowButtonClick={_handleRowButtonClick}/>

        <CreateFormModal/>

        <ModalDelete duckDetail={serviceVariationDetailDuck} onDelete={_handleDelete}/>

      </Segment>
    </Layout>
  )
}

export default SetupServiceReservationIndex
