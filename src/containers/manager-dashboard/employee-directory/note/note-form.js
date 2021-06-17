import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Select, Modal, Grid, TextArea } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate } from '@lib/utils/functions'

import noteDetailDuck from '@reducers/manager-dashboard/employee/employee-note/detail'

const NoteForm = (props) => {
  const {
    noteDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  useEffect(()=> {

  }, [ ])

  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = () => {
  }

  const isOpened = useMemo(() => getIsOpened(noteDetail.mode), [
    noteDetail.mode
  ])

  const isUpdating = noteDetail.mode === 'UPDATE' ? true : false

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>
            {isUpdating ? 'Update' : 'Add'} Comment
          </Header>
          <Grid>
            <Grid.Column width={16}>
            <Form.Group widths='equal'>
          <Field
            autoFocus
            component={FormField}
            control={TextArea}
            label='Comment'
            name='comment'
            placeholder='Enter comment'
            required/>
        </Form.Group>

            </Grid.Column>
          </Grid>

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
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content={isUpdating ? 'Save Changes' : 'Add Comment'}
                disabled={submitting}
                loading={submitting}/>
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default  compose(
  connect(
    (state) => {
      const noteDetail = noteDetailDuck.selectors.detail(state)

      return {
        noteDetail
      }
    },
    {
      post     : noteDetailDuck.creators.post,
      put      : noteDetailDuck.creators.put,
      resetItem: noteDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'employee-note-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        comment: Yup.string().required('Comment is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(NoteForm)
