import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/boarding/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import CreateFormModal from './create/form/modal'
import Tab from '@containers/setup/boarding/general/components/Tab'
import Table from '@components/Table'
import belongingAreaListConfig from '@lib/constants/list-configs/order/service/boarding/belonging-area/capacity'

import kennelAreaDuck from '@reducers/order/service/boarding/kennel/area'
import kennelAreaDetailDuck from  '@reducers/order/service/boarding/kennel/area/detail'

const SetupBoardingGeneralBelongingIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(kennelAreaDetailDuck.selectors.detail)

  useEffect(() => {
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
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <Table
            config={belongingAreaListConfig}
            duck={kennelAreaDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <CreateFormModal/>

        <ModalDelete duckDetail={kennelAreaDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupBoardingGeneralBelongingIndex
