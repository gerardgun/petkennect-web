import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Container, Header, Grid, Button } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'
import Gallery from './Gallery'
import { useChangeStatusEffect } from '@hooks/Shared'
import useCameraAvailable from '@hooks/useCameraAvailable'

import petDetailDuck from '@reducers/pet/detail'
import petImageDuck from '@reducers/pet/image'
import petImageDetailDuck from '@reducers/pet/image/detail'

const GallerySection = props => {
  const {
    petDetail,
    petImageDetail
  } = props

  const [ open, { _handleOpen, _handleClose } ] = useModal()
  const { pet: petId } = useParams()
  const cameraIsAvailable = useCameraAvailable()
  useChangeStatusEffect(() => props.getPetImages({ pet_id: petId }), petImageDetail.status, [ 'POSTED', 'PUT' ])

  const _handleDrop = useCallback((_acceptedFiles, _rejectedFiles, event) => {
    const images = event.dataTransfer ? event.dataTransfer.files : event.target.files

    if(images && images[0]) {
      const isImage = new RegExp('image').test(images[0].type)

      props.setItem({
        filepath: images[0],
        filename: images[0].name,
        filetype: isImage ? 'image' : 'video'
      }, 'CREATE')
    }
  }, [])

  const _handleItemClick = (e, { item }) => {
    props.setItem(item, 'READ')
  }

  const _handleTakePhotoBtnClick = () => {
    props.setItem(null, 'TAKE')
  }

  const _handleItemOptionClick = (e, { item, value }) => {
    switch (value) {
      case 'edit':
        props.setItem(item, 'UPDATE')

        return
      case 'delete':
        props.setItem(item, 'DELETE')
        _handleOpen()

        return
    }
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop: _handleDrop, accept: 'image/*, video/*', multiple: false })

  const saving = [ 'POSTING', 'PUTTING' ].includes(petDetail.status)

  return (
    <Container fluid>
      <Grid className='petkennect-profile-body-header' columns={2}>
        <Grid.Column verticalAlign='middle'>
          <Header as='h2'>Gallery</Header>
        </Grid.Column>
        <Grid.Column textAlign='right'>
          <div style={{ display: 'inline-block' }} {...getRootProps()}>
            <input {...getInputProps()}/>
            <Button
              basic
              className='w120' color='teal' content='Upload'
              disabled={saving} loading={saving}/>
          </div>
          {
            cameraIsAvailable && (
              <Button
                color='teal' content='Take Photo'
                disabled={saving} loading={saving} onClick={_handleTakePhotoBtnClick}/>
            )
          }
        </Grid.Column>
      </Grid>

      <div className='mh24 mv32'>
        <Gallery
          duck={petImageDuck}
          onItemClick={_handleItemClick}
          onItemOptionClick={_handleItemOptionClick}/>
      </div>

      <ModalDelete
        duckDetail={petImageDetailDuck}
        onClose={_handleClose}
        open={open}/>
    </Container>
  )
}

export default compose(
  connect(
    state => ({
      petImageDetail: petImageDetailDuck.selectors.detail(state),
      petDetail     : petDetailDuck.selectors.detail(state)
    }),
    {
      getPetImages: petImageDuck.creators.get,
      setItem     : petImageDetailDuck.creators.setItem
    }
  )
)(GallerySection)

