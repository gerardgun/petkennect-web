import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/add-on/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import SetupAddonServiceSettingFormModal from  './create/form/modal'
import Tab from '@containers/setup/add-on/general/components/Tab'
import Table from '@components/Table'
import addonServiceListConfig from '@lib/constants/list-configs/service/add-on'

import setupAddonServiceSettingDuck from '@reducers/service/addon/general/add-on-service'
import setupAddonServiceSettingDetailDuck from '@reducers/service/addon/general/add-on-service/detail'

const SetupAddOnGeneralAddOnIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(setupAddonServiceSettingDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      setupAddonServiceSettingDuck.creators.get({ service__type: 'A' })
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        setupAddonServiceSettingDuck.creators.get({ service__type: 'A' })
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        setupAddonServiceSettingDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        setupAddonServiceSettingDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        setupAddonServiceSettingDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  const _handleConfirmDelete = () => {
    dispatch(
      setupAddonServiceSettingDetailDuck.creators.delete(detail.item)
    )
      .then(() => {
        dispatch(
          setupAddonServiceSettingDetailDuck.creators.resetItem()
        )
      })
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <Table
            config={addonServiceListConfig}
            duck={setupAddonServiceSettingDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <SetupAddonServiceSettingFormModal/>

        <ModalDelete duckDetail={setupAddonServiceSettingDetailDuck} onDelete={_handleConfirmDelete}/>

      </Segment>
    </Layout>
  )
}

export default SetupAddOnGeneralAddOnIndex
