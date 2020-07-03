import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Modal, Divider } from 'semantic-ui-react'
import * as Yup from 'yup'
import moment from 'moment'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate } from '@lib/utils/functions'

import petVaccinationDuck from '@reducers/pet/vaccination'
import petVaccinationDetailDuck from '@reducers/pet/vaccination/detail'

const VaccinationUploadForm = (props) => {
  const {
    petVaccination,
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

  const _handleSubmit = (/* values*/) => {
    alert('Working in progress')
    props.reset()
    props.resetItem()
    props.removeSelectedItem()

    // return props
    //   .post({ ...values })
    //   .then(_handleClose)
    //   .catch(parseResponseError)
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

          {petVaccination.selector.selected_items.map((item, index)=> (
            <Form.Group key={index} widths='equal'>
              <Form.Field>
                <label>Vaccine</label>
                <input placeholder='Enter vaccine' readOnly value={item.type_name}/>
              </Form.Field>
              <Form.Field>
                <label>Expiry date*</label>
                <input
                  placeholder='Enter expiry date' readOnly type='date'
                  value={moment(item.expired_at).format('YYYY-MM-DD')}/>
              </Form.Field>
              {/* <Field
                autoFocus
                component={FormField}
                control={Form.Input}
                label='Vaccine'
                // name='type_name'
                placeholder='Enter vaccine'
                readOnly
                value={item.type_name}/> */}
              {/* <Field
                component={FormField}
                control={Form.Input}
                label='Expiry date*'
                // name='expired_at'
                placeholder='Enter expiry date'
                readOnly
                value={moment(item.expired_at).format('YYYY-MM-DD')}/> */}
            </Form.Group>
          ))}

          <Divider/>
          <Form.Group widths='equal'>
            <Field
              accept='image/jpg, image/png, application/pdf'
              component={FormField}
              control={Form.Input}
              label='Attachments (PDF, jpg, png) *'
              name='files'
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
        initialValues: {}
      }
    },
    {
      put               : petVaccinationDetailDuck.creators.put,
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
        // pet_class: YupFields.num_required
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(VaccinationUploadForm)
