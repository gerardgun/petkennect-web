import  './styles.scss'
import React, { useEffect, useCallback, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {  Form, Header, Divider, Button  } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'

import petDetailDuck from '@reducers/pet/detail'
import { useDropzone } from 'react-dropzone'
import useModal from '@components/Modal/useModal'
// import PetImage from './PetImage'
import PetGallery from './PetGallery'

import petImageDuck from '@reducers/pet/image'
import petImageDetailDuck from '@reducers/pet/image/detail'
import ImageEditor from '@components/Common/ImageEditor'
import { useChangeStatusEffect } from '@hooks/Shared'

const FormInformation = props => {
  const {
    petDetail,
    petImage,
    petImageDetail,
    getPetImages
  } = props

  const [ open, { _handleOpen, _handleClose } ] = useModal()

  const [ openImageEditorModal, setOpenImageEditorModal ] = useState(false)

  const [ initialStep, setInitialStep ] = useState(null)
  const [ initialImageURL, setInitialImageURL ] = useState(null)

  useEffect(()=> {
    getPetImages({ pet_id: petDetail.item.id })
  }, [  ])

  const _handleDrop = useCallback((_acceptedFiles, _rejectedFiles , event) => {
    const images = event.dataTransfer ? event.dataTransfer.files : event.target.files

    if(images && images[0]) {
      setInitialImageURL(URL.createObjectURL(images[0]))
      setInitialStep('EDITOR')
      setOpenImageEditorModal(true)
    }
  }, [])

  useChangeStatusEffect(
    ()=> getPetImages({ pet_id: petDetail.item.id }),
    petImageDetail.status
  )

  const  _handleCloseImageEditorModal = ()=> {
    props.resetItem()
    setOpenImageEditorModal(false)
    setInitialImageURL(null)
    setInitialStep(null)
  }

  const _handleImageEditorSave = (_imageFile) => {
    if(petImageDetail.mode === 'UPDATE')
      return props.put({
        pet_id      : petDetail.item.id ,
        pet_image_id: petImageDetail.item.id,
        image       : _imageFile
      })
        .catch(()=>{})
        .finally(_handleCloseImageEditorModal)

    return props.post({ pet_id: petDetail.item.id ,images: _imageFile })
      .catch(()=>{})
      .finally(_handleCloseImageEditorModal)
  }

  const _handleTakePhotoBtnClick = () => {
    setInitialStep('CAMERA')
    setOpenImageEditorModal(true)
  }

  const _handleUpdate = (item) => ()=> {
    props.setItem(item, 'UPDATE')
    setInitialImageURL(item.filepath)
    setInitialStep('EDITOR')
    setOpenImageEditorModal(true)
  }

  const {
    getRootProps,
    getInputProps
  } = useDropzone({ onDrop: _handleDrop, accept: 'image/*' ,multiple: false })

  const _handleDeleteImage = (_image)=> () => {
    props.setItem(_image)
    _handleOpen()
  }

  const saving = [ 'POSTING', 'PUTTING' ].includes(petDetail.status)

  return (
    <div>
      <div className='flex align-center justify-between ph40 pt40 pb16'>
        <Header className='c-title mv0'>
          Gallery
        </Header>
      </div>
      <Divider className='m0'/>

      <div className='flex justify-end mh40 mt32'>
        <div {...getRootProps()}  >
          <input {...getInputProps()}/>

          <Button
            basic
            color='teal'
            content='Upload' disabled={saving}
            // onClick={_handleCancelBtnClick}
            size='small'/>
        </div>

        <Button
          className='ml16'
          color='teal'
          content='Take Photo'
          disabled={saving}
          loading={saving}
          onClick={_handleTakePhotoBtnClick}
          // eslint-disable-next-line react/jsx-handler-names
          // onClick={_handleSaveBtnClick}
          size='small'/>
      </div>
      <div className='mh40 mv32'>
        <Form className='pets-form-gallery'  loading={petImage.status === 'GETTING' || petImageDetail.status === 'PUTTING'}>
          <PetGallery
            // items={petImage.items}
            items={[ ...petImage.items ]
              .sort((_firstItem,_secondItem)=>  new Date(_secondItem.updated_at) - new Date(_firstItem.updated_at))
            }
            onDelete={_handleDeleteImage} onUpdate={_handleUpdate}/>
          <ModalDelete
            duckDetail={petImageDetailDuck}
            onClose={_handleClose}
            open={open}/>
        </Form>
      </div>
      <ImageEditor
        initialImageURL={initialImageURL}
        initialStep={initialStep}
        key={`${initialStep}${openImageEditorModal}`}
        onClose={_handleCloseImageEditorModal}
        onSaveImage={
          _handleImageEditorSave
        }
        open={openImageEditorModal} pickerImages={petImage.items.map(_petImage=> ({
          ..._petImage,
          url: _petImage.filepath
        }))}/>
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
      setItem     : petImageDetailDuck.creators.setItem,
      resetItem   : petImageDetailDuck.creators.resetItem
    }
  )
)(FormInformation)

