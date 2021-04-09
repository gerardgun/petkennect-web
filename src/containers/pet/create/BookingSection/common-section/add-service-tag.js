import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Dropdown, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import { syncValidate } from '@lib/utils/functions'
import '../styles.scss'

const AddServiceTagForm = ({ detailDuck, ...props }) => {
  const {
    reservationDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleClose = () =>{
    props.reset()
    props.dispatch(
      detailDuck.creators.resetItem()
    )
  }
  const _handleSubmit = ()=> {
    _handleClose()
  }

  const isOpened = useMemo(() => getIsOpened(reservationDetail.mode), [ reservationDetail.mode ])
  const isUpdating = Boolean(reservationDetail.item.id)

  const serviceTagOptions = [ { key: 1,value: 1,text: 'Gate Guarding' },
    { key: 2,value: 2,text: 'Over-Corrects' },
    { key: 3,value: 3,text: 'Leash Reactive' },
    { key: 4,value: 4,text: 'Fence Jumper' },
    { key: 5,value: 5,text: 'Leash Reactive' },
    { key: 6,value: 6,text: 'Fence Jumper' },
    { key: 7,value: 7,text: 'Fear Aggresive' },
    { key: 8,value: 8,text: 'Kennel Reactive' },
    { key: 9,value: 9,text: 'Food Aggresive' },
    { key: 10,value: 10,text: 'Excessive Barking' },
    { key: 11,value: 11,text: 'Marks' },
    { key: 10,value: 12,text: 'Barrier Aggressive' }

  ]

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header pl8'>Add Service Tags</Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group  widths='equal'>
            <div className='tag-dropdown'>
              <Dropdown
                fluid
                multiple
                options={serviceTagOptions}
                placeholder='Search Tag'
                selection/>
            </div>
          </Form.Group>

          {
            error && (
              <Form.Group widths='equal'>
                <Form.Field>
                  <FormError message={error}/>
                </Form.Field>
              </Form.Group>
            )
          }

          <Form.Group className='form-modal-actions mt32' widths='equal'>
            <Form.Field>
              <Button
                basic
                className='cls-cancelButton'
                color='teal'
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
  )
}
AddServiceTagForm.defaultProps = {
  detailDuck: null

}
export default compose(
  connect(
    (state, { detailDuck }) => {
      const reservationDetail = detailDuck .selectors.detail(state)

      return {
        reservationDetail,
        initialValues: reservationDetail.item
      }
    }

  ),
  reduxForm({
    form              : 'service-tag-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        service_tag: Yup.string().required('Tag is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(AddServiceTagForm)
