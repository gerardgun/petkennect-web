import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/pet/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import PetInteractionTypeForm from  './create'
import Tab from '@containers/setup/pet/general/components/Tab'
import Table from '@components/Table'
import petInteractionTypeListConfig from '@lib/constants/list-configs/pet/animal-setting/pet-interaction-type'

import petInteractionTypeDuck from '@reducers/pet/interaction-type'
import petInteractionTypeDetailDuck from '@reducers/pet/interaction-type/detail'

const SetupPetGeneralInteractionTypeIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(petInteractionTypeDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      petInteractionTypeDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        petInteractionTypeDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        petInteractionTypeDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        petInteractionTypeDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        petInteractionTypeDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <Table
            config={petInteractionTypeListConfig}
            duck={petInteractionTypeDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <PetInteractionTypeForm/>

        <ModalDelete duckDetail={petInteractionTypeDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupPetGeneralInteractionTypeIndex
