import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/add-on/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import ServiceFormModal from  './create'
import Tab from '@containers/setup/add-on/general/components/Tab'
import Table from '@components/Table'
import listConfig from '@lib/constants/list-configs/service/add-on-open-line'

import serviceDuck from '@reducers/service'
import serviceDetailDuck from '@reducers/service/detail'

const SetupAddOnGeneralOpenLineIndex = () => {
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
    <Layout>
      <Segment className='segment-content'>
        <Menu/>

        <Tab>
          <Table
            config={listConfig}
            duck={serviceDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <ServiceFormModal/>

        <ModalDelete duckDetail={serviceDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupAddOnGeneralOpenLineIndex
