import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Header, Segment } from 'semantic-ui-react'
import _times from 'lodash/times'

import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/pet/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import PetBreedForm from  './create'
import Table from '@components/Table'
import petBreedListConfig from '@lib/constants/list-configs/pet/breed'

import petBreedDuck from '@reducers/pet/breed'
import petBreedDetailDuck from '@reducers/pet/breed/detail'

const SetupTrainingCommandIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(petBreedDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      petBreedDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        petBreedDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        petBreedDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        petBreedDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        petBreedDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Header as='h4' color='teal'>Edit Breeds in your facilities</Header>
        <Header as='h4'>
          AKC standard breeds are loaded. Any breed that is mixed is noted with a {'"-X"'}. You can add breeds or edit them here.
        </Header>

        <div className='mv20' style={{ textAlign: 'center' }}>
          {
            _times(26, index => (
              <Header as='h3' color='teal' style={{ display: 'inline-block', marginRight: '1rem', opacity: '0.5' }}>
                {String.fromCharCode(65 + index)}
              </Header>
            ))
          }
        </div>

        <Table
          config={petBreedListConfig}
          duck={petBreedDuck}
          onActionClick={_handleActionClick}
          onRowButtonClick={_handleRowButtonClick}/>

        <PetBreedForm/>

        <ModalDelete duckDetail={petBreedDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupTrainingCommandIndex
