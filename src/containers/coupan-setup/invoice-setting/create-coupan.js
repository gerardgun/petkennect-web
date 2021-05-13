/* eslint-disable react/jsx-handler-names */
import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {  useDispatch } from 'react-redux'
import { Button, Modal ,Grid, Header, Form, Select, Input, Checkbox } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import * as Yup from 'yup'
import { syncValidate } from '@lib/utils/functions'
import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import coupanDetailDuck from '@reducers/coupan-setup/coupan/detail'

const CreateCouponForm = (props)=>{
  const {
    error,
    handleSubmit,
    reset,
    couponDetail,
    submitting // redux-form
  } = props

  const dispatch = useDispatch()
  const _handleClose = () =>{
    props.reset()
    dispatch(coupanDetailDuck.creators.resetItem())
  }
  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')
  const isOpened = useMemo(() => getIsOpened(couponDetail.mode), [ couponDetail.mode ])
  const isUpdating = Boolean(couponDetail.item.id)
  const _handleSubmit = ()=> {
    _handleClose()
  }

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened} >
      <Modal.Content>
        <Form
          id='report-card-redux-form'  onReset={reset}
          onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>{isUpdating ? 'Update' : 'Add'} Coupon</Header>
          <Field component='input' name='id' type='hidden'/>
          <Grid>
            <Grid.Column computer={8}>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Input}
                  label='Coupon Name'
                  name='coupon_name'
                  placeholder='Enter Coupon Name'
                  required={true}/>

              </Form.Group>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Input}
                  label='Coupon Code'
                  name='coupon_code'
                  placeholder='Enter Coupon Code'/>
              </Form.Group>
            </Grid.Column>
            <Grid.Column computer={8}>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Input}
                  label='Description For Invoice'
                  name='description_invoice'
                  placeholder='Enter Description'/>
              </Form.Group>
              <div className='flex justify-between' >
                <Field
                  component={FormField}
                  control={Input}
                  label='Expiration Date'
                  name='expiration_date'
                  placeholder='Start Date of Coupon'
                  type='date'/>
                <div className='flex align-center'>
                  <label style={{ marginRight: '35px' }}>Active</label>
                  <div  className='check-toggle'>
                    <Field
                      component={FormField}
                      control={Checkbox}
                      format={Boolean}
                      name='status'
                      toggle
                      type='checkbox'/>
                  </div>

                </div>
              </div>

            </Grid.Column>
          </Grid>
          <Header as='h4' color='teal' content='Discount Type'/>
          <Grid>
            <Grid.Column className='type-div mb16'computer={8}>
              <Button color='blue' content='PERCENT OFF' type='button'/>
              <Field
                component={FormField}
                control={Input}
                name='discount_value'
                placeholder='Enter Percent'/>
            </Grid.Column>
            <Grid.Column  className='type-div' computer={8}>
              <Button content='DOLLARS OFF' type='button'/>
              <Field
                component={FormField}
                control={Input}
                name='discount_value'
                placeholder='Enter Dollars'/>
            </Grid.Column>
          </Grid>
          <Header
            as='h4'  color='teal'
            content='Applies to'/>
          <Grid>
            <Grid.Column computer={16}>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Select}
                  label='Locations'
                  multiple
                  name='location'
                  options={[ { key: 1, value: 'all_locations' , text: 'All' } ]}
                  placeholder='Select Locations'
                  required={true}/>
              </Form.Group>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Select}
                  label='Service Types'
                  multiple
                  name='service_type'
                  options={[ { key: 1, value: 'all_service_type' , text: 'All' } ]}
                  placeholder='Select Services'
                  required={true}/>
              </Form.Group>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Select}
                  label='Reservation Types'
                  multiple
                  name='reservation_type'
                  options={[ { key: 1, value: 'all_reservation_type' , text: 'All' } ]}
                  placeholder='Select Reservation Types'
                  required={true}/>
              </Form.Group>
            </Grid.Column>
          </Grid>
          <Header
            as='h4' className='mb12'  color='teal'
            content='Miscellaneous Options'/>
          <Grid>
            <Grid.Column computer={16}>
              <div className='flex align-center justify-between toggle-text-div'>
                <div className='flex align-center'>
                  <labe className='mr4'>Reusable Coupon</labe>
                  <Header as='h4'>
                    <Header.Subheader>
                   (if enabled, clients can use coupon repeatedly)
                    </Header.Subheader>
                  </Header>
                </div>

                <div  className='check-toggle'>

                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    name='reusable'
                    toggle
                    type='checkbox'/>
                </div>
              </div>
              <div className='flex align-center justify-between toggle-text-div'>
                <div className='flex align-center'>
                  <labe className='mr4'>1st Time Client Only</labe>
                  <Header as='h4'>
                    <Header.Subheader>
                   (if enabled, this coupon can only be used by new customers)
                    </Header.Subheader>
                  </Header>
                </div>

                <div  className='check-toggle'>

                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    name='by_new_customer'
                    toggle
                    type='checkbox'/>
                </div>
              </div>
              <div className='flex align-center justify-between toggle-text-div'>
                <div className='flex align-center'>
                  <labe className='mr4'>Exclude on Peak Days</labe>
                  <Header as='h4'>
                    <Header.Subheader>
                   (if enabled, any days set to peak in the calendar will be excluded)
                    </Header.Subheader>
                  </Header>
                </div>

                <div  className='check-toggle'>

                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    name='excluded_in_peak_days'
                    toggle
                    type='checkbox'/>
                </div>
              </div>

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
                content='Save'
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

export default compose(
  connect(
    (state) => {
      const couponDetail = coupanDetailDuck .selectors.detail(state)

      return {
        couponDetail,
        initialValues: { ...couponDetail.item }
      }
    }

  ),
  reduxForm({
    form              : 'report-card-redux-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        coupon_name     : Yup.string().required('Coupon name is required'),
        location        : Yup.string().required('Location  is required'),
        service_type    : Yup.string().required('Service Type  is required'),
        reservation_type: Yup.string().required('Reservation Type  is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }

  })
)(CreateCouponForm)
