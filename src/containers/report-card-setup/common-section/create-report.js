import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Modal ,Grid, Header, Form, Select, Input } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import * as Yup from 'yup'
import FormError from '@components/Common/FormError'
import { syncValidate } from '@lib/utils/functions'
import FormField from '@components/Common/FormField'

const CreateReportCard = ({ detailDuck, ...props })=>{
  const {
    reportCardDetail,
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
  const isOpened = useMemo(() => getIsOpened(reportCardDetail.mode), [ reportCardDetail.mode ])

  return (
    <Modal
      className='form-modal'
      open={isOpened}
      size='tiny'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form id='report-card-redux-form' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h3' className='segment-content-header' color='blue'> Create New Report Card Template</Header>
          <Field component='input' name='id' type='hidden'/>
          <Grid>
            <Grid.Column computer={16}>
              <Header as='h4' content='Select service this report card applies to' style={{ marginBottom: '10px' }}/>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Select}
                  name='service_name'
                  options={[
                    { key: 1, value: 1, text: 'Fitness' },
                    { key: 2, value: 2, text: 'Day Training' },
                    { key: 3, value: 3, text: 'Grooming' }
                  ]}
                  selectOnBlur={false}/>
              </Form.Group>
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column className='pt0'computer={16}>
              <Header
                as='h4'  content='Report Card Name'
                style={{ marginBottom: '10px' }}/>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Input}
                  name='report_card_name'
                  selectOnBlur={false}/>
              </Form.Group>

            </Grid.Column>
          </Grid>

          <Form.Group className='form-modal-actions' widths='equal'>
            <Form.Field>
              <Button
                className='cls-cancelButton'
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content='Create '
                disabled={submitting}
                loading={submitting}
                type='submit'/>
            </Form.Field>
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

        </Form>
      </Modal.Content>
    </Modal>
  )
}

CreateReportCard.defaultProps = {
  detailDuck: null

}
export default compose(
  connect(
    (state, { detailDuck }) => {
      const reportCardDetail = detailDuck .selectors.detail(state)

      return {
        reportCardDetail,
        initialValues: reportCardDetail.item
      }
    }

  ),
  reduxForm({
    form              : 'report-card-redux-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        service_name    : Yup.string().required('Service name is required'),
        report_card_name: Yup.string().required('Report Card name  is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(CreateReportCard)
