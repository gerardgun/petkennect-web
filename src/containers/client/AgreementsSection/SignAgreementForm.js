import React, { useEffect, useMemo,useRef } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import * as Yup from 'yup'
import { reduxForm } from 'redux-form'

import FormError from '@components/Common/FormError'
import { Button, Form, Grid, Header, Modal } from 'semantic-ui-react'
import { parseResponseError,syncValidate } from '@lib/utils/functions'

import clientAgreementDetailDuck from '@reducers/client/agreement/detail'

import SignatureCanvas from 'react-signature-canvas'

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)

  while (n--)
    u8arr[n] = bstr.charCodeAt(n)

  return new File([ u8arr ], filename, { type: mime })
}

const SignAgreementForm = props => {
  const {
    error,
    clientAgreementDetail,handleSubmit, reset,submitting
  } = props

  useEffect(()=> {
    if(isUpdating)
      props.get(clientAgreementDetail.item.id)
  }, [ clientAgreementDetail.item.id ])

  const sigCanvas = useRef({})

  const isUpdating = Boolean(clientAgreementDetail.item.id)

  const getIsOpened = mode => (mode === 'Show')

  const _handleClose = () => {
    props.resetItem()
  }

  const _handleClear = ()=>
  {
    sigCanvas.current.clear()
  }

  const _handleSubmit = values => {
    const file = dataURLtoFile(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'),'imageSign.png')
    values =  {
      sign_image: file,
      agreement : clientAgreementDetail.item.id
    }

    return props
      .post({ ...values })
      .then(_handleClose)
      .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(clientAgreementDetail.mode), [ clientAgreementDetail.mode ])

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Grid>
            <Grid.Column className='grid-sign-detail' width='ten'>

              <Header as='h2' className='segment-content-header text-align-center'>{clientAgreementDetail.item.name}</Header>
              {/* <table className='justify-between'>{clientAgreementDetail.item.body}</table> */}
              <div dangerouslySetInnerHTML={{ __html: clientAgreementDetail.item.body }}/>
            </Grid.Column>
            <Grid.Column width='six'>
              <Header as='h2' className='segment-content-header text-align-center'>Sign Document</Header>
              <SignatureCanvas
                canvasProps={{ width: 300, height: 200, className: 'sign-canvas' }}
                penColor='green' ref={sigCanvas}/>

              <Form.Group widths='equal'>
                <Form.Field>
                  <Button
                    basic
                    className='btn-clear-signature'
                    color='teal'
                    content='Clear Signature'
                    disabled={submitting}
                    onClick={_handleClear}
                    size='small'
                    type='button'/>
                </Form.Field>
              </Form.Group>

              <b>Electronic Signature authorization</b>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Integer vel lacus cursus, blandit odio ut, sodales metus.
                Sed ullamcorper sodales dolor, quis pulvinar mauris interdum
                id. Sed libero nulla</p>
              {error && (
                <Form.Group widths='equal'>
                  <Form.Field>
                    <FormError message={error}/>
                  </Form.Field>
                </Form.Group>
              )}
              <Form.Group className='form-modal-actions' widths='equal'>
                <Form.Field>
                  <Button
                    basic
                    className='w140'
                    color='teal'
                    content='Cancel'
                    disabled={submitting}
                    onClick={_handleClose}
                    size='small'/>
                  <Button
                    className='w140'
                    color='teal'
                    content='Apply Signature'
                    disabled={submitting}
                    size='small'/>
                </Form.Field>
              </Form.Group>

            </Grid.Column>
          </Grid>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  withRouter,
  connect(
    state => {
      const clientAgreementDetail = clientAgreementDetailDuck.selectors.detail(state)
      const initialValues = { ...clientAgreementDetail.item }

      return {
        clientAgreementDetail,
        initialValues
      }
    },
    {
      get      : clientAgreementDetailDuck.creators.get,
      post     : clientAgreementDetailDuck.creators.post,
      resetItem: clientAgreementDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'client-agreement-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(SignAgreementForm)
