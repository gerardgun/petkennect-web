// import  './styles.scss'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {  Form, Header, Tab  } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'

import productDetailDuck from '@reducers/product/detail'
import useModal from '@components/Modal/useModal'

import productImageDuck from '@reducers/product/image'
import productImageDetailDuck from '@reducers/product/image/detail'
import { useParams } from 'react-router-dom'
import Gallery from '@components/Gallery'

const MediaSection = props => {
  const {
    productImage,
    productImageDetail,
    getProductImages

  } = props

  const { id } = useParams()

  const [ open, { _handleOpen, _handleClose } ] = useModal()

  useEffect(()=> {
    if(id)
      getProductImages()
  }, [  ])

  const _handleDeleteImage = (_image)  =>{
    props.setItem(_image)
    _handleOpen()
  }

  const _handleUpdate = product_images => {
    props.put({ product_images })
  }
  const _handleCreate  = (images) => {
    props.post({ images })
  }

  const isUpdating = Boolean(id)

  return (
    <Tab.Pane className='form-primary-segment-tab' loading={productImage.status === 'GETTING' || productImageDetail.status === 'PUTTING'} >
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form>
        <Header as='h4'>Photo Gallery</Header>

        <Gallery
          enableLocal={!isUpdating}
          form='gallery-form'
          items={[ ...productImage.items ].sort((_firstItem,_secondItem)=>_firstItem.order - _secondItem.order)}
          onCreate={_handleCreate} onDelete={_handleDeleteImage}
          onUpdate={_handleUpdate}/>

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

