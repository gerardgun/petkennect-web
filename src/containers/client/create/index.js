import React, { useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { getFormValues, getFormSyncErrors, getFormSubmitErrors, submit, destroy } from 'redux-form'
import { Header, Modal, Form, Button } from 'semantic-ui-react'

import FormStep1 from './FormStep1'
import FormStep2 from './FormStep2'

import { parseResponseError } from '@lib/utils/functions'

import clientDetailDuck from '@reducers/client/detail'

const formIds = [ 'client-create-step-1-form','client-create-step-2-form' ]

const ClientCreateForm = (props) => {
  const {
    history,
    clientDetail,
    forms,
    submit,
    post,
    destroy
  } = props

  const [ stepIndex, setStepIndex ] = useState(0)

  const getIsOpened = (mode) => mode === 'CREATE'

  const _handleClose = () => {
    setStepIndex(0)
    props.resetItem()
    destroy(...formIds)
  }

  const _handleSaveBtnClick = () => {
    const formId = formIds[stepIndex]

    if(formId) submit(formId)
    else _handleSubmit()
  }

  const _handleSubmit = () => {
    const formIndexWithErrors = forms.findIndex((form, index) => {
      return (form.fields.length === 0
         || Object.keys(form.errors).length > 0) && [ 0, 1 ].includes(index)
         || Object.keys(form.submitErrors).length > 0
    })

    // //////////////////////////////////////////////////////////////////////////////////////////////////

    if(formIndexWithErrors === -1  && stepIndex === 0) {
      setStepIndex(1)

      return
    }
    // //////////////////////////////////////////////////////////////////////////////////////////////////

    if(formIndexWithErrors !== -1) {
      setStepIndex(formIndexWithErrors)
      setTimeout(() => submit(formIds[formIndexWithErrors]), 100)
    } else {
      const values = forms
        .map(({ fields, ...rest }) => {
          let parsedFields = fields.reduce((a, b) => {
            const fieldname = /^(\w+).*/.exec(b)[1]

            return a.includes(fieldname) ? a : [ ...a, fieldname ]
          }, [])

          return { fields: parsedFields, ...rest }
        })
        .filter(item => item.fields.length > 0 && Boolean(item.values))
        .map(({ fields, values }) => {
          return fields.reduce((a, b) => ({ ...a, [b]: values[b] }), {})
        })
        .reduce((a, b) => ({ ...a, ...b }))

      let finalValues = Object.entries(values)
        .filter(([ , value ]) => value !== null)
        .reduce((a, [ key, value ]) => ({ ...a, [key]: value }), {})

      // For checkbox values
      if('legal_sign_on' in finalValues) {
        if(!('legal_liability' in finalValues)) finalValues.legal_liability = false
        if(!('legal_kc_waiver' in finalValues)) finalValues.legal_kc_waiver = false
      }

      return post(finalValues)
        .then(result => history.replace(`/client/${result.id}`))
        .catch(parseResponseError)
    }
  }

  const saving = [ 'POSTING' ].includes(clientDetail.status)

  const isOpened = useMemo(() => getIsOpened(clientDetail.mode), [ clientDetail.mode ])

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='large'>
      <Modal.Content>
        <Header as='h2' className='segment-content-header'>
            New Client
        </Header>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        {stepIndex === 0 && <FormStep1 onSubmit={_handleSubmit}/>}

        {stepIndex === 1 && <FormStep2 onSubmit={_handleSubmit}/>}

        <Form.Group className='form-modal-actions' widths='equal'>
          <Form.Field>
            <Button
              basic
              className='w120'
              color='teal'
              content='Cancel'
              disabled={saving}
              onClick={_handleClose}
              type='button'/>
            {stepIndex === 0 ?  (
              <Button
                className='w120'
                color='teal'
                content='Continue'
                disabled={saving}
                loading={saving}
                onClick={_handleSaveBtnClick}/>
            ) : (
              <Button
                className='w120'
                color='teal'
                content='Add client'
                disabled={saving}
                loading={saving}
                onClick={_handleSaveBtnClick}/>
            )}
          </Form.Field>
        </Form.Group>

      </Modal.Content>
    </Modal>
  )
}

export default compose(
  withRouter,
  connect(
    ({ ...state }) => {
      const clientDetail = clientDetailDuck.selectors.detail(state)

      return {
        clientDetail,
        forms: formIds.map(formId => ({
          fields      : Object.keys((state.form[formId] || {}).registeredFields || {}),
          values      : getFormValues(formId)(state),
          errors      : getFormSyncErrors(formId)(state),
          submitErrors: getFormSubmitErrors(formId)(state)
        }))
      }
    },
    {
      destroy,
      post     : clientDetailDuck.creators.post,
      resetItem: clientDetailDuck.creators.resetItem,
      submit
    }
  )
)(ClientCreateForm)
