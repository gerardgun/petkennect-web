import React, { useEffect, useMemo, useRef, useState } from 'react'
import { connect } from 'react-redux'
import SignatureCanvas from 'react-signature-canvas'
import { compose } from 'redux'
import { Button, Dimmer, Grid, Header, Loader, Modal } from 'semantic-ui-react'
import loadable from '@loadable/component'

import agreementDetailDuck from '@reducers/agreement/detail'
import clientAgreementDetailDuck from '@reducers/client/agreement/detail'

const FormError = loadable(() => import('@components/Common/FormError'))

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

const SignAgreementForm = ({ agreementDetail, clientAgreementDetail, ...props }) => {
  const { item: clientAgreement, mode, status } = clientAgreementDetail

  const [ signatureWidth, setSignatureWidth ] = useState(0)
  const [ error, setError ] = useState(null)
  const sigCanvas = useRef(null)

  useEffect(() => {
    window.addEventListener('resize', _handleWindowResize, true)

    return () => {
      window.removeEventListener('resize', _handleWindowResize, false)
    }
  }, [])

  useEffect(() => {
    if(mode === 'CREATE') {
      props.getAgreement(clientAgreement.id)
      _handleWindowResize()
    }
  }, [ mode ])

  const _handleClear = () => {
    sigCanvas.current.clear()
  }

  const _handleClose = () => {
    props.resetItem()
    props.resetAgreement()
    setError(null)
  }

  const _handleSubmitBtnClick = () => {
    if(sigCanvas.current.isEmpty()) {
      setError('Please, sign the document.')
    } else {
      const file = dataURLtoFile(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'), 'imageSign.png')

      return props.post({
        sign_image: file,
        agreement : clientAgreement.id
      })
        .then(_handleClose)
    }
  }

  const _handleWindowResize = () => {
    const target = document.querySelector('.sign-agreement-modal-form > h2')

    if(target) setSignatureWidth(target.offsetWidth)
  }

  const isOpened = useMemo(() => mode === 'CREATE', [ mode ])
  const submitting = useMemo(() => status === 'POSTING', [ status ])
  const loading = useMemo(() => agreementDetail.status === 'GETTING', [ agreementDetail.status ])

  return (
    <Modal
      className='sign-agreement-modal modal-position'
      onClose={_handleClose}
      open={isOpened}
      size='large'>
      <Modal.Content>
        <Grid>
          <Grid.Column className='sign-agreement-modal-body' width={10}>
            <Dimmer.Dimmable as='div' dimmed={loading}>
              <Dimmer active={loading} inverted>
                <Loader>Loading</Loader>
              </Dimmer>

              <Header as='h1'>{agreementDetail.item.name}</Header>
              <div dangerouslySetInnerHTML={{ __html: agreementDetail.item.body }}/>
            </Dimmer.Dimmable>
          </Grid.Column>
          <Grid.Column className='sign-agreement-modal-form' width={6}>
            <Header as='h2'>Sign Document</Header>

            <SignatureCanvas
              canvasProps={{ width: signatureWidth, height: 200, className: 'sign-canvas' }}
              clearOnResize={false}
              penColor='black' ref={sigCanvas}/>
            <br/>
            <br/>
            <Button
              basic
              color='teal'
              content='Clear Signature'
              disabled={submitting}
              fluid
              onClick={_handleClear}/>

            <Header as='h3'>Electronic Signature authorization</Header>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Integer vel lacus cursus, blandit odio ut, sodales metus.
              Sed ullamcorper sodales dolor, quis pulvinar mauris interdum
              id. Sed libero nulla
            </p>
            <br/>
            <br/>

            {
              error && (
                <>
                  <FormError message={error}/>
                  <br/>
                </>
              )
            }

            <Button
              basic
              className='w120'
              color='teal'
              content='Cancel'
              disabled={submitting}
              onClick={_handleClose}/>
            <Button
              color='teal'
              content='Apply Signature'
              disabled={submitting}
              loading={submitting}
              onClick={_handleSubmitBtnClick}/>
          </Grid.Column>
        </Grid>
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  connect(
    state => ({
      agreementDetail      : agreementDetailDuck.selectors.detail(state),
      clientAgreementDetail: clientAgreementDetailDuck.selectors.detail(state)
    }),
    {
      getAgreement  : agreementDetailDuck.creators.get,
      post          : clientAgreementDetailDuck.creators.post,
      resetItem     : clientAgreementDetailDuck.creators.resetItem,
      resetAgreement: agreementDetailDuck.creators.resetItem
    }
  )
)(SignAgreementForm)
