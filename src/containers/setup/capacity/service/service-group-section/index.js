import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/capacity/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import ServiceGroupPetKindFormModal from './create'
import Tab from '@containers/setup/capacity/service/components/Tab'
import Table from '@components/Table'
import serviceGroupPetKindListConfig from '@lib/constants/list-configs/service/group/pet/kind/service-capacity'

import serviceGroupPetKindDuck from '@reducers/service/group/pet/kind'
import serviceGroupPetKindDetailDuck from '@reducers/pet/kind/detail' // wip

const SetupCapacityServiceServiceGroupIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(serviceGroupPetKindDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      serviceGroupPetKindDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        serviceGroupPetKindDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        serviceGroupPetKindDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        serviceGroupPetKindDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <Table
            config={serviceGroupPetKindListConfig}
            duck={serviceGroupPetKindDuck}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <ModalDelete duckDetail={serviceGroupPetKindDetailDuck}/>

        <ServiceGroupPetKindFormModal/>

      </Segment>
    </Layout>
  )
}

export default SetupCapacityServiceServiceGroupIndex
