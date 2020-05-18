import  './styles.scss'
import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {  Form, Header, Tab  } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'

import productDetailDuck from '@reducers/product/detail'
import { useDropzone } from 'react-dropzone'
import useModal from '@components/Modal/useModal'
import ProductGallery from './ProductGallery'

import productImageDuck from '@reducers/product/image'
import productImageDetailDuck from '@reducers/product/image/detail'

const MediaSection = props => {
  const {
    productImage,
    productImageDetail,
    getProductImages

  } = props

  const [ open, { _handleOpen, _handleClose } ] = useModal()

  useEffect(()=> {
    getProductImages()
  }, [  ])

  const _handleDrop = useCallback((_acceptedFiles, _rejectedFiles , event) => {
    const images = event.dataTransfer ? event.dataTransfer.files : event.target.files
    props.post({ images })
  }, [])

  const {
    getRootProps,
    getInputProps
  } = useDropzone({ onDrop: _handleDrop, accept: 'image/*' ,multiple: false })

  const _handleDeleteImage = (_image)=> () => {
    props.setItem(_image)
    _handleOpen()
  }

  const _handleUpdate = product_images => {
    props.put({ product_images })
  }

  return (
    <Tab.Pane className='form-primary-segment-tab' loading={productImage.status === 'GETTING' || productImageDetail.status === 'PUTTING'} >
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form className='product-form-gallery'>
        <Header as='h4'>Photo Gallery</Header>
        <div className='gallery'>
          <div {...getRootProps()}  className='gallery_drop-zone'>
            <input {...getInputProps()}/>
            <div>Drag and Drop a Image</div>
          </div>
          <ProductGallery
            items={[ ...productImage.items ].sort((_firstItem,_secondItem)=>_firstItem.order - _secondItem.order)}
            onDelete={_handleDeleteImage} onUpdate={_handleUpdate}/>
        </div>

        <ModalDelete
          duckDetail={productImageDetailDuck}
          onClose={_handleClose}
          open={open}/>
      </Form>
    </Tab.Pane>
  )
}

export default compose(
  connect(
    state => {
      const productImage = productImageDuck.selectors.list(state)

      return {
        productImage,
        productImageDetail: productImageDetailDuck.selectors.detail(state),
        productDetail     : productDetailDuck.selectors.detail(state)
      }
    }
    ,
    {
      getProductImages: productImageDuck.creators.get,
      post            : productImageDetailDuck.creators.post,
      put             : productImageDetailDuck.creators.put,
      setItem         : productImageDetailDuck.creators.setItem
    }
  )
)(MediaSection)

