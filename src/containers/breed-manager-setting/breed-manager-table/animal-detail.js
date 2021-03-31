import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import {  Header, Modal, Grid } from 'semantic-ui-react'
import ModalDelete from '@components/Modal/Delete'
import loadable from '@loadable/component'
import useModal from '@components/Modal/useModal'
import ClientPetBreedDuck from '@reducers/pet/breed-manager-setting/client-pet-breed'
import ClientPetBreedDetailDuck from '@reducers/pet/breed-manager-setting/client-pet-breed/detail'

const Table = loadable(() => import('@components/Table'))

const AnimalDetail = (props) => {
  const {
    clientPetBreedDetail
  } = props
  const [ open, { _handleClose_ } ] = useModal()

  useEffect(() => {
    props.getclientPet()
  }, [])

  const getIsOpened = (mode) => mode === 'CREATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const isOpened = useMemo(() => getIsOpened(clientPetBreedDetail.mode), [
    clientPetBreedDetail.mode
  ])

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='large'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}

        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={4} mobile={10} tablet={4}>
            <Header as='h2'color='teal'>Clients by Breed</Header>
          </Grid.Column >

        </Grid>
        <div className='table-row-padding'>
          <Table duck={ClientPetBreedDuck}/>
        </div>
        <ModalDelete
          duckDetail={ClientPetBreedDuck}
          onClose={_handleClose_}
          open={open}/>

      </Modal.Content>
    </Modal>
  )
}

export default compose(
  connect(
    (state) => {
      const clientPetBreedDetail = ClientPetBreedDetailDuck.selectors.detail(state)

      return {

        clientPetBreedDetail,
        initialValues: { ...clientPetBreedDetail.item }
      }
    },
    {  getclientPet      : ClientPetBreedDuck.creators.get,
      post              : ClientPetBreedDetailDuck.creators.post,
      put               : ClientPetBreedDetailDuck.creators.put,
      resetItem         : ClientPetBreedDetailDuck.creators.resetItem,
      getBreedingDetails: ClientPetBreedDetailDuck.creators.get,
      setItem           : ClientPetBreedDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form              : 'pet-breed-form',
    destroyOnUnmount  : false,
    enableReinitialize: true
  })
)(AnimalDetail)
