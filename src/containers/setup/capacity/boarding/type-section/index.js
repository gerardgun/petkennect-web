import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import CreateFormModal from './create/form/modal'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/capacity/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import Tab from '@containers/setup/capacity/boarding/components/Tab'
import Table from '@components/Table'
import kennelTypeListConfig from '@lib/constants/list-configs/order/service/boarding/kennel/type/service-capacity'

import kennelTypeDuck from '@reducers/order/service/boarding/kennel/type'
import kennelTypeDetailDuck from  '@reducers/order/service/boarding/kennel/type/detail'

const SetupCapacityBoardingTypeIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(kennelTypeDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      kennelTypeDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        kennelTypeDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        kennelTypeDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        kennelTypeDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        kennelTypeDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content'>
        <Menu/>

        <Tab>
          <Table
            config={kennelTypeListConfig}
            duck={kennelTypeDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <CreateFormModal/>

        <ModalDelete duckDetail={kennelTypeDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupCapacityBoardingTypeIndex
