import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Modal } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'

import FormError from '@components/Common/FormError'

import productVariationsDetailDuck from '@reducers/product/product-variations/detail'

const DeleteConfirmation = props => {
  const {
    productAttributeDetail,
    error
  } = props

  const getIsOpened = mode => (mode === 'READ')

  const _handleClose = () =>{
    props.reset()
    props.resetItem()
  }

  const _handleOptionClick = () => {
    props.setItem(productAttributeDetail.item, 'DELETE')
  }

  const isOpened = useMemo(() => getIsOpened(productAttributeDetail.mode), [ productAttributeDetail.mode ])

  return (
    <>
      <Modal
        className='form-modal'
        open={isOpened}
        size='small'>
        <Modal.Content>
          {/* eslint-disable-next-line react/jsx-handler-names */}
          <Form>
            <Header as='h2' className='segment-content-header'>
              Are you sure, you want to delete this attribute value? if yes, it will delete all its variations related to attribute value.</Header>
            <Field component='input' name='id' type='hidden'/>
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
                  basic
                  color='teal'
                  content='Cancel'
                  onClick={_handleClose}
                  type='button'/>
                <Button
                  color='red'
                  content='Delete'
                  onClick={_handleOptionClick}
                  type='button'/>
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
      </Modal>

      <ModalDelete duckDetail={productVariationsDetailDuck}/>
    </>
  )
}

export default compose(
  withRouter,
  connect(
    state => {
      return {
        productAttributeDetail: productVariationsDetailDuck.selectors.detail(state)
      }
    },
    {
      setItem  : productVariationsDetailDuck.creators.setItem,
      resetItem: productVariationsDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'delete-variation-form',
    destroyOnUnmount  : false,
    enableReinitialize: true
  })
)(DeleteConfirmation)

