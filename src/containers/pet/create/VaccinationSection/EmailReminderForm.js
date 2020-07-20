import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Button, Form, Header, Input, Modal, Divider } from 'semantic-ui-react'
import * as Yup from 'yup'
import moment from 'moment'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import clientDuck from '@reducers/client'
import authDuck from '@reducers/auth'
import petVaccinationDuck from '@reducers/pet/vaccination'
import petDetailDuck from '@reducers/pet/detail'
import petVaccinationDetailDuck from '@reducers/pet/vaccination/detail'

const editorConfiguration = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'Link',
      'bulletedList',
      'numberedList',
      '|',
      'Indent',
      'Outdent',
      '|',
      'Blockquote',
      'insertTable',
      '|',
      'undo',
      'redo'
    ],location: 'bottom'
  },
  toolbarLocation: 'bottom',
  table          : {
    contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
  }
}

const EmailReminderForm = (props) => {
  const {
    open,
    onClose,
    client,
    petDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form

  } = props

  useEffect(()=> {
    props.getClients()

    return  ()=> {
      props.removeSelectedItems()
    }
  },[])
  useEffect(()=> {
    if(petDetail.item.client && open)
      props.change('client_email', (client.items.find(_client=> _client.id === petDetail.item.client) || {}).email)
  },[ petDetail.item.client , client.items , open ])

  const _handleClose = () => {
    props.reset()
    onClose()
    props.removeSelectedItems()
  }

  const _handleSubmit = (values) => {
    return props
      .sendEmail({ ...values })
      .then(_handleClose)
      .catch(parseResponseError)
  }

  const _handleSubjectChange = value => props.change('body_title', value)

  const _handleChange = (event, editor) => {
    const data = editor.getData()
    props.change('body_text', data)
  }

  const isOpened = Boolean(open)

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
            Send email reminder
          </Header>
          <Field component='input' name='body_text' type='hidden'/>

          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Email'
              name='client_email'
              placeholder=''
              readOnly/>

          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Subject'
              name='subject'
              onChange={_handleSubjectChange}
              placeholder='Enter subject'/>
          </Form.Group>
          <Form.Group className='ph8' widths='equal'>
            <CKEditor
              config={editorConfiguration} data={props.watchedBodyText} editor={ClassicEditor}
              onChange={_handleChange}/>
          </Form.Group>

          <Divider/>

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
                content={'Done'}
                disabled={submitting}
                loading={submitting}/>
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

EmailReminderForm.prototype = {
  open   : PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}
EmailReminderForm.defaultProps = {}

export default compose(
  withRouter,
  connect(
    ({ auth,...state }) => {
      const client = clientDuck.selectors.list(state)
      const petDetail = petDetailDuck.selectors.detail(state)
      const clientFullName = `${petDetail.item.client_first_name || ''} ${petDetail.item.client_last_name || ''}`
      const currentTenant =  authDuck.selectors.getCurrentTenant(auth)

      const     petVaccination      = petVaccinationDuck.selectors.list(state)

      return {
        client,
        petDetail,
        initialValues: {
          subject  : `Attention Required - Vaccinations due for ${petDetail.item.name}`,
          body_text: `Dear ${clientFullName},`
          + '<br/><br/>'
          // eslint-disable-next-line max-len
          + `${petDetail.item.name} is coming due for vaccinations.  Please remember we cannot accept your dog into ${currentTenant.legal_name} without current vaccinations.  Please email us or bring in an updated copy of your dog's vaccination records.  Below are the expiration dates we currently have on file:<br/><br/>`
           + petVaccination.selector.selected_items.map((_vaccination)=> `${_vaccination.type_name}: ${moment.utc(_vaccination.expired_at, 'YYYY-MM-DD HH-mm:ss Z').format('MM/DD/YYYY')}<br/>`)

          + '<br/>'

          + 'Please remember that while we require all vaccinations, your dog can still contract kennel cough. Kennel Cough is contracted by an airborne virus and the vaccine is not 100% effective.  Kennel cough is similar to the human cold; any time dogs come in contact with other dogs, there is a risk of infection.  Please consult with your veterinarian for questions on vaccinations.<br/><br/>'

          + 'Thank You,<br/>'
          + `${currentTenant.legal_name}`
        },
        watchedBodyText: formValueSelector('pet-vaccination-email-reminder-form')(state,'body_text')
      }
    },
    {
      getClients         : clientDuck.creators.get,
      sendEmail          : petVaccinationDetailDuck.creators.sendEmail,
      removeSelectedItems: petVaccinationDuck.creators.removeSelectedIds
    }
  ),
  reduxForm({
    form              : 'pet-vaccination-email-reminder-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        subject  : Yup.string().required('Subject is required'),
        body_text: Yup.string().required('Message is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(EmailReminderForm)
