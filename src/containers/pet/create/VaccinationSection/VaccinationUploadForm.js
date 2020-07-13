import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { Button, Form, Header, Modal, Divider } from 'semantic-ui-react'
import * as Yup from 'yup'
import moment from 'moment'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate, parseResponseError } from '@lib/utils/functions'

import petVaccinationDuck from '@reducers/pet/vaccination'
import petVaccinationDetailDuck from '@reducers/pet/vaccination/detail'

const VaccinationUploadForm = (props) => {
  const {
    petVaccinationDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  const getIsOpened = (mode) => mode === 'CREATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
    props.removeSelectedItem()
  }

  const _handleSubmit = (values) => {
    return props
      .post({ ...values })
      .then(_handleClose)
      .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(petVaccinationDetail.mode), [
    petVaccinationDetail.mode
  ])

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
            Upload Vaccinations
          </Header>
          <Field component='input' name='id' type='hidden'/>

          <FieldArray
            component={({ fields  })=> {
              return  fields.map((_vaccination, index)=>  {
                return (
                  <Form.Group key={index} widths='equal'>
                    <Field component='input' name={`${_vaccination}.type`} type='hidden'/>
                    <Field
                      component={FormField}
                      control={Form.Input}
                      label='Vaccine'
                      name={`${_vaccination}.type_name`}
                      placeholder='Enter vaccine'
                      readOnly/>

                    <Field
                      component={FormField}
                      control={Form.Input}
                      format={value => value ? moment(value,'YYYY-MM-DD[T]HH:mm:ss').format('YYYY-MM-DD') : null}
                      label='Expiry date*'
                      name={`${_vaccination}.expired_at`}

                      parse={value=> moment(value).format('YYYY-MM-DD[T]HH:mm:ss')}
                      placeholder='Enter expiry date'
                      type='date'/>
                  </Form.Group>)
              })
            }} name='vaccinations'/>

          <Divider/>
          <Form.Group widths='equal'>
            <Field
              accept='image/jpg, image/png, application/pdf'
              component={FormField}
              control={Form.Input}
              label='Attachments (PDF, jpg, png) *'
              name='file'
              type='file'/>
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
                content='Done'
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
      const petVaccinationDetail = petVaccinationDetailDuck.selectors.detail(state)
      const petVaccination = petVaccinationDuck.selectors.list(state)

      return {
        petVaccinationDetail,
        petVaccination,
        initialValues: {
          vaccinations: petVaccination.selector.selected_items.map(_vaccination => ({
            type     : _vaccination.type,
            type_name: _vaccination.type_name
            // expired_at: _vaccination.expired_at
          }))
        }
      }
    },
    {
      post              : petVaccinationDetailDuck.creators.post,
      resetItem         : petVaccinationDetailDuck.creators.resetItem,
      removeSelectedItem: petVaccinationDuck.creators.removeSelectedIds
    }
  ),
  reduxForm({
    form              : 'pet-vaccination-upload-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        vaccinations: Yup.array().of(Yup.object().shape({
          type      : Yup.mixed(),
          type_name : Yup.mixed(),
          expired_at: Yup.mixed().required('Expired at is required')
        })),
        file: Yup.mixed().required('File is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(VaccinationUploadForm)
