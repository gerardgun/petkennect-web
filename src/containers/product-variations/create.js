import React, { useMemo, useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Grid, Input, Checkbox, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import ModalDelete from '@components/Modal/Delete'
import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'

import { parseResponseError, syncValidate } from '@lib/utils/functions'

import productVariationsImageDetailDuck from '@reducers/product/product-variations/image/detail'
import productVariationsDetailDuck from '@reducers/product/product-variations/detail'

import './styles.scss'

const ProductVariationsCreateForm = (props) => {
  const {
    productVariationsImageDetail,
    productVariationsDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  useEffect(() => {
    if(productVariationsDetail.mode === 'UPDATE')
      props.getProductVariationsImage()
  }, [ productVariationsDetail.mode ])

  useEffect(() => {
    if(productVariationsImageDetail.status === 'DELETED')
      props.getProductVariationsImage()
  }, [ productVariationsImageDetail.status ])

  const _handleImageReload = () =>{
    props.getProductVariationsImage()
  }

  const _handleClose = () =>{
    props.reset()
    props.resetItem()
  }

  const _handleImageDelete = e =>{
    const itemID = e.currentTarget.attributes.itemID.nodeValue
    const selectedImageData = productVariationsImageDetail.item.filter(_ => _.id == itemID)[0]

    props.setItem(selectedImageData, 'DELETE')
  }

  const _handleDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const values = {
        image   : file,
        filename: file.name
      }

      return props.post({ ...values })
        .then(_handleImageReload)
        .catch(parseResponseError)
    })
  }, [])

  const _handleSubmit = values => {
    if(isUpdating)
      return props.put({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(productVariationsDetail.mode), [ productVariationsDetail.mode ])
  const isUpdating = Boolean(productVariationsDetail.item.id)

  const { getRootProps, getInputProps } = useDropzone({ onDrop: _handleDrop, multiple: true })

  return (
    <>
      <Modal
        className='form-modal'
        onClose={_handleClose}
        open={isOpened}
        size='small'>
        <Modal.Content>
          {/* eslint-disable-next-line react/jsx-handler-names */}
          <Form className='product-variations-form' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
            <Header as='h2' className='segment-content-header'>{isUpdating ? 'Update' : 'Add'} Product Variation</Header>
            <Field component='input' name='id' type='hidden'/>
            <Field component='input' name='product' type='hidden'/>
            <Header as='h6' className='section-header' color='blue'>Basic Information</Header>
            <Grid>
              <Grid.Column computer={13} mobile={10} tablet={13}>
                <Form.Group widths='equal'>
                  <Field
                    component={FormField}
                    control={Input}
                    label='SKU'
                    name='sku_id'
                    required
                    type='text'/>
                </Form.Group> </Grid.Column>
              <Grid.Column computer={3} mobile={6} tablet={3}>
                <Form.Group widths='equal'>
                  <Field
                    component={FormField}
                    control={Checkbox}
                    label='Active'
                    name='is_active'
                    type='checkbox'/>
                </Form.Group>
              </Grid.Column>
            </Grid>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Input}
                label='Price'
                name='price'
                placeholder='00.00'
                required
                type='number'/>
              <Field
                component={FormField}
                control={Input}
                label='Stock'
                name='stock'
                required
                type='number'/>
            </Form.Group>
            <Header as='h6' className='section-header' color='blue'>IMAGES</Header>
            <div {...getRootProps()}  className='document-upload-choose-file mb16'>
              <input {...getInputProps()}/>
              <i className='cloud upload icon mb8'></i><br/>
              <span>Drop Images</span>
            </div>

            <div className='image-container'>
              <div>
                <div className='ui tiny images'>
                  {
                    productVariationsImageDetail.item.length > 0 && productVariationsImageDetail.item.map((item)=>(
                      <div className='ui image' key={item.id}>
                        <img className='ui image' src={item.filepath}/>
                        <i className='close icon' itemID={item.id} onClick={_handleImageDelete}></i>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
            {
              error && (
                <Form.Group widths='equal'>
                  <Form.Field>
                    <FormError message={error}/>
                  </Form.Field>
                </Form.Group>
              )
            }

            <Form.Group className='form-modal-actions' widths='equal'>
              <Form.Field>
                <Button
                  content='Cancel'
                  disabled={submitting}
                  onClick={_handleClose}
                  type='button'/>
                <Button
                  color='teal'
                  content={isUpdating ? 'Save changes' : 'Save'}
                  disabled={submitting}
                  loading={submitting}/>
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
      </Modal>
      <ModalDelete duckDetail={productVariationsImageDetailDuck}/>
    </>
  )
}

export default compose(
  withRouter,
  connect(
    state => {
      const productVariationsDetail = productVariationsDetailDuck.selectors.detail(state)

      return {
        productVariationsDetail,
        productVariationsImageDetail: productVariationsImageDetailDuck.selectors.detail(state),
        initialValues               : productVariationsDetail.item
      }
    },
    {
      put                      : productVariationsDetailDuck.creators.put,
      post                     : productVariationsImageDetailDuck.creators.post,
      resetItem                : productVariationsDetailDuck.creators.resetItem,
      setItem                  : productVariationsImageDetailDuck.creators.setItem,
      getProductVariationsImage: productVariationsImageDetailDuck.creators.get
    }
  ),
  reduxForm({
    form              : 'product-variation-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        sku_id: Yup.string().required('SKU is required'),
        price : Yup.string().required('Price is reqired'),
        stock : Yup.string().required('Stock is reqired')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ProductVariationsCreateForm)
