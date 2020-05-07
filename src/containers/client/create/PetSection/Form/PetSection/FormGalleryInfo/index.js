import  './styles.scss'
import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {  Form, Header, Tab  } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'

import petImageDuck from '@reducers/pet/image'
import petImageDetailDuck from '@reducers/pet/image/detail'
import petDetailDuck from '@reducers/pet/detail'
import { useDropzone } from 'react-dropzone'
import { useChangeStatusEffect } from '@hooks/Shared'
import useModal from '@components/Modal/useModal'
import PetImage from './PetImage'

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

  useChangeStatusEffect(()=> getPetImages({ pet_id: petDetail.item.id }), petImageDetail.status)

  const _handleDrop = useCallback((_acceptedFiles, _rejectedFiles , event) => {
    const images = event.dataTransfer ? event.dataTransfer.files : event.target.files
    props.post({ pet_id: petDetail.item.id ,images })
  }, [])

  const {
    getRootProps,
    getInputProps
  } = useDropzone({ onDrop: _handleDrop,accept: 'image/*' ,multiple: false })

  const _handleDeleteImage = (_image)=> () => {
    props.setItem(_image)
    _handleOpen()
  }

  const _handleUpdate = (payload) => {
    props.put({ pet_id: petDetail.item.id, ...payload })
  }

  return (
    <Tab.Pane className='form-primary-segment-tab' loading={petImage.status === 'GETTING'} >
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form className='pets-form-gallery'>
        <Header as='h4'>Photo Gallery</Header>
        <div className='gallery'>
          <div {...getRootProps()}  className='gallery_drop-zone'>
            <input {...getInputProps()}/>
            <div>Drag and Drop a Image</div>
          </div>
          {[ ...petImage.items ]
            .sort((_firstImage,_secondImage)=>_firstImage.order - _secondImage.order)
            .map(_image => (
              <PetImage
                image={_image}  key={_image.key}
                onDelete={_handleDeleteImage}
                onUpdate={_handleUpdate}/>
            ))}
        </div>
        <ModalDelete
          duckDetail={petImageDetailDuck}
          onClose={_handleClose}
          open={open}/>
      </Form>
    </Tab.Pane>
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

