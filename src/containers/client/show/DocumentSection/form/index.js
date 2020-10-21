import React, { useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Input, TextArea, Select, Form } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import { parseFormValues, parseResponseError, syncValidate } from '@lib/utils/functions'

import clientDocumentDetailDuck from '@reducers/client/document/detail'
import clientDocumentTypeDuck from '@reducers/client/document/type'

export const formId = 'client-document-form'

const ClientDocumentForm = props => {
  const {
    clientDocumentDetail,
    clientDocumentType,
    error, handleSubmit, reset // redux-form
  } = props

  const { client: clientId } = useParams()

  useEffect(() => {
    if(clientDocumentType.items.length === 0) props.getClientDocumentTypes()
  }, [])

  const _handleSubmit = values => {
    values = parseFormValues(values)

    return props.put({ client_id: clientId, ...values })
      .then(() => props.resetItem())
      .catch(parseResponseError)
  }

  const selectedDocumentType = useMemo(() => {
    return clientDocumentType.items.find(({ id }) => id === clientDocumentDetail.item.type)
  }, [ clientDocumentDetail.status, clientDocumentType.status ])

  const clientDocumentTypeOptions = useMemo(() => {
    return (
      selectedDocumentType && selectedDocumentType.type === 'O' ? (
        clientDocumentType.items.filter(({ type }) => type === 'O')
      ) : (
        clientDocumentType.items
      )
    )
      .map(item => ({
        key  : item.id,
        value: item.id,
        text : item.name
      }))
  }, [ clientDocumentType.status ])

  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={formId} onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
        <Form.Group widths='equal'>
          <Field
            autoFocus
            component={FormField}
            control={Input}
            label='Document Name'
            name='filename'
            placeholder='Enter document name'
            required/>
          <Field
            component={FormField}
            control={Select}
            disabled={Boolean(selectedDocumentType) && selectedDocumentType.type !== 'O'}
            label='Type'
            name='type'
            options={clientDocumentTypeOptions}
            placeholder='Select type'
            required
            selectOnBlur={false}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={TextArea}
            label='Comment'
            name='description'
            placeholder='Enter comment'/>
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

        <Field component='input' name='id' type='hidden'/>
      </Form>
    </>
  )
}

export default compose(
  connect(
    state => {
      const clientDocumentDetail = clientDocumentDetailDuck.selectors.detail(state)

      return {
        clientDocumentDetail,
        clientDocumentType: clientDocumentTypeDuck.selectors.list(state),
        initialValues     : { ...clientDocumentDetail.item }
      }
    },
    {
      getClientDocumentTypes: clientDocumentTypeDuck.creators.get,
      put                   : clientDocumentDetailDuck.creators.put,
      resetItem             : clientDocumentDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : formId,
    enableReinitialize: true,
    validate          : values => {
      const schema = {
        type    : Yup.mixed().required('Document type is required'),
        filename: Yup.mixed().required('Document name is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ClientDocumentForm)
