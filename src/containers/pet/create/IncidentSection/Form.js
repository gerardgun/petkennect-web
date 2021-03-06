import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Button, Form, Header, Input, Modal, Select, TextArea } from 'semantic-ui-react'
import * as Yup from 'yup'
import moment from 'moment'
import loadable from '@loadable/component'

import FormField from '@components/Common/FormField'

import { parseResponseError, syncValidate } from '@lib/utils/functions'

import petIncidentDetailDuck from '@reducers/pet/incident/detail'
import petIncidentTypeDuck from '@reducers/pet/incident-type'
import petIncidentActionDuck from '@reducers/pet/incident-action'
import petIncidentBehaviorDuck from '@reducers/pet/incident-behavior'

const FormError = loadable(() => import('@components/Common/FormError'))
const Message = loadable(() => import('@components/Message'))

const IncidentSectionForm = (props) => {
  const {
    petIncidentDetail,

    petIncidentAction,
    petIncidentType,
    petIncidentBehavior,

    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  useEffect(()=> {
    props.getPetIncidentAction()
    props.getPetIncidentBehavior()
    props.getPetIncidentType()
    if(petIncidentDetail.item.id)
      props.get(petIncidentDetail.item.id)
  }, [ petIncidentDetail.item.id ])
  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props
        .put({ id: petIncidentDetail.item.id, ...values, internal_description: values.internal_description ? values.internal_description : null  })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(petIncidentDetail.mode), [
    petIncidentDetail.mode
  ])
  const isUpdating = Boolean(petIncidentDetail.item.id)

  const  isActionSerius = petIncidentAction.items
    .find(_incidentAction=> _incidentAction.id === props.watchedAction
  && _incidentAction.result_type === 'R')

  return (
    <Modal
      className='form-modal c-incident-section-form'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>
            {isUpdating ? 'Update' : 'New'} incident
          </Header>
          <Header>
            Remember  that if the pet reaches the number of incidents it will no longer be able to access the field day service
          </Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Incident Type'
              name='type'
              options={petIncidentType.items.map(_type=>({
                key  : _type.id,
                value: _type.id,
                text : `${_type.name}`
              }))}
              placeholder='Select type'
              required
              selectOnBlur={false}/>

            <Field
              component={FormField}
              control={Input}
              format={value => value ? moment(value,'YYYY-MM-DD[T]HH:mm:ss').format('YYYY-MM-DD') : null}
              label='Incident date'
              name='incised_at'
              parse={value=> moment(value).format('YYYY-MM-DD[T]HH:mm:ss')}
              required
              type='date'/>
            <Field
              component={FormField}
              control={Select}
              label='Action taken'
              name='action'
              options={petIncidentAction.items.map(_action=>({
                key  : _action.id,
                value: _action.id,
                text : `${_action.name}`
              }))}
              placeholder='Select action taken'
              required
              selectOnBlur={false}/>

          </Form.Group>
          <Form.Group className='ph4'>
            {
              isActionSerius ? <Message
                className='w100'
                content={
                  <div className='flex align-center h100'>
                    <div className='message__title'>The action to be taken will be added  as serius.</div>
                  </div>
                } type={'warning'}/>
                : null}
          </Form.Group>

          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={TextArea}
              label='Internal comment'
              name='internal_description'
              placeholder='Input comment (Optional)'/>
          </Form.Group>

          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Behavior Observed'
              multiple
              name='behaviors'
              options={petIncidentBehavior.items.map(behavior=>({
                key  : behavior.id,
                value: behavior.id,
                text : `${behavior.name}`
              }))}
              placeholder='Select action'
              required
              selectOnBlur={false}/>

          </Form.Group>

          <Header as='h6' className='section-header mt36' color='teal'>INTERNAL COMMENTS</Header>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={TextArea}
              label='Comments'
              name='description'
              placeholder='Input comment'
              required/>
          </Form.Group>

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

export default compose(
  withRouter,
  connect(
    (state) => {
      const petIncidentDetail = petIncidentDetailDuck.selectors.detail(state)
      const petIncidentAction = petIncidentActionDuck.selectors.list(state)
      const petIncidentType = petIncidentTypeDuck.selectors.list(state)
      const petIncidentBehavior = petIncidentBehaviorDuck.selectors.list(state)

      return {
        petIncidentDetail,
        petIncidentAction,
        petIncidentType,
        petIncidentBehavior,
        initialValues: {
          ...petIncidentDetail.item
        },
        watchedAction: formValueSelector('pet-incident-section-form')(state,'action')

      }
    },
    {
      get                   : petIncidentDetailDuck.creators.get,
      getPetIncidentAction  : petIncidentActionDuck.creators.get,
      getPetIncidentBehavior: petIncidentBehaviorDuck.creators.get,
      getPetIncidentType    : petIncidentTypeDuck.creators.get,
      post                  : petIncidentDetailDuck.creators.post,
      put                   : petIncidentDetailDuck.creators.put,
      resetItem             : petIncidentDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'pet-incident-section-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        type                : Yup.mixed().required('Type is required'),
        action              : Yup.mixed().required('Action is required'),
        behaviors           : Yup.array().of(Yup.mixed()).min(1, 'Must be 1 at the least').required('Behaviors is required'),
        incised_at          : Yup.string().required('Incised at is required'),
        description         : Yup.string().required('Comments is required'),
        internal_description: Yup.string().nullable()
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(IncidentSectionForm)
