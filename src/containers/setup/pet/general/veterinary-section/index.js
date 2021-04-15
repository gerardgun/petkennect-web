import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/pet/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import Tab from '@containers/setup/pet/general/components/Tab'
import Table from '@components/Table'
import VeterinarianListForm from  './create'
import veterinarianListConfig from '@lib/constants/list-configs/pet/veterinarian-list'

import veterinarianDuck from '@reducers/pet/veterinarian-list'
import veterinarianDetailDuck from '@reducers/pet/veterinarian-list/detail'

const SetupPetGeneralVeterinaryIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(veterinarianDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      veterinarianDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        veterinarianDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        veterinarianDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        veterinarianDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        veterinarianDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <Table
            config={veterinarianListConfig}
            duck={veterinarianDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <VeterinarianListForm/>

        <ModalDelete duckDetail={veterinarianDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupPetGeneralVeterinaryIndex
