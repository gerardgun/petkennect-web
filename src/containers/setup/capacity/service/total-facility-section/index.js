import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/capacity/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import PetKindFormModal from './create'
import Tab from '@containers/setup/capacity/service/components/Tab'
import Table from '@components/Table'
import petKindServiceCapacityListConfig from '@lib/constants/list-configs/pet/kind/service-capacity'

import petKindDuck from '@reducers/pet/kind'
import petKindDetailDuck from '@reducers/pet/kind/detail'

const SetupCapacityServiceTotalFacilityIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(petKindDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      petKindDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        petKindDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        petKindDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        petKindDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <Table
            config={petKindServiceCapacityListConfig}
            duck={petKindDuck}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <PetKindFormModal/>
        <ModalDelete duckDetail={petKindDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupCapacityServiceTotalFacilityIndex
