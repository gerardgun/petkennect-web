import React, { useEffect } from 'react'
import { Segment } from 'semantic-ui-react'
import loadable from '@loadable/component'
import Table from '@components/Table'
import { useDispatch } from 'react-redux'

import servicePackageDuck from '@reducers/service/package'
import servicePackageDetailDuck from '@reducers/service/package/detail'
import servicePackageListConfig from '@lib/constants/list-configs/service/package'
import ServicePackageFormModal from '../create/form/modal'
import { parseResponseError } from '@lib/utils/functions'
import serviceGroups from '@lib/constants/serviceGroups'

const Layout = loadable(() => import('@components/Common/Layout'))
const Menu = loadable(() => import('../components/Menu'))
const Tab = loadable(() => import('../components/Tab'))

const SetupServicePackageTraining = ()=>{
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      servicePackageDuck.creators.get({ service_group: serviceGroups.TRAINING })
    )
  }, [])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        servicePackageDetailDuck.creators.setItem({ service_group: serviceGroups.TRAINING }, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'edit')
      dispatch(
        servicePackageDetailDuck.creators.setItem(reason, 'UPDATE')
      )
    if(button === 'copy')
    /*
          return dispatch(servicePackageDetailDuck.creators.post({
            ...reason,
            applies_service_type: reason.applies_service_type.id,
            applies_locations: reason.applies_locations.map(({id}) => id)
          }))
            .catch(parseResponseError)
        */

    /* codigo momentaneo hasta que se implemente los endpoints */
      return dispatch(servicePackageDetailDuck.creators.post(reason))
        .catch(parseResponseError)
  }

  const _handleSearch = (str) => {
    dispatch(
      servicePackageDuck.creators.get({
        search       : str,
        service_group: 5
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

export default SetupServicePackageTraining
