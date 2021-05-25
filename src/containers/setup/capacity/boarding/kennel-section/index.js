import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import KennelFormModal from './create'
import KennelBulkFormModal from './create-bulk'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/capacity/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import Tab from '@containers/setup/capacity/boarding/components/Tab'
import Table from '@components/Table'
import kennelListConfig from '@lib/constants/list-configs/order/service/boarding/kennel/service-capacity'

import kennelDuck from '@reducers/order/service/boarding/kennel'
import kennelDetailDuck from  '@reducers/order/service/boarding/kennel/detail'

const SetupCapacityBoardingKennelIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(kennelDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      kennelDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        kennelDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        kennelDetailDuck.creators.setItem(null, 'CREATE')
      )
    else if(action === 'bulk')
      dispatch(
        kennelDetailDuck.creators.setItem(null, 'CREATE_BULK')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        kennelDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        kennelDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <Table
            config={kennelListConfig}
            duck={kennelDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <KennelFormModal/>
        <KennelBulkFormModal/>

        <ModalDelete duckDetail={kennelDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupCapacityBoardingKennelIndex
