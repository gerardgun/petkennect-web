import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import CreateFormModal from './create/form/modal'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/service/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import kennelAreaListConfig from '@lib/constants/list-configs/order/service/boarding/kennel/area/service-capacity'

import kennelAreaDuck from '@reducers/order/service/boarding/kennel/area'
import kennelAreaDetailDuck from  '@reducers/order/service/boarding/kennel/area/detail'

const SetupCapacityBoardingAreaIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(kennelAreaDetailDuck.selectors.detail)
  const list = useSelector(kennelAreaDuck.selectors.list)

  useEffect(() => {
    if(list.items.length === 0)
      dispatch(
        kennelAreaDuck.creators.get()
      )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        kennelAreaDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        kennelAreaDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        kennelAreaDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        kennelAreaDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content'>

        <Menu/>

        <Table
          config={kennelAreaListConfig}
          duck={kennelAreaDuck}
          onActionClick={_handleActionClick}
          onRowButtonClick={_handleRowButtonClick}/>

        <CreateFormModal/>

        <ModalDelete duckDetail={kennelAreaDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupCapacityBoardingAreaIndex
