import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import PetKindSizeForm from './create'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/capacity/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import Tab from '@containers/setup/capacity/service/components/Tab'
import Table from '@components/Table'
import petKindSizeListConfig from '@lib/constants/list-configs/pet/kind/size/service-capacity'

import petKindSizeDuck from '@reducers/pet/kind/size'
import petKindSizeDetailDuck from  '@reducers/pet/kind/size/detail'

const SetupCapacityServiceYardCapacityIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(petKindSizeDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      petKindSizeDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        petKindSizeDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        petKindSizeDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        petKindSizeDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        petKindSizeDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <Table
            config={petKindSizeListConfig}
            duck={petKindSizeDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <PetKindSizeForm/>

        <ModalDelete duckDetail={petKindSizeDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupCapacityServiceYardCapacityIndex
