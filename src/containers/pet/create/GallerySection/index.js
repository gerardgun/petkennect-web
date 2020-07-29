import  './styles.scss'
import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {  Form, Header, Divider, Button  } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'

import petDetailDuck from '@reducers/pet/detail'
import { useDropzone } from 'react-dropzone'
import useModal from '@components/Modal/useModal'
import PetGallery from './PetGallery'

import petImageDuck from '@reducers/pet/image'
import petImageDetailDuck from '@reducers/pet/image/detail'
import { useChangeStatusEffect } from '@hooks/Shared'

const GallerySection = props => {
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

    if(images && images[0]) {
      const isImage = new RegExp('image').test(images[0].type)
      props.setEditorItem({ filepath: URL.createObjectURL(images[0]), video_file: images[0], type: isImage ? 'image' : 'video' },'EDITOR_CREATE','EDITOR')
    }
  }, [])

  useChangeStatusEffect(
    ()=> getPetImages({ pet_id: petDetail.item.id }),
    petImageDetail.status, [ 'EDITOR_POSTED','EDITOR_PUTED' ]
  )

  const _handleTakePhotoBtnClick = () => {
    props.setEditorItem(null,'EDITOR_CREATE','CAMERA')
  }

  const  _handleOptionSelect =  (item)=> (e, data) => {
    switch (data.value) {
      case 'view_photo':
        props.setEditorItem(item, 'EDITOR_READ','VIEW')

        return
      case 'view_video':
        props.setEditorItem({ ...item, type: 'video' }, 'EDITOR_READ','VIEW')

        return
      case 'edit_photo':
        props.setEditorItem(item, 'EDITOR_UPDATE','EDITOR')

        return

      case 'delete_photo':
        _handleDeleteImage(item)

        return
      case 'delete_video':
        _handleDeleteImage(item)

        return

      default:

        return
    }
  }

  const {
    getRootProps,
    getInputProps
  } = useDropzone({ onDrop: _handleDrop, accept: 'image/*, video/*' ,multiple: false })

  const _handleDeleteImage = (_image)=>{
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
        <div {...getRootProps()}>
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
            items={[ ...petImage.items ]
              .sort((_firstItem,_secondItem)=>  new Date(_secondItem.updated_at) - new Date(_firstItem.updated_at))
            }
            onOptionSelect={_handleOptionSelect}/>
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
      getPetImages : petImageDuck.creators.get,
      post         : petImageDetailDuck.creators.post,
      put          : petImageDetailDuck.creators.put,
      setItem      : petImageDetailDuck.creators.setItem,
      resetItem    : petImageDetailDuck.creators.resetItem,
      setEditorItem: petImageDetailDuck.creators.setEditorItem

    }
  )
)(GallerySection)

