import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { Button, Dimmer, Form, Header, Loader, Modal } from 'semantic-ui-react'

import ServiceReservationCreateForm from './index'

import serviceVariationDetailDuck from '@reducers/service/variation/detail'

const selector = formValueSelector('service-boarding-activity')

const ServiceReservationCreateFormModal = () => {
  const dispatch = useDispatch()
  const detail = useSelector(serviceVariationDetailDuck.selectors.detail)
  const price = useSelector(state => selector(state, 'price'))

  const _handleClose = () => {
    dispatch(
      serviceVariationDetailDuck.creators.resetItem()
    )
  }

  const _handleUpdatePricingBtnClick = () => {
    return dispatch(serviceVariationDetailDuck.creators.postPrice({ service_variation_id: detail.item.id, ...price }))
      .then(_handleClose)
      // .catch(parseResponseError)
  }

  const editing = Boolean(detail.item.id)
  const saving = [ 'POSTING', 'PUTTING' ].includes(detail.status)
  const open = [ 'CREATE', 'UPDATE' ].includes(detail.mode)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={open}
      size='small'>
      <Modal.Content>
        <Header as='h2'>{editing ? 'Update' : 'Add'} Boarding Activity</Header>

        <ServiceReservationCreateForm/>

        <Form.Group className='form-modal-actions' widths='equal'>
          <Form.Field>
            {
              editing && detail.item.prices.length > 0 && (
                <Button
                  color='violet'
                  content='Update Pricing'
                  disabled={saving}
                  onClick={_handleUpdatePricingBtnClick}
                  type='button'/>
              )
            }
            <Button
              basic
              className='w120'
              color='teal'
              content='Cancel'
              disabled={saving}
              onClick={_handleClose}
              type='button'/>
            <Button
              color='teal'
              content={editing ? 'Save changes' : 'Create Boarding Activity'}
              disabled={saving}
              form='service-boarding-activity'
              loading={saving}
              type='submit'/>
          </Form.Field>
        </Form.Group>

        <Dimmer active={detail.status === 'GETTING'} inverted>
          <Loader inverted/>
        </Dimmer>
      </Modal.Content>
    </Modal>
  )
}

export default ServiceReservationCreateFormModal
