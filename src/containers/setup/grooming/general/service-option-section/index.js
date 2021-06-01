import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Menu from '@containers/settings/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import ServiceFormModal from  './create'
import Tab from '@containers/setup/grooming/general/components/Tab'
import Table from '@components/Table'
import serviceListConfig from '@lib/constants/list-configs/service/grooming-service-option'

import serviceDuck from '@reducers/service'
import serviceDetailDuck from '@reducers/service/detail'

const SetupGroomingGeneralServiceOptionIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(serviceDetailDuck.selectors.detail)

  useEffect(() => {
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
      <Segment className='segment-content' padded='very'>
          <Table
            config={serviceListConfig}
            duck={serviceDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>

        <ServiceFormModal/>

        <ModalDelete duckDetail={serviceDetailDuck}/>

      </Segment>
  )
}

export default SetupGroomingGeneralServiceOptionIndex
