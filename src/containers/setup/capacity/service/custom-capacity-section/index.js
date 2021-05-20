import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Header, Segment } from 'semantic-ui-react'

import CreateFormModal from './create/form/modal'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/capacity/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import Tab from '@containers/setup/capacity/service/components/Tab'
import Table from '@components/Table'
import setupCapacityServiceCustomListConfig from '@lib/constants/list-configs/setup/capacity/service/custom'

import setupCapacityServiceCustomDuck from '@reducers/setup/capacity/service/custom'
import setupCapacityServiceCustomDetailDuck from '@reducers/setup/capacity/service/custom/detail'

const SetupCapacityCustomCapacityIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(setupCapacityServiceCustomDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      setupCapacityServiceCustomDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        setupCapacityServiceCustomDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        setupCapacityServiceCustomDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        setupCapacityServiceCustomDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        setupCapacityServiceCustomDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <Header as='h4' color='teal'>
            Custom Capacity Settings By Date
            <Header.Subheader>
              This will override normal business settings for dates specified.
            </Header.Subheader>
          </Header>
          <p>
            Use this section for custom temporary capacity restraints on services. This can be useful for situations such <br/>
            as Covid restrictions, remodeling, etc. Tip: If canceling a service for a specified time, input a capacity of zero.
          </p>

          <Table
            config={setupCapacityServiceCustomListConfig}
            duck={setupCapacityServiceCustomDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <CreateFormModal/>

        <ModalDelete duckDetail={setupCapacityServiceCustomDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupCapacityCustomCapacityIndex
