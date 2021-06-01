import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import CreateFormModal from './create/form/modal'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/service/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import serviceVariationBoardingActivityListConfig from '@lib/constants/list-configs/service/variation/boarding-activity'

import serviceVariationDuck from '@reducers/service/variation'
import serviceVariationDetailDuck from '@reducers/service/variation/detail'

const SetupServiceReservationBoardingActivityIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(serviceVariationDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      serviceVariationDuck.creators.get({
        service__type: 'B'
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
          config={serviceVariationBoardingActivityListConfig}
          duck={serviceVariationDuck}
          onActionClick={_handleActionClick}
          onRowButtonClick={_handleRowButtonClick}/>

        <CreateFormModal/>

        <ModalDelete duckDetail={serviceVariationDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupServiceReservationBoardingActivityIndex
