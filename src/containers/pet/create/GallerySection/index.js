import  './styles.scss'
import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {  Form, Header, Divider  } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'

import petDetailDuck from '@reducers/pet/detail'
import { useDropzone } from 'react-dropzone'
import useModal from '@components/Modal/useModal'
// import PetImage from './PetImage'
import PetGallery from './PetGallery'

import petImageDuck from '@reducers/pet/image'
import petImageDetailDuck from '@reducers/pet/image/detail'

const FormInformation = props => {
  const {
    petDetail,
    petImage,
    petImageDetail,
    getPetImages

  } = props

  const [ open, { _handleOpen, _handleClose } ] = useModal()

  useEffect(()=> {
    getPetImages({ pet_id: petDetail.item.id })
  }, [  ])

  const _handleDrop = useCallback((_acceptedFiles, _rejectedFiles , event) => {
    const images = event.dataTransfer ? event.dataTransfer.files : event.target.files
    props.post({ pet_id: petDetail.item.id ,images })
  }, [])

  const {
    getRootProps,
    getInputProps
  } = useDropzone({ onDrop: _handleDrop, accept: 'image/*' ,multiple: false })

  const _handleDeleteImage = (_image)=> () => {
    props.setItem(_image)
    _handleOpen()
  }

  const _handleUpdate = pet_images => {
    props.put({ pet_id: petDetail.item.id, pet_images })
  }

  return (
    <div>
      <div className='flex align-center justify-between ph40 pt40 pb16'>
        <Header className='c-title mv0'>
          Gallery
        </Header>
      </div>
      <Divider className='m0'/>
      <div className='mh40 mv32'>
        <Form className='pets-form-gallery'  loading={petImage.status === 'GETTING' || petImageDetail.status === 'PUTTING'}>
          <Header as='h4'>Redesign working in progress ...</Header>
          <div className='gallery'>
            <div {...getRootProps()}  className='gallery_drop-zone'>
              <input {...getInputProps()}/>
              <div>Drag and Drop a Image</div>
            </div>
            <PetGallery
              items={[ ...petImage.items ].sort((_firstItem,_secondItem)=>_firstItem.order - _secondItem.order)}
              onDelete={_handleDeleteImage} onUpdate={_handleUpdate}/>
          </div>

          <ModalDelete
            duckDetail={petImageDetailDuck}
            onClose={_handleClose}
            open={open}/>
        </Form>
      </div>
    </div>
  )
}

export default compose(
  connect(
    state => {
      const petImage = petImageDuck.selectors.list(state)

      return {
        petImage,
        petImageDetail: petImageDetailDuck.selectors.detail(state),
        petDetail     : petDetailDuck.selectors.detail(state)
      }
    }
    ,
    {
      getPetImages: petImageDuck.creators.get,
      post        : petImageDetailDuck.creators.post,
      put         : petImageDetailDuck.creators.put,
      setItem     : petImageDetailDuck.creators.setItem
    }
  )
)(FormInformation)

