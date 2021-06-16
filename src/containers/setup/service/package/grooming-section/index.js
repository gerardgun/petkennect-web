import React, { useEffect } from 'react'
import { Segment } from 'semantic-ui-react'
import loadable from '@loadable/component'
import Table from '@components/Table'
import { useDispatch, useSelector } from 'react-redux'

import servicePackageDuck from '@reducers/service/package'
import servicePackageDetailDuck from '@reducers/service/package/detail'
import servicePackageListConfig from '@lib/constants/list-configs/service/package'
import ServicePackageFormModal from '../create/form/modal'

const Layout = loadable(() => import('@components/Common/Layout'))
const Menu = loadable(() => import('../components/Menu'))
const Tab = loadable(() => import('../components/Tab'))

const SetupServicePackageGrooming = ()=>{
  const dispatch = useDispatch()
  const detail = useSelector(servicePackageDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      servicePackageDuck.creators.get({ service__group_id: 4, type: 'P' })
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        servicePackageDuck.creators.get({ service__group_id: 4, type: 'P' })
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        servicePackageDetailDuck.creators.setItem({ service_group: 4 }, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'edit')
      dispatch(
        servicePackageDetailDuck.creators.setItem({ ...reason, service_group: 4 }, 'UPDATE')
      )
    if(button === 'copy')
      return dispatch(
        servicePackageDetailDuck.creators.copy(reason)
      )
  }

  const _handleSearch = (str) => {
    dispatch(
      servicePackageDuck.creators.get({
        search       : str,
        service_group: 4
      })
    )
  }

  return (
    <Layout>
      <Segment className='segment-content'>
        <Menu/>
        <Tab>
          <Table
            config={servicePackageListConfig}
            duck={servicePackageDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}
            onSearch={_handleSearch}/>
        </Tab>
        <ServicePackageFormModal/>
      </Segment>
    </Layout>
  )
}

export default SetupServicePackageGrooming
