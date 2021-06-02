import React, { useEffect } from 'react'
import { Segment } from 'semantic-ui-react'
import loadable from '@loadable/component'
import Table from '@components/Table'
import { useDispatch } from 'react-redux'

import dayServicesDuck from '@reducers/service/package/day-services'
import serviceDetailDuck from '@reducers/service/detail'
import dayServicesListConfig from '@lib/constants/list-configs/service/package/day-services'
import ServicePackageDayServicesFormModal from './create'

const Layout = loadable(() => import('@components/Common/Layout'))
const Menu = loadable(() => import('../components/Menu'))
const Tab = loadable(() => import('../components/Tab'))

const SetupServicePackageDayServices = ()=>{
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      dayServicesDuck.creators.get('day_services')
    )
  }, [])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        serviceDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'edit')
      dispatch(
        serviceDetailDuck.creators.setItem(reason, 'UPDATE')
      )
    if(button === 'copy') {

      // call to creators.post with reason
    }
  }

  return (
    <Layout>
      <Segment className='segment-content'>
        <Menu/>
        <Tab>
          <Table
            config={dayServicesListConfig}
            duck={dayServicesDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>
        <ServicePackageDayServicesFormModal/>
      </Segment>
    </Layout>
  )
}

export default SetupServicePackageDayServices
