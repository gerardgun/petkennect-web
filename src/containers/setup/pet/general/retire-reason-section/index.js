import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/pet/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import PetRetireReasonForm from  './create'
import Tab from '@containers/setup/pet/general/components/Tab'
import Table from '@components/Table'
import petRetireReasonListConfig from '@lib/constants/list-configs/pet/animal-setting/retire-reason'

import petRetireReasonDuck from '@reducers/pet/retire-reason'
import petRetireReasonDetailDuck from '@reducers/pet/retire-reason/detail'

const SetupPetGeneralRetireReasonIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(petRetireReasonDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      petRetireReasonDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        petRetireReasonDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        petRetireReasonDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        petRetireReasonDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        petRetireReasonDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <Table
            config={petRetireReasonListConfig}
            duck={petRetireReasonDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <PetRetireReasonForm/>

        <ModalDelete duckDetail={petRetireReasonDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupPetGeneralRetireReasonIndex
