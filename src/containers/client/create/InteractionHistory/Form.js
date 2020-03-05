import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Header, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'
import _times from 'lodash/times'
import faker from 'faker'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import YupFields from '@lib/constants/yup-fields'
import { syncValidate } from '@lib/utils/functions'

import clientDetailDuck from '@reducers/client/detail'
import clientInteractionDetailDuck from '@reducers/client/interaction/detail'

const staffMembers = _times(10, index => ({ key: index, value: index, text : `${faker.name.firstName()} ${faker.name.lastName()}` }))

const InteractionHistory = props => {
  const {
    clientDetail,
    clientInteractionDetail,
    error, handleSubmit, pristine, reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleClose = () => {
    reset()
    props.resetItem()
  }

  const isOpened = useMemo(() => getIsOpened(clientInteractionDetail.mode), [ clientInteractionDetail.mode ])
  const isUpdating = Boolean(clientInteractionDetail.item.id)

  return (
    <Modal
      className='form-modal'
      open={isOpened}
      onClose={_handleClose}
      size='small'
    >
      <Modal.Content>
        <Form onReset={reset} onSubmit={handleSubmit}>
          <Header as='h2' className='segment-content-header'>{isUpdating ? 'Update' : 'Create'} Client</Header>

          <Form.Group widths='equal'>
            <Field
              name='date'
              component={FormField}
              control={Form.Input}
              label='Date *'
              type='date'
              autoFocus
              autoComplete='off'
            />
            <Field
              name='location'
              component={FormField}
              control={Form.Select}
              options={[
                { key: 1, value: 1, text : '02-RH' },
                { key: 2, value: 2, text : '03-VP' },
                { key: 3, value: 3, text : '04-HH' },
                { key: 4, value: 4, text : '05-SC' },
              ]}
              label='Location *'
              placeholder='Select location'
              search
              selectOnBlur={false}
            />
            <Field
              name='staff'
              component={FormField}
              control={Form.Select}
              options={staffMembers}
              label='Staff *'
              placeholder='Select staff'
              search
              selectOnBlur={false}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              name='comment'
              component={FormField}
              control={Form.TextArea}
              label='Comments'
              placeholder='Enter comments'
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              name='follow_up'
              component={FormField}
              control={Form.Checkbox}
              label='Follow up'
              type='checkbox'
            />
          </Form.Group>

          {
            error && (
              <Form.Group widths="equal">
                <Form.Field>
                  <FormError message={error} />
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
    state => ({
      clientDetail: clientDetailDuck.selectors.detail(state),
      clientInteractionDetail: clientInteractionDetailDuck.selectors.detail(state)
    }),
    {
      resetItem: clientInteractionDetailDuck.creators.resetItem,
    }
  ),
  reduxForm({
    form              : 'client-interaction-form',
    validate: values  => {
      const schema = {
        email: YupFields.email
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(InteractionHistory)

