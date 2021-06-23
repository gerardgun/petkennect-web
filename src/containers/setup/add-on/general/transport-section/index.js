import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/add-on/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import SetupTransportAddonServiceSettingFormModal from  './create/form/modal'
import Tab from '@containers/setup/add-on/general/components/Tab'
import Table from '@components/Table'
import transportAddonServiceListConfig from '@lib/constants/list-configs/service/add-on-transport'

import setupTransportServiceSettingDuck from '@reducers/service/addon/general/transport-service'
import setupTransportServiceSettingDetailDuck from '@reducers/service/addon/general/transport-service/detail'

const SetupAddOnGeneralTransportIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(setupTransportServiceSettingDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      setupTransportServiceSettingDuck.creators.get({ service__type: 'T' })
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        setupTransportServiceSettingDuck.creators.get({ service__type: 'T' })
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        setupTransportServiceSettingDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        setupTransportServiceSettingDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        setupTransportServiceSettingDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  const _handleConfirmDelete = () => {
    dispatch(
      setupTransportServiceSettingDetailDuck.creators.delete(detail.item)
    )
      .then(() => {
        dispatch(
          setupTransportServiceSettingDetailDuck.creators.resetItem()
        )
      })
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <Table
            config={transportAddonServiceListConfig}
            duck={setupTransportServiceSettingDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <SetupTransportAddonServiceSettingFormModal/>

        <ModalDelete duckDetail={setupTransportServiceSettingDetailDuck} onDelete={_handleConfirmDelete}/>

      </Segment>
    </Layout>
  )
}

export default SetupAddOnGeneralTransportIndex
