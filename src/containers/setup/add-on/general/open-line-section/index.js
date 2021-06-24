import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/add-on/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import SetupOpenLineAddonServiceSettingFormModal from  './create/form/modal'
import Tab from '@containers/setup/add-on/general/components/Tab'
import Table from '@components/Table'
import openLineAddonServiceListConfig from '@lib/constants/list-configs/service/add-on-open-line'

import setupOpenLineAddonServiceSettingDuck from '@reducers/service/addon/general/open-line-service'
import setupOpenLineAddonServiceSettingDetailDuck from '@reducers/service/addon/general/open-line-service/detail'

const SetupAddOnGeneralOpenLineIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(setupOpenLineAddonServiceSettingDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      setupOpenLineAddonServiceSettingDuck.creators.get({ service__type: 'O' })
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        setupOpenLineAddonServiceSettingDuck.creators.get({ service__type: 'O' })
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        setupOpenLineAddonServiceSettingDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        setupOpenLineAddonServiceSettingDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        setupOpenLineAddonServiceSettingDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  const _handleConfirmDelete = () => {
    dispatch(
      setupOpenLineAddonServiceSettingDetailDuck.creators.delete(detail.item)
    )
      .then(() => {
        dispatch(
          setupOpenLineAddonServiceSettingDetailDuck.creators.resetItem()
        )
      })
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <Table
            config={openLineAddonServiceListConfig}
            duck={setupOpenLineAddonServiceSettingDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <SetupOpenLineAddonServiceSettingFormModal/>

        <ModalDelete duckDetail={setupOpenLineAddonServiceSettingDetailDuck} onDelete={_handleConfirmDelete}/>

      </Segment>
    </Layout>
  )
}

export default SetupAddOnGeneralOpenLineIndex
